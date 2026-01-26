import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import { LucideArrowLeft, LucideSquarePen } from 'lucide-react';
import { Heading } from '@/components/ui/heading';

interface Role {
    id: number;
    name: string;
}

interface Permission {
   id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    roles: Role[];
}

interface PermissionShowPageProps {
    permission: Permission;
}

export default function PermissionShowPage({ permission }: PermissionShowPageProps) {
    return (
        <>
            <Head title={`Permission: ${permission.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <Link
                                as="button"
                                href={route('permissions.index')}
                                className={cn(buttonVariants({ variant: 'outline' }))}
                            >
                                <LucideArrowLeft/>
                                Back
                            </Link>
                            <div className="space-x-2">
                                <Link
                                    as="button"
                                    href={route('permissions.edit', permission.id)}
                                    className={cn(buttonVariants({ variant: 'secondary' }))}
                                >
                                    <LucideSquarePen/>
                                    Edit
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div>
                                    <CardTitle>{permission.name}</CardTitle>
                                    <CardDescription>Permission details and information</CardDescription>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Name</h3>
                                    <p className="mt-1 text-sm text-foreground">{permission.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Guard Name</h3>
                                    <p className="mt-1">
                                        <Badge variant="secondary">{permission.guard_name}</Badge>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Created At</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(permission.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Updated At</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(permission.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Roles with this permission ({permission.roles.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {permission.roles.length > 0 ? (
                                        permission.roles.map((role) => (
                                            <Badge key={role.id} variant="secondary">
                                                {role.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">No roles have this permission</p>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

PermissionShowPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Permission Details</Heading>}
            breadcrumbs={[{ label: 'Permissions', href: route('permissions.index') }, { label: 'Details' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
