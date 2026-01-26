import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import {router} from '@inertiajs/react';
import { LucideCirclePlus, LucideEye, LucideSquarePen, LucideTrash2 } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    created_at: string;
    permissions: Array<{ id: number; name: string }>;
}

interface RoleIndexPageProps {
    roles: {
        data: Role[];
        links: any[];
        first_page_url: string;
        last_page_url: string;
        current_page: number;
        last_page: number;
    };
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
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Roles</CardTitle>
                                <CardDescription>
                                    Manage roles and their permissions
                                </CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('roles.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit')}
                            >
                                <LucideCirclePlus/>
                                Create Role
                            </Link>
                        </CardHeader>
                        <CardBody className="px-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Guard</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.data.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell className="font-medium">{role.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{role.description || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{role.guard_name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.map((permission) => (
                                                        <Badge key={permission.id} variant="secondary" className="text-xs">
                                                            {permission.name}
                                                        </Badge>
                                                    ))}
                                                    {role.permissions.length === 0 && (
                                                        <span className="text-sm text-muted">No permissions</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2 whitespace-nowrap">
                                                <Link
                                                    as="button"
                                                    href={route('roles.show', role.id)}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                >
                                                    <LucideEye/>
                                                    View
                                                </Link>
                                                <Link
                                                    as="button"
                                                    href={route('roles.edit', role.id)}
                                                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                                >
                                                    <LucideSquarePen/>
                                                    Edit
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger
                                                        nativeButton
                                                        render={
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            disabled={role.name === 'Super Admin'}
                                                        />
                                                    }>
                                                        <LucideTrash2/>
                                                        Delete
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
