import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';

export default function DashboardPage() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card className="overflow-hidden bg-card shadow-sm sm:rounded-lg">
                        <Text className="p-6 text-foreground">
                            You're logged in!
                        </Text>
                    </Card>
                </div>
            </div>
        </>
    );
}

DashboardPage.layout = (page: any) => {
    return <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-foreground">
                Dashboard
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>;
};
