import ApplicationLogo from '@/components/application-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@/components/ui/menu';
import { getInitials } from '@/utils/initials';
import { Link, usePage } from '@inertiajs/react';
import { 
    LucideBookOpen,
    LucideHome,
    LucideLayoutDashboard, 
    LucideLogIn,
    LucideLogOut, 
    LucideMenu,
    LucideUserPlus,
    LucideUserRound,
    LucideX 
} from 'lucide-react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { FlashMessages } from '@/components/flash-messages';
import { cn } from '@/utils/cn';
import { useTranslation } from 'react-i18next';

export default function PublicLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-background">
            <FlashMessages />
            
            {/* Mobile Menu Backdrop */}
            <div
                className={cn(
                    'fixed inset-0 bg-black backdrop-blur-sm z-40 transition-all md:hidden',
                    mobileMenuOpen ? 'opacity-40 visible' : 'opacity-0 invisible pointer-events-none',
                )}
                onClick={closeMobileMenu}
            />

            {/* Mobile Drawer Menu */}
            <div
                className={cn(
                    'fixed top-0 right-0 z-50 w-full max-w-xs h-dvh bg-card border-l border-border transition-transform duration-300 md:hidden',
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                            <ApplicationLogo className="h-8 w-8 fill-current text-foreground" />
                            <span className="font-semibold">Selia</span>
                        </Link>
                        <Button
                            variant="plain"
                            size="sm-icon"
                            onClick={closeMobileMenu}
                        >
                            <LucideX className="size-5" />
                        </Button>
                    </div>

                    {/* Mobile Menu Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className={cn(
                                    buttonVariants({ variant: 'plain', size: 'sm' }),
                                    'justify-start w-full',
                                    route().current('welcome') && 'bg-accent'
                                )}
                            >
                                <LucideHome className="size-4" />
                                {t('navigation.home')}
                            </Link>
                            <a
                                href="https://selia.earth/docs/introduction"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMobileMenu}
                                className={cn(
                                    buttonVariants({ variant: 'plain', size: 'sm' }),
                                    'justify-start w-full'
                                )}
                            >
                                <LucideBookOpen className="size-4" />
                                Selia UI Documentation
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="p-4 border-t border-border">
                        {user ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <Avatar size="sm">
                                        <AvatarImage src="https://www.gravatar.com/avatar/c22d38582ca23fa7ccfddb87b5334b03?s=200&d=mp" />
                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-medium truncate">{user.name}</span>
                                        <span className="text-sm text-muted truncate">{user.email}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Link
                                        href={route('dashboard')}
                                        onClick={closeMobileMenu}
                                        className={cn(
                                            buttonVariants({ variant: 'plain', size: 'sm' }),
                                            'justify-start w-full'
                                        )}
                                    >
                                        <LucideLayoutDashboard className="size-4" />
                                        {t('navigation.dashboard')}
                                    </Link>
                                    <Link
                                        href={route('profile.edit')}
                                        onClick={closeMobileMenu}
                                        className={cn(
                                            buttonVariants({ variant: 'plain', size: 'sm' }),
                                            'justify-start w-full'
                                        )}
                                    >
                                        <LucideUserRound className="size-4" />
                                        {t('navigation.profile')}
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        onClick={closeMobileMenu}
                                        className={cn(
                                            buttonVariants({ variant: 'plain', size: 'sm' }),
                                            'justify-start w-full'
                                        )}
                                    >
                                        <LucideLogOut className="size-4" />
                                        {t('common.logout')}
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    href={route('login')}
                                    onClick={closeMobileMenu}
                                    className={cn(
                                        buttonVariants({ variant: 'outline', size: 'sm', block: true })
                                    )}
                                >
                                    <LucideLogIn className="size-4" />
                                    {t('common.login')}
                                </Link>
                                <Link
                                    href={route('register')}
                                    onClick={closeMobileMenu}
                                    className={cn(
                                        buttonVariants({ variant: 'primary', size: 'sm', block: true })
                                    )}
                                >
                                    <LucideUserPlus className="size-4" />
                                    {t('common.register')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2">
                                <ApplicationLogo className="h-8 w-8 fill-current text-foreground" />
                                <span className="font-semibold hidden sm:inline">Selia</span>
                            </Link>

                            {/* Desktop Navigation Links */}
                            <div className="hidden md:flex items-center gap-1">
                                <Link
                                    href="/"
                                    className={cn(
                                        buttonVariants({ variant: 'plain', size: 'sm' }),
                                        route().current('welcome') && 'bg-accent'
                                    )}
                                >
                                    {t('navigation.home')}
                                </Link>
                                <a
                                    href="https://selia.earth/docs/introduction"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        buttonVariants({ variant: 'plain', size: 'sm' })
                                    )}
                                >
                                    Selia UI Documentation
                                </a>
                            </div>
                        </div>

                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center gap-2">
                            {user ? (
                                <Menu>
                                    <MenuTrigger
                                        render={
                                            <Button variant="plain" className="gap-2">
                                                <span>{user.name}</span>
                                                <Avatar size="sm">
                                                    <AvatarImage src="https://www.gravatar.com/avatar/c22d38582ca23fa7ccfddb87b5334b03?s=200&d=mp" />
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        }
                                    />
                                    <MenuPopup>
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
                                                {t('navigation.dashboard')}
                                            </Button>
                                        }/>
                                        <MenuItem render={
                                            <Button
                                                nativeButton={false}
                                                variant="plain"
                                                render={
                                                    <Link
                                                        className='justify-start w-full'
                                                        href={route('profile.edit')}
                                                    />
                                                }>
                                                <LucideUserRound />
                                                {t('navigation.profile')}
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
                                                {t('common.logout')}
                                            </Button>
                                        }/>
                                    </MenuPopup>
                                </Menu>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button
                                        nativeButton={false}
                                        variant="plain"
                                        render={<Link href={route('login')}>{t('common.login')}</Link>}
                                    />
                                    <Button
                                        nativeButton={false}
                                        variant="primary"
                                        render={<Link href={route('register')}>{t('common.register')}</Link>}
                                    />
                                </div>
                            )}
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>

                        {/* Mobile Right Side */}
                        <div className="flex items-center gap-2 md:hidden">
                            <LanguageSwitcher />
                            <ThemeToggle />
                            <Button
                                variant="plain"
                                size="sm-icon"
                                onClick={handleMobileMenuToggle}
                            >
                                <LucideMenu className="size-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-card border-b border-border">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}