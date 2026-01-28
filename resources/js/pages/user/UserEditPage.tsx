import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogPopup,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogBody,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogClose,
} from '@/components/ui/alert-dialog';
import { UserForm } from '@/features/user';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface UserEditPageProps {
    user: User;
    roles: Role[];
    permissions: Array<{ id: number; name: string }>;
}

export default function UserEditPage({ user, roles, permissions }: UserEditPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.roles[0]?.name || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleUpdate = () => {
        put(route('users.update', user.id));
    };

    return (
        <>
            <Head title={`Edit User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit User</CardTitle>
                            <CardDescription>Update user details and role assignments</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <UserForm
                                    data={data}
                                    errors={errors}
                                    roles={roles}
                                    onDataChange={setData}
                                    mode="edit"
                                />

                                <div className="flex items-center gap-4">
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            render={
                                                <Button variant="primary" type="button" disabled={processing}>
                                                    <LucideSave />
                                                    Update
                                                </Button>
                                            }
                                        />
                                        <AlertDialogPopup>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirm Update</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogBody>
                                                <AlertDialogDescription>
                                                    Are you sure you want to update this user's information? This action
                                                    will save all changes.
                                                </AlertDialogDescription>
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <AlertDialogClose
                                                    render={<Button variant="outline">Cancel</Button>}
                                                />
                                                <AlertDialogClose
                                                    render={
                                                        <Button variant="primary" onClick={handleUpdate} disabled={processing}>
                                                            <LucideSave />
                                                            Confirm Update
                                                        </Button>
                                                    }
                                                />
                                            </AlertDialogFooter>
                                        </AlertDialogPopup>
                                    </AlertDialog>
                                    <Link
                                        as="button"
                                        href={route('users.index')}
                                        className={cn(buttonVariants({ variant: 'outline' }))}
                                    >
                                        <LucideCircleX />
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserEditPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Edit User</Heading>}
            breadcrumbs={[{ label: 'Users', href: route('users.index') }, { label: 'Edit' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
