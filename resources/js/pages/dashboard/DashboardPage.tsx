import { StatCard } from '@/components/dashboard/stat-card';
import { Heading } from '@/components/ui/heading';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { LucideShieldCheck, LucideUsers, LucideUserCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardProps {
    stats: {
        users: number;
        roles: number;
        permissions: number;
    };
}

export default function DashboardPage({ stats }: DashboardProps) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('navigation.dashboard')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <StatCard
                            title={t('dashboard.total_users')}
                            value={stats.users}
                            icon={LucideUsers}
                        />
                        <StatCard
                            title={t('dashboard.total_roles')}
                            value={stats.roles}
                            icon={LucideUserCog}
                        />
                        <StatCard
                            title={t('dashboard.total_permissions')}
                            value={stats.permissions}
                            icon={LucideShieldCheck}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout 
            header={<Heading size="sm">{t('navigation.dashboard')}</Heading>}
            breadcrumbs={[{ label: t('navigation.dashboard') }]}
        >
            {children}
        </AuthenticatedLayout>
    );
};

DashboardPage.layout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
