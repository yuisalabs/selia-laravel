import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { UserForm } from '@/features/user';
import { useTranslation } from 'react-i18next';
import type { Role } from '@/types';

interface UserCreatePageProps {
    roles: Role[];
}

export default function UserCreatePage({ roles }: UserCreatePageProps) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <>
            <Head title={t('users.create')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('users.create')}</CardTitle>
                            <CardDescription>{t('users.create_description')}</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <UserForm
                                    data={data}
                                    errors={errors}
                                    roles={roles}
                                    onDataChange={setData}
                                    mode="create"
                                />

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        <LucideSave />
                                        {t('common.create')}
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

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">{t('users.create')}</Heading>}
            breadcrumbs={[{ label: t('users.title'), href: route('users.index') }, { label: t('common.create') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

UserCreatePage.layout = (page: any) => <CreateLayout>{page}</CreateLayout>;
