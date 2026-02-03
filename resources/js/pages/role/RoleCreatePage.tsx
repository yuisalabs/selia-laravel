import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { RoleForm } from '@/features/role';
import { useTranslation } from 'react-i18next';
import type { Permission } from '@/types';

interface RoleCreatePageProps {
    permissions: Permission[];
}

export default function RoleCreatePage({ permissions }: RoleCreatePageProps) {
    const { t } = useTranslation();
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
            <Head title={t('roles.create')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('roles.create')}</CardTitle>
                            <CardDescription>{t('roles.create_description')}</CardDescription>
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
                                        {t('common.create')}
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

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">{t('roles.create')}</Heading>}
            breadcrumbs={[{ label: t('roles.title'), href: route('roles.index') }, { label: t('common.create') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

RoleCreatePage.layout = (page: any) => <CreateLayout>{page}</CreateLayout>;
