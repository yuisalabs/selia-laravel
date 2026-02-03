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
import { useTranslation } from 'react-i18next';
import type { Permission } from '@/types';

interface PermissionEditPageProps {
    permission: Permission;
}

export default function PermissionEditPage({ permission }: PermissionEditPageProps) {
    const { t } = useTranslation();
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
            title: t('common.confirm'),
            description: t('permissions.update_confirm'),
            variant: 'info',
            confirmText: t('common.confirm'),
            onConfirm: () => {
                put(route('permissions.update', permission.id));
            },
        });
    };

    return (
        <>
            <Head title={`${t('permissions.edit')}: ${permission.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('permissions.edit')}</CardTitle>
                            <CardDescription>{t('permissions.edit_description')}</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <PermissionForm data={data} errors={errors} onDataChange={setData} />

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="button" disabled={processing} onClick={handleUpdate}>
                                        <LucideSave />
                                        {t('common.save')}
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('permissions.index')}
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
            header={<Heading size="sm">{t('permissions.edit')}</Heading>}
            breadcrumbs={[{ label: t('permissions.title'), href: route('permissions.index') }, { label: t('common.edit') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

PermissionEditPage.layout = (page: any) => <EditLayout>{page}</EditLayout>;
