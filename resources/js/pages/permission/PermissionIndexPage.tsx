import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { router } from '@inertiajs/react';
import { LucideCirclePlus, LucideEye, LucideSquarePen, LucideTrash2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
}

interface PermissionIndexPageProps {
    permissions: {
        data: Permission[];
        links: any[];
        first_page_url: string;
        last_page_url: string;
        current_page: number;
        last_page: number;
    };
}

export default function PermissionIndexPage({ permissions }: PermissionIndexPageProps) {
    const handleDelete = (id: number) => {
        router.delete(route('permissions.destroy', id));
    };

    return (
        <>
            <Head title="Permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>Permissions</CardTitle>
                                <CardDescription>
                                    Manage system permissions
                                </CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('permissions.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                            >
                                <LucideCirclePlus/>
                                Create Permission
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
                                        <TableHead>Roles</TableHead>
                                        <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.data.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell className="font-medium">{permission.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{permission.description || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{permission.guard_name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {permission.roles.map((role) => (
                                                        <Badge key={role.id} variant="secondary" className="text-xs">
                                                            {role.name}
                                                        </Badge>
                                                    ))}
                                                    {permission.roles.length === 0 && (
                                                        <span className="text-sm text-muted">No roles</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        as="button"
                                                        href={route('permissions.show', permission.id)}
                                                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                    >
                                                        <LucideEye className="size-4"/>
                                                        <span className="hidden xl:inline">View</span>
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        href={route('permissions.edit', permission.id)}
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
                                                            />
                                                        }>
                                                            <LucideTrash2 className="size-4"/>
                                                            <span className="hidden xl:inline">Delete</span>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogPopup>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            </AlertDialogHeader>
                                                            <AlertDialogBody>
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
                                                                    <LucideTrash2/>
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
                                {permissions.data.map((permission) => (
                                    <div key={permission.id} className="border-b last:border-0 border-accent p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="font-medium truncate mr-2">{permission.name}</div>
                                                <div className="text-sm text-muted-foreground">{permission.description || '-'}</div>
                                            </div>
                                            <Badge variant="secondary" className="shrink-0">{permission.guard_name}</Badge>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Roles:</span>
                                            <div className="flex flex-wrap gap-1 justify-end">
                                                {permission.roles.map((role) => (
                                                    <Badge key={role.id} variant="secondary" className="text-xs">
                                                        {role.name}
                                                    </Badge>
                                                ))}
                                                {permission.roles.length === 0 && (
                                                    <span className="text-muted">No roles</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-2 pt-2">
                                            <Link
                                                as="button"
                                                href={route('permissions.show', permission.id)}
                                                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "h-8 px-2")}
                                            >
                                                <LucideEye className="w-4 h-4 mr-1"/>
                                                View
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route('permissions.edit', permission.id)}
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
                                                    />
                                                }>
                                                    <LucideTrash2 className="w-4 h-4 mr-1"/>
                                                    Delete
                                                </AlertDialogTrigger>
                                                <AlertDialogPopup>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogBody>
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
                                                            <LucideTrash2/>
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
        <AuthenticatedLayout
            header={<Heading size="sm">Permissions</Heading>}
            breadcrumbs={[{ label: 'Permissions' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
