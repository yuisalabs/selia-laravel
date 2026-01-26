import ApplicationLogo from '@/components/application-logo';
import NavLink from '@/components/nav-link';
import ResponsiveNavLink from '@/components/responsive-nav-link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@/components/ui/menu';
import { getInitials } from '@/utils/initials';
import { Link, usePage } from '@inertiajs/react';
import { LucideLayoutDashboard, LucideLogOut, LucideUserRound } from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { FlashMessages } from '@/components/flash-messages';

export default function PublicLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-background">
            <FlashMessages />
            <nav className="border-b border-separator bg-card">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-foreground" />
                                </Link>
                            </div>

                            <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex items-center">
                                <NavLink href="/" active={route().current('welcome')}>
                                    Home
                                </NavLink>
                                <NavLink target="_blank" href="https://selia.earth/docs/introduction" active={false} as="a">
                                    Selia UI Documentation
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center space-x-2">
                            {user ? (
                                <div className="relative ms-3">
                                    <Menu>
                                        <MenuTrigger
                                            render={
                                                <Button variant="plain">
                                                    {user.name}
                                                    <Avatar size="sm">
                                                        <AvatarImage src="https://www.gravatar.com/avatar/c22d38582ca23fa7ccfddb87b5334b03?s=200&d=mp" />
                                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                    </Avatar>
                                                </Button>
                                            }
                                        />
                                        <MenuPopup className="w-(--anchor-width)">
                                            <MenuItem render={
                                                <Button
                                                    nativeButton={false}
                                                    variant="plain"
                                                    render={
                                                        <Link
                                                            className='justify-start w-full'
                                                            href={route('dashboard')}
                                                        />
                                                    }>
                                                    <LucideLayoutDashboard />
                                                    Dashboard
                                                </Button>
                                            }/>
                                            <MenuItem render={
                                                <Button
                                                    nativeButton={false}
                                                    variant="plain"
                                                    render={
                                                        <Link
                                                            className='justify-start'
                                                            href={route('profile.edit')}
                                                        />
                                                    }>
                                                    <LucideUserRound />
                                                    Profile
                                                </Button>
                                            }/>
                                            <MenuSeparator />
                                            <MenuItem render={
                                                <Button
                                                    nativeButton={true}
                                                    variant="plain"
                                                    render={
                                                        <Link
                                                            className='justify-start w-full'
                                                            href={route('logout')}
                                                            method="post"
                                                            as="button"
                                                        />
                                                    }>
                                                    <LucideLogOut />
                                                    Log out
                                                </Button>
                                            }/>
                                        </MenuPopup>
                                    </Menu>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button
                                        nativeButton={false}
                                        variant="plain"
                                        render={<Link href={route('login')}>Log in</Link>}
                                    />
                                    <Button
                                        nativeButton={false}
                                        variant="primary"
                                        render={<Link href={route('register')}>Register</Link>}
                                    />
                                </div>
                            )}
                            <ThemeToggle/>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-muted transition duration-150 ease-in-out hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    {/* Mobile Menu */}
                    {user ? (
                        <div className="border-t border-separator pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-foreground">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-muted">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                         <div className="space-y-1 pb-3 pt-2 border-t border-separator">
                            <ResponsiveNavLink href={route('login')}>
                                Log in
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')}>
                                Register
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-card shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}