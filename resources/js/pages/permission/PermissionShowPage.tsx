import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import { LucideArrowLeft, LucideSquarePen } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { useTranslation } from 'react-i18next';
import type { PermissionWithRelations } from '@/types';

interface PermissionShowPageProps {
    permission: PermissionWithRelations;
}

export default function PermissionShowPage({ permission }: PermissionShowPageProps) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={`${t('permissions.show')}: ${permission.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <Link
                                as="button"
                                href={route('permissions.index')}
                                className={cn(buttonVariants({ variant: 'outline' }))}
                            >
                                <LucideArrowLeft/>
                                {t('common.back')}
                            </Link>
                            <div className="space-x-2">
                                <Link
                                    as="button"
                                    href={route('permissions.edit', permission.id)}
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
                                    <CardTitle>{permission.name}</CardTitle>
                                    <CardDescription>{t('permissions.show_description')}</CardDescription>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('permissions.name')}</h3>
                                    <p className="mt-1 text-sm text-foreground">{permission.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('roles.guard_name')}</h3>
                                    <p className="mt-1">
                                        <Badge variant="secondary">{permission.guard_name}</Badge>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('users.created_at')}</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(permission.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted">{t('users.updated_at')}</h3>
                                    <p className="mt-1 text-sm text-foreground">
                                        {new Date(permission.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    {t('permissions.roles_with_permission')} ({permission.roles?.length || 0})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {permission.roles && permission.roles.length > 0 ? (
                                        permission.roles.map((role) => (
                                            <Badge key={role.id} variant="secondary">
                                                {role.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted">{t('permissions.no_roles')}</p>
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
            header={<Heading size="sm">{t('permissions.show')}</Heading>}
            breadcrumbs={[{ label: t('permissions.title'), href: route('permissions.index') }, { label: t('common.show') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

PermissionShowPage.layout = (page: any) => <ShowLayout>{page}</ShowLayout>;
