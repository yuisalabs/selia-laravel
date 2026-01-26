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
    permissions: Array<{ id: number; name: string }>;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    roles: Role[];
    permissions: string[];
}

interface UserShowPageProps {
    user: User;
}

export default function UserShowPage({ user }: UserShowPageProps) {
    return (
        <>
            <Head title={`User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <Link
                                as="button"
                                href={route('users.index')}
                                className={cn(buttonVariants({ variant: 'outline' }))}
                            >
                                <LucideArrowLeft/>
                                Back
                            </Link>
                            <div className="space-x-2">
                                <Link
                                    as="button"
                                    href={route('users.edit', user.id)}
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
                                    <CardTitle>{user.name}</CardTitle>
                                    <CardDescription>User details and information</CardDescription>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Name</h3>
                                    <p className="mt-1 text-sm text-foreground">{user.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Email</h3>
                                    <p className="mt-1 text-sm text-foreground">{user.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Email Verification</h3>
                                    <p className="mt-1">
                                        {user.email_verified_at ? (
                                            <Badge variant="success">Verified</Badge>
                                        ) : (
                                            <Badge variant="warning">Unverified</Badge>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">Created At</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(user.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Roles ({user.roles.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.roles.length > 0 ? (
                                        user.roles.map((role) => (
                                            <Badge key={role.id} variant="secondary">
                                                {role.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">No roles assigned</p>
                                    )}
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Permissions ({user.permissions.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {user.permissions.length > 0 ? (
                                        user.permissions.map((permission, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center text-sm px-3 py-2 bg-muted/50 rounded-md"
                                            >
                                                <span className="text-foreground">{permission}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">No permissions</p>
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

UserShowPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={
            <Heading size="sm">User Details</Heading>
        }>
            {page}
        </AuthenticatedLayout>
    );
};
