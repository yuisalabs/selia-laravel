import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { RoleForm } from '@/features/role';

interface Permission {
    id: number;
    name: string;
    description: string | null;
}

interface RoleCreatePageProps {
    permissions: Permission[];
}

export default function RoleCreatePage({ permissions }: RoleCreatePageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        guard_name: 'web',
        permissions: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'));
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
            <Head title="Create Role" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Role</CardTitle>
                            <CardDescription>Create a new role and assign permissions</CardDescription>
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
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        <LucideSave />
                                        Create
                                    </Button>
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

RoleCreatePage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Create Role</Heading>}
            breadcrumbs={[{ label: 'Roles', href: route('roles.index') }, { label: 'Create' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
