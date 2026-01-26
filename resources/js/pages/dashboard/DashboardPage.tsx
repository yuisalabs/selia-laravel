import { StatCard } from '@/components/dashboard/stat-card';
import { Heading } from '@/components/ui/heading';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { LucideShieldCheck, LucideUsers, LucideUserCog } from 'lucide-react';

interface DashboardProps {
    stats: {
        users: number;
        roles: number;
        permissions: number;
    };
}

export default function DashboardPage({ stats }: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
                        <StatCard
                            title="Total Users"
                            value={stats.users}
                            icon={LucideUsers}
                        />
                        <StatCard
                            title="Total Roles"
                            value={stats.roles}
                            icon={LucideUserCog}
                        />
                        <StatCard
                            title="Total Permissions"
                            value={stats.permissions}
                            icon={LucideShieldCheck}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

DashboardPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout 
            header={<Heading size="sm">Dashboard</Heading>}
            breadcrumbs={[{ label: 'Dashboard' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
