import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import { LucideArrowLeft, LucideSquarePen } from 'lucide-react';
import { Item } from '@/components/ui/item';
import { Heading } from '@/components/ui/heading';
import { useTranslation } from 'react-i18next';
import type { RoleWithRelations } from '@/types';

interface RoleShowPageProps {
    role: RoleWithRelations;
}

export default function RoleShowPage({ role }: RoleShowPageProps) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={`${t('roles.show')}: ${role.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <Link
                                as="button"
                                href={route('roles.index')}
                                className={cn(buttonVariants({ variant: 'outline' }))}
                            >
                                <LucideArrowLeft/>
                                {t('common.back')}
                            </Link>
                            <div className="space-x-2">
                                <Link
                                    as="button"
                                    href={route('roles.edit', role.id)}
                                    className={cn(buttonVariants({ variant: 'secondary' }))}
                                >
                                    <LucideSquarePen/>
                                    {t('common.edit')}
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div>
                                    <CardTitle>{role.name}</CardTitle>
                                    <CardDescription>{t('roles.show_description')}</CardDescription>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('roles.name')}</h3>
                                    <p className="mt-1 text-sm text-foreground">{role.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('roles.guard_name')}</h3>
                                    <p className="mt-1">
                                        <Badge variant="secondary">{role.guard_name}</Badge>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('users.created_at')}</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(role.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('users.updated_at')}</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(role.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    {t('permissions.title')} ({role.permissions.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {role.permissions.length > 0 ? (
                                        role.permissions.map((permission) => (
                                            <Badge key={permission.id} variant="secondary">
                                                {permission.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">{t('roles.no_permissions')}</p>
                                    )}
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    {t('roles.users_with_role')} ({role.users?.length || 0})
                                </h3>
                                <div className="space-y-2">
                                    {role.users && role.users.length > 0 ? (
                                        role.users.map((user) => (
                                            <Item
                                                key={user.id}
                                                className="flex items-center justify-between p-3"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                                                    <p className="text-sm text-muted">{user.email}</p>
                                                </div>
                                                <Link
                                                    as="button"
                                                    href={route('users.show', user.id)}
                                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                                >
                                                    {t('common.show')}
                                                </Link>
                                            </Item>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">{t('roles.no_users')}</p>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

const ShowLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">{t('roles.show')}</Heading>}
            breadcrumbs={[{ label: t('roles.title'), href: route('roles.index') }, { label: t('common.show') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

RoleShowPage.layout = (page: any) => <ShowLayout>{page}</ShowLayout>;
