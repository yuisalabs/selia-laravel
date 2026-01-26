import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginationLinks } from '@/components/pagination-links';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogBody, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import { LucideCirclePlus, LucideEye, LucideSquarePen, LucideTrash2 } from 'lucide-react';
import { Heading } from '@/components/ui/heading';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
}

interface UserIndexPageProps {
    users: {
        data: User[];
        links: any[];
        first_page_url: string;
        last_page_url: string;
        current_page: number;
        last_page: number;
    };
}

export default function UserIndexPage({ users }: UserIndexPageProps) {
    const authUser = usePage().props.auth.user;    

    const handleDelete = (id: number) => {
        router.delete(route('users.destroy', id));
    };

    return (
        <>
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card className="">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="text-start w-full">
                                <CardTitle>Users</CardTitle>
                                <CardDescription>
                                    Manage users and their roles
                                </CardDescription>
                            </div>
                            <Link
                                as="button"
                                href={route('users.create')}
                                className={cn(buttonVariants({ variant: 'primary' }), 'w-fit text-nowrap self-end md:self-auto')}
                            >
                                <LucideCirclePlus/>
                                Create User
                            </Link>
                        </CardHeader>
                        <CardBody className="px-0">
                            <div className="hidden md:block">
                                <TableContainer>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Roles</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.data.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>
                                                        {user.roles.length > 0 ? (
                                                            <Badge variant="secondary" className="text-xs">
                                                                {user.roles[0].name}
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-sm text-muted">No role</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.email_verified_at ? (
                                                            <Badge variant="success">Verified</Badge>
                                                        ) : (
                                                            <Badge variant="warning">Unverified</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                as="button"
                                                                href={route('users.show', user.id)}
                                                                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                            >
                                                                <LucideEye className="size-4"/>
                                                                <span className="hidden xl:inline">View</span>
                                                            </Link>
                                                            <Link
                                                                as="button"
                                                                href={route('users.edit', user.id)}
                                                                className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                                            >
                                                                <LucideSquarePen className="size-4"/>
                                                                <span className="hidden xl:inline">Edit</span>
                                                            </Link>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger render={
                                                                    <Button
                                                                        variant="danger"
                                                                        size="sm"
                                                                        disabled={user.id === authUser.id}
                                                                    />
                                                                }>
                                                                    <LucideTrash2 className="size-4"/>
                                                                    <span className="hidden xl:inline">Delete</span>
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
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                            <div className="block md:hidden">
                                {users.data.map((user) => (
                                    <div key={user.id} className="border-b last:border-0 border-accent p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="font-medium truncate mr-2">{user.name}</div>
                                                <div className="text-sm text-muted-foreground break-all">{user.email}</div>
                                            </div>
                                            {user.email_verified_at ? (
                                                <Badge variant="success" className="shrink-0">Verified</Badge>
                                            ) : (
                                                <Badge variant="warning" className="shrink-0">Unverified</Badge>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Role:</span>
                                            {user.roles.length > 0 ? (
                                                <Badge variant="secondary" className="text-xs">
                                                    {user.roles[0].name}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted">No role</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end gap-2 pt-2">
                                             <Link
                                                as="button"
                                                href={route('users.show', user.id)}
                                                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "h-8 px-2")}
                                            >
                                                <LucideEye className="w-4 h-4 mr-1"/>
                                                View
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route('users.edit', user.id)}
                                                className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), "h-8 px-2")}
                                            >
                                                <LucideSquarePen className="w-4 h-4 mr-1"/>
                                                Edit
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger render={
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="h-8 px-2"
                                                        disabled={user.id === authUser.id}
                                                    />
                                                }>
                                                    <LucideTrash2 className="w-4 h-4 mr-1"/>
                                                    Delete
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center">
                            <PaginationLinks paginator={users} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserIndexPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={
            <Heading size="sm">Users</Heading>
        }>
            {page}
        </AuthenticatedLayout>
    );
};
