import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link, router } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideCirclePlus, LucideSearch } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { RoleDesktopTable, RoleMobileList, RoleIndexPageProps } from '@/features/role';
import { Input } from '@/components/ui/input';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

export default function RoleIndexPage({ roles, state }: RoleIndexPageProps & { state?: { search?: string, sort?: string } }) {
    const { search: currentSearch, sort } = state ?? { search: '', sort: '' };
    const [search, setSearch] = useState(currentSearch || '');

    // Debounce search
    const handleSearch = useCallback(
        debounce((value: string, currentSort: any) => {
            router.get(
                route('roles.index'),
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
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start">
                                <CardTitle>Roles</CardTitle>
                                <CardDescription>Manage roles and their permissions</CardDescription>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative w-full md:w-64">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                        <LucideSearch className="size-4" />
                                    </div>
                                    <Input
                                        placeholder="Search roles..."
                                        className="pl-9"
                                        value={search}
                                        onChange={onSearchChange}
                                    />
                                </div>
                                <Link
                                    as="button"
                                    href={route('roles.create')}
                                    className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                                >
                                    <LucideCirclePlus />
                                    Create Role
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <RoleDesktopTable roles={roles.data} state={state} />
                            </div>

                            <div className="block md:hidden">
                                <RoleMobileList roles={roles.data} />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <PaginationLinks paginator={roles} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

RoleIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={<Heading size="sm">Roles</Heading>} breadcrumbs={[{ label: 'Roles' }]}>
            {page}
        </AuthenticatedLayout>
    );
};
