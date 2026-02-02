import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { UserForm } from '@/features/user';

interface Role {
    id: number;
    name: string;
}

interface UserCreatePageProps {
    roles: Role[];
}

export default function UserCreatePage({ roles }: UserCreatePageProps) {
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
            <Head title="Create User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create User</CardTitle>
                            <CardDescription>Create a new user and assign roles</CardDescription>
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
                                        Create
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('users.index')}
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

UserCreatePage.layout = (page: any) => {
    return (
        <AuthenticatedLayout
            header={<Heading size="sm">Create User</Heading>}
            breadcrumbs={[{ label: 'Users', href: route('users.index') }, { label: 'Create' }]}
        >
            {page}
        </AuthenticatedLayout>
    );
};
