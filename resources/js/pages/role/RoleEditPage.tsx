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
import { RoleForm } from '@/features/role';

interface Permission {
    id: number;
    name: string;
    description: string | null;
}

interface Role {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    permissions: Permission[];
}

interface RoleEditPageProps {
    role: Role;
    permissions: Permission[];
}

export default function RoleEditPage({ role, permissions }: RoleEditPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        description: role.description || '',
        guard_name: role.guard_name,
        permissions: role.permissions.map((p) => p.id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleUpdate = () => {
        put(route('roles.update', role.id));
    };

    const togglePermission = (permissionId: number) => {
        if (data.permissions.includes(permissionId)) {
            setData('permissions', data.permissions.filter((id) => id !== permissionId));
        } else {
            setData('permissions', [...data.permissions, permissionId]);
        }
    };

    return (
        <>
            <Head title={`Edit Role: ${role.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Role</CardTitle>
                            <CardDescription>Update role details and permissions</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <RoleForm
                                    data={data}
                                    errors={errors}
                                    permissions={permissions}
                                    onDataChange={setData}
                                    onPermissionToggle={togglePermission}
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
                                                    Are you sure you want to update this role's information? This action
                                                    will save all changes.
                                                </AlertDialogDescription>
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <AlertDialogClose render={<Button variant="outline">Cancel</Button>} />
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
                                        href={route('roles.index')}
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

RoleEditPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Edit Role</Heading>}
            breadcrumbs={[{ label: 'Roles', href: route('roles.index') }, { label: 'Edit' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
