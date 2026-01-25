import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FormEventHandler } from 'react';

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
        roles: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    const toggleRole = (roleId: number) => {
        if (data.roles.includes(roleId)) {
            setData('roles', data.roles.filter(id => id !== roleId));
        } else {
            setData('roles', [...data.roles, roleId]);
        }
    };

    return (
        <>
            <Head title="Create User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create User</CardTitle>
                            <CardDescription>
                                Create a new user and assign roles
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
                                        placeholder="Enter user name"
                                    />
                                    <FieldError match={!!errors.name}>{errors.name}</FieldError>
                                </Field>

                                <Field invalid={!!errors.email}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="Enter email address"
                                    />
                                    <FieldError match={!!errors.email}>{errors.email}</FieldError>
                                </Field>

                                <Field invalid={!!errors.password}>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="Enter password"
                                    />
                                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                                </Field>

                                <Field invalid={!!errors.password_confirmation}>
                                    <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="Confirm password"
                                    />
                                    <FieldError match={!!errors.password_confirmation}>{errors.password_confirmation}</FieldError>
                                </Field>

                                <div className="space-y-2">
                                    <label className="text-foreground flex items-center gap-3">Roles</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
                                        {roles.map((role) => (
                                            <div key={role.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`role-${role.id}`}
                                                    checked={data.roles.includes(role.id)}
                                                    onCheckedChange={() => toggleRole(role.id)}
                                                />
                                                <label
                                                    htmlFor={`role-${role.id}`}
                                                    className="text-sm font-medium cursor-pointer"
                                                >
                                                    {role.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.roles && (
                                        <p className="text-sm text-danger">{errors.roles}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        Create
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('users.index')}
                                        className={cn(buttonVariants({ variant: 'outline' }))}
                                    >
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
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Create User
                </h2>
            }
        >
            {page}
        </AuthenticatedLayout>
    );
};
