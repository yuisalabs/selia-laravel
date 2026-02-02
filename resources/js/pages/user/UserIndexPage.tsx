import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideCirclePlus, LucideSearch } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { UserDesktopTable, UserMobileList, UserIndexPageProps } from '@/features/user';
import { Input } from '@/components/ui/input';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

export default function UserIndexPage({ users, state }: UserIndexPageProps & { state?: { search?: string, sort?: string } }) {
    const authUser = usePage().props.auth.user;
    const { search: currentSearch, sort } = state ?? { search: '', sort: '' };
    const [search, setSearch] = useState(currentSearch || '');

    // Debounce search
    const handleSearch = useCallback(
        debounce((value: string, currentSort: any) => {
            router.get(
                route('users.index'),
                { 
                    search: value,
                    sort: currentSort 
                },
                { preserveState: true, replace: true }
            );
        }, 300),
        []
    );

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value, sort);
    };

    return (
        <>
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card className="">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start">
                                <CardTitle>Users</CardTitle>
                                <CardDescription>Manage users and their roles</CardDescription>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative w-full md:w-64">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                        <LucideSearch className="size-4" />
                                    </div>
                                    <Input
                                        placeholder="Search users..."
                                        className="pl-9"
                                        value={search}
                                        onChange={onSearchChange}
                                    />
                                </div>
                                <Link
                                    as="button"
                                    href={route('users.create')}
                                    className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                                >
                                    <LucideCirclePlus />
                                    Create User
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <UserDesktopTable users={users.data} authUserId={authUser.id} state={state} />
                            </div>

                            <div className="block md:hidden">
                                <UserMobileList users={users.data} authUserId={authUser.id} />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <PaginationLinks paginator={users} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={<Heading size="sm">Users</Heading>} breadcrumbs={[{ label: 'Users' }]}>
            {page}
        </AuthenticatedLayout>
    );
};
