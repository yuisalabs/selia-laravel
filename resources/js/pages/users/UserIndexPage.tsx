import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import { router } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
}

interface UserIndexPageProps {
    users: User[];
}

export default function UserIndexPage({ users }: UserIndexPageProps) {
    const handleDelete = (id: number) => {
        router.delete(route('users.destroy', id));
    };

    return (
        <>
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Users</CardTitle>
                                    <CardDescription>
                                        Manage users and their roles
                                    </CardDescription>
                                </div>
                                <Link 
                                    as="button"
                                    href={route('users.create')}
                                    className={cn(buttonVariants({ variant: 'primary' }))}
                                >
                                    Create User
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Roles</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.roles.map((role) => (
                                                        <Badge key={role.id} variant="secondary" className="text-xs">
                                                            {role.name}
                                                        </Badge>
                                                    ))}
                                                    {user.roles.length === 0 && (
                                                        <span className="text-sm text-muted">No roles</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.email_verified_at ? (
                                                    <Badge variant="success">Verified</Badge>
                                                ) : (
                                                    <Badge variant="warning">Unverified</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link
                                                    as="button"
                                                    href={route('users.show', user.id)}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    as="button"
                                                    href={route('users.edit', user.id)}
                                                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                                >
                                                    Edit
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <Button variant="danger" size="sm">
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogPopup>
                                                        <AlertDialogBody>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the user "{user.name}".
                                                                This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogBody>
                                                        <AlertDialogFooter>
                                                            <AlertDialogClose>Cancel</AlertDialogClose>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => handleDelete(user.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </AlertDialogFooter>
                                                    </AlertDialogPopup>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Users
                </h2>
            }
        >
            {page}
        </AuthenticatedLayout>
    );
};
