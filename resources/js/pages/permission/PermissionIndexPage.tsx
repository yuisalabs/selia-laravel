import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { LucideCirclePlus } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { PermissionDesktopTable, PermissionMobileList, PermissionIndexPageProps } from '@/features/permission';

export default function PermissionIndexPage({ permissions }: PermissionIndexPageProps) {
    return (
        <>
            <Head title="Permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>Permissions</CardTitle>
                                <CardDescription>Manage system permissions</CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('permissions.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                            >
                                <LucideCirclePlus />
                                Create Permission
                            </Link>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <PermissionDesktopTable permissions={permissions.data} />
                            </div>

                            <div className="block md:hidden">
                                <PermissionMobileList permissions={permissions.data} />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <PaginationLinks paginator={permissions} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

PermissionIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={<Heading size="sm">Permissions</Heading>} breadcrumbs={[{ label: 'Permissions' }]}>
            {page}
        </AuthenticatedLayout>
    );
};
