import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideCirclePlus } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { RoleDesktopTable, RoleMobileList, RoleIndexPageProps } from '@/features/role';

export default function RoleIndexPage({ roles }: RoleIndexPageProps) {
    return (
        <>
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>Roles</CardTitle>
                                <CardDescription>Manage roles and their permissions</CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('roles.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                            >
                                <LucideCirclePlus />
                                Create Role
                            </Link>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <RoleDesktopTable roles={roles.data} />
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
