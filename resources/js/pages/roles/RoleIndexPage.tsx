import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import {router} from '@inertiajs/react';
import { LucideCirclePlus, LucideEye, LucideSquarePen, LucideTrash2 } from 'lucide-react';
import { Heading } from '@/components/ui/heading';

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
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>Roles</CardTitle>
                                <CardDescription>
                                    Manage roles and their permissions
                                </CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('roles.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                            >
                                <LucideCirclePlus/>
                                Create Role
                            </Link>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <TableContainer>
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
                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        as="button"
                                                        href={route('roles.show', role.id)}
                                                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                    >
                                                        <LucideEye className="size-4"/>
                                                        <span className="hidden xl:inline">View</span>
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        href={route('roles.edit', role.id)}
                                                        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                                    >
                                                        <LucideSquarePen className="size-4"/>
                                                        <span className="hidden xl:inline">Edit</span>
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
                                                            <LucideTrash2 className="size-4"/>
                                                            <span className="hidden xl:inline">Delete</span>
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
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                                </TableContainer>
                            </div>

                            <div className="block md:hidden">
                                {roles.data.map((role) => (
                                    <div key={role.id} className="border-b last:border-0 border-accent p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="font-medium truncate mr-2">{role.name}</div>
                                                <div className="text-sm text-muted-foreground">{role.description || '-'}</div>
                                            </div>
                                            <Badge variant="secondary" className="shrink-0">{role.guard_name}</Badge>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Permissions:</span>
                                            <div className="flex flex-wrap gap-1 justify-end">
                                                {role.permissions.map((permission) => (
                                                    <Badge key={permission.id} variant="secondary" className="text-xs">
                                                        {permission.name}
                                                    </Badge>
                                                ))}
                                                {role.permissions.length === 0 && (
                                                    <span className="text-muted">No permissions</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-2 pt-2">
                                            <Link
                                                as="button"
                                                href={route('roles.show', role.id)}
                                                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "h-8 px-2")}
                                            >
                                                <LucideEye className="w-4 h-4 mr-1"/>
                                                View
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route('roles.edit', role.id)}
                                                className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), "h-8 px-2")}
                                            >
                                                <LucideSquarePen className="w-4 h-4 mr-1"/>
                                                Edit
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger
                                                    nativeButton
                                                    render={
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="h-8 px-2"
                                                        disabled={role.name === 'Super Admin'}
                                                    />
                                                }>
                                                    <LucideTrash2 className="w-4 h-4 mr-1"/>
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
                                        </div>
                                    </div>
                                ))}
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
        <AuthenticatedLayout header={
            <Heading size="sm">Roles</Heading>
        }>
            {page}
        </AuthenticatedLayout>
    );
};
