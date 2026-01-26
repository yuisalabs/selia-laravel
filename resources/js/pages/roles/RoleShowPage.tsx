import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import { LucideArrowLeft, LucideSquarePen } from 'lucide-react';

interface Permission {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
    users: User[];
}

interface RoleShowPageProps {
    role: Role;
}

export default function RoleShowPage({ role }: RoleShowPageProps) {
    return (
        <>
            <Head title={`Role: ${role.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <Link
                                as="button"
                                href={route('roles.index')}
                                className={cn(buttonVariants({ variant: 'outline' }))}
                            >
                                <LucideArrowLeft/>
                                Back
                            </Link>
                            <div className="space-x-2">
                                <Link
                                    as="button"
                                    href={route('roles.edit', role.id)}
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
                                    <CardTitle>{role.name}</CardTitle>
                                    <CardDescription>Role details and information</CardDescription>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Name</h3>
                                    <p className="mt-1 text-sm text-foreground">{role.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Guard Name</h3>
                                    <p className="mt-1">
                                        <Badge variant="secondary">{role.guard_name}</Badge>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Created At</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(role.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Updated At</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(role.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Permissions ({role.permissions.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {role.permissions.length > 0 ? (
                                        role.permissions.map((permission) => (
                                            <Badge key={permission.id} variant="secondary">
                                                {permission.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">No permissions assigned</p>
                                    )}
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Users with this role ({role.users.length})
                                </h3>
                                <div className="space-y-2">
                                    {role.users.length > 0 ? (
                                        role.users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between p-3 border rounded-md"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                                                    <p className="text-sm text-muted">{user.email}</p>
                                                </div>
                                                <Link
                                                    as="button"
                                                    href={route('users.show', user.id)}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">No users have this role</p>
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

RoleShowPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Role Details
                </h2>
            }
        >
            {page}
        </AuthenticatedLayout>
    );
};
