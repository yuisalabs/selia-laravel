import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';
import { RoleForm } from '@/features/role';
import { useTranslation } from 'react-i18next';
import type { RoleWithRelations, Permission } from '@/types';

interface RoleEditPageProps {
    role: RoleWithRelations;
    permissions: Permission[];
}

export default function RoleEditPage({ role, permissions }: RoleEditPageProps) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        description: role.description || '',
        guard_name: role.guard_name,
        permissions: role.permissions.map((p) => p.id),
    });

    const { show } = useConfirmDialogStore();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleUpdate = () => {
        show({
            title: t('common.confirm'),
            description: t('roles.update_confirm'),
            variant: 'info',
            confirmText: t('common.confirm'),
            onConfirm: () => {
                put(route('roles.update', role.id));
            },
        });
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
            <Head title={`${t('roles.edit')}: ${role.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('roles.edit')}</CardTitle>
                            <CardDescription>{t('roles.edit_description')}</CardDescription>
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
                                    <Button variant="primary" type="button" disabled={processing} onClick={handleUpdate}>
                                        <LucideSave />
                                        {t('common.save')}
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('roles.index')}
                                        className={cn(buttonVariants({ variant: 'outline' }))}
                                    >
                                        <LucideCircleX />
                                        {t('common.cancel')}
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

const EditLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">{t('roles.edit')}</Heading>}
            breadcrumbs={[{ label: t('roles.title'), href: route('roles.index') }, { label: t('common.edit') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

RoleEditPage.layout = (page: any) => <EditLayout>{page}</EditLayout>;
