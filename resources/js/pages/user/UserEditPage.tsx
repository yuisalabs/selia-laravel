import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';
import { UserForm } from '@/features/user';
import { useTranslation } from 'react-i18next';
import type { Role, UserWithRelations } from '@/types';

interface UserEditPageProps {
    user: UserWithRelations;
    roles: Role[];
    permissions: Array<{ id: number; name: string }>;
}

export default function UserEditPage({ user, roles, permissions }: UserEditPageProps) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.roles[0]?.name || '',
    });

    const { show } = useConfirmDialogStore();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleUpdate = () => {
        show({
            title: t('common.confirm'),
            description: t('users.update_confirm'),
            variant: 'info',
            confirmText: t('common.confirm'),
            onConfirm: () => {
                put(route('users.update', user.id));
            },
        });
    };

    return (
        <>
            <Head title={`${t('users.edit')}: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('users.edit')}</CardTitle>
                            <CardDescription>{t('users.edit_description')}</CardDescription>
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
                                    <Button variant="primary" type="button" disabled={processing} onClick={handleUpdate}>
                                        <LucideSave />
                                        {t('common.save')}
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('users.index')}
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
            header={<Heading size="sm">{t('users.edit')}</Heading>}
            breadcrumbs={[{ label: t('users.title'), href: route('users.index') }, { label: t('common.edit') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

UserEditPage.layout = (page: any) => <EditLayout>{page}</EditLayout>;
