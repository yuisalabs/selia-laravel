import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import { router } from '@inertiajs/react';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
}

interface PermissionIndexPageProps {
    permissions: Permission[];
}

export default function PermissionIndexPage({ permissions }: PermissionIndexPageProps) {
    const handleDelete = (id: number) => {
        router.delete(route('permissions.destroy', id));
    };

    return (
        <>
            <Head title="Permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Permissions</CardTitle>
                                    <CardDescription>
                                        Manage system permissions
                                    </CardDescription>
                                </div>
                                <Link
                                    as="button"
                                    href={route('permissions.create')}
                                    className={cn(buttonVariants({ variant: 'primary' }))}
                                >
                                    Create Permission
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Guard</TableHead>
                                        <TableHead>Roles</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell className="font-medium">{permission.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{permission.guard_name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {permission.roles.length} role(s)
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link
                                                    as="button"
                                                    href={route('permissions.show', permission.id)}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    as="button"
                                                    href={route('permissions.edit', permission.id)}
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
                                                                This will permanently delete the permission "{permission.name}".
                                                                This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogBody>
                                                        <AlertDialogFooter>
                                                            <AlertDialogClose>Cancel</AlertDialogClose>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => handleDelete(permission.id)}
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

PermissionIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Permissions
                </h2>
            }
        >
            {page}
        </AuthenticatedLayout>
    );
};
