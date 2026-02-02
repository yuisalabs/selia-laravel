import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { PermissionForm } from '@/features/permission';

export default function PermissionCreatePage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        guard_name: 'web',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('permissions.store'));
    };

    return (
        <>
            <Head title="Create Permission" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Permission</CardTitle>
                            <CardDescription>Create a new system permission</CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <PermissionForm data={data} errors={errors} onDataChange={setData} />

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        <LucideSave />
                                        Create
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('permissions.index')}
                                        className={cn(buttonVariants({ variant: 'outline' }))}
                                    >
                                        <LucideCircleX />
                                        Cancel
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

PermissionCreatePage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Create Permission</Heading>}
            breadcrumbs={[{ label: 'Permissions', href: route('permissions.index') }, { label: 'Create' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
