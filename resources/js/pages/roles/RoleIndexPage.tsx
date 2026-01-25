import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import {router} from '@inertiajs/react';

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    permissions: Array<{ id: number; name: string }>;
}

interface RoleIndexPageProps {
    roles: Role[];
}

export default function RoleIndexPage({ roles }: RoleIndexPageProps) {
    const handleDelete = (id: number) => {
        router.delete(route('roles.destroy', id));
    };

    return (
        <>
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Roles</CardTitle>
                                    <CardDescription>
                                        Manage roles and their permissions
                                    </CardDescription>
                                </div>
                                <Link
                                    as="button"
                                    href={route('roles.create')}
                                    className={cn(buttonVariants({ variant: 'primary' }))}
                                >
                                    Create Role
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Guard</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell className="font-medium">{role.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{role.guard_name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {role.permissions.length} permission(s)
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link
                                                    as="button"
                                                    href={route('roles.show', role.id)}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    as="button"
                                                    href={route('roles.edit', role.id)}
                                                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                                >
                                                    Edit
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            disabled={role.name === 'Super Admin'}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogPopup>
                                                        <AlertDialogBody>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the role "{role.name}".
                                                                This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogBody>
                                                        <AlertDialogFooter>
                                                            <AlertDialogClose>Cancel</AlertDialogClose>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => handleDelete(role.id)}
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

RoleIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Roles
                </h2>
            }
        >
            {page}
        </AuthenticatedLayout>
    );
};
