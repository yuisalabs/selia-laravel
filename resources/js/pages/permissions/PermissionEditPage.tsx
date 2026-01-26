import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Heading } from '@/components/ui/heading';

interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
}

interface PermissionEditPageProps {
    permission: Permission;
}

export default function PermissionEditPage({ permission }: PermissionEditPageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
        description: permission.description || '',
        guard_name: permission.guard_name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('permissions.update', permission.id));
    };

    return (
        <>
            <Head title={`Edit Permission: ${permission.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Permission</CardTitle>
                            <CardDescription>
                                Update permission details
                            </CardDescription>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={submit} className="space-y-6">
                                <Field invalid={!!errors.name}>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="e.g., edit-posts, delete-users"
                                    />
                                    <FieldError match={!!errors.name}>{errors.name}</FieldError>
                                </Field>

                                <Field invalid={!!errors.description}>
                                    <FieldLabel htmlFor="description">Description (Optional)</FieldLabel>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter permission description"
                                    />
                                    <FieldError match={!!errors.description}>{errors.description}</FieldError>
                                </Field>

                                <Field invalid={!!errors.guard_name}>
                                    <FieldLabel htmlFor="guard_name">Guard Name</FieldLabel>
                                    <Input
                                        id="guard_name"
                                        value={data.guard_name}
                                        onChange={(e) => setData('guard_name', e.target.value)}
                                        required
                                        placeholder="Enter guard name"
                                    />
                                    <FieldError match={!!errors.guard_name}>{errors.guard_name}</FieldError>
                                </Field>

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        <LucideSave/>
                                        Update
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('permissions.index')}
                                        className={cn(buttonVariants({ variant: 'outline' }))}
                                    >
                                        <LucideCircleX/>
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

PermissionEditPage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={
            <Heading size="sm">Edit Permission</Heading>
        }>
            {page}
        </AuthenticatedLayout>
    );
};
