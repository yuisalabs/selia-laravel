import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';
import { PermissionForm } from '@/features/permission';

interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
}

interface PermissionEditPageProps {
    permission: Permission;
}

export default function PermissionEditPage({ permission }: PermissionEditPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
        description: permission.description || '',
        guard_name: permission.guard_name,
    });

    const { show } = useConfirmDialogStore();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleUpdate = () => {
        show({
            title: 'Confirm Update',
            description: "Are you sure you want to update this permission's information? This action will save all changes.",
            variant: 'info',
            confirmText: 'Confirm Update',
            onConfirm: () => {
                put(route('permissions.update', permission.id));
            },
        });
    };

    return (
        <>
            <Head title={`Edit Permission: ${permission.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Permission</CardTitle>
                            <CardDescription>Update permission details</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <PermissionForm data={data} errors={errors} onDataChange={setData} />

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="button" disabled={processing} onClick={handleUpdate}>
                                        <LucideSave />
                                        Update
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('permissions.index')}
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

PermissionEditPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Edit Permission</Heading>}
            breadcrumbs={[{ label: 'Permissions', href: route('permissions.index') }, { label: 'Edit' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};

