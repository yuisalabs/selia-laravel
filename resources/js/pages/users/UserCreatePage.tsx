import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectList, SelectPopup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';
import { LucideCircleX, LucideSave } from 'lucide-react';
import { Heading } from '@/components/ui/heading';


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

                                <Field invalid={!!errors.role}>
                                    <FieldLabel>Role</FieldLabel>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value) => setData('role', value as string)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectPopup>
                                            <SelectList>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.id} value={role.name}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectList>
                                        </SelectPopup>
                                    </Select>
                                    <FieldError match={!!errors.role}>{errors.role}</FieldError>
                                </Field>

                                <div className="flex items-center gap-4">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        <LucideSave/>
                                        Create
                                    </Button>
                                    <Link
                                        as="button"
                                        href={route('users.index')}
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

UserCreatePage.layout = (page: any) => {
    return (
        <AuthenticatedLayout header={
            <Heading size="sm">Create User</Heading>
        }>
            {page}
        </AuthenticatedLayout>
    );
};
