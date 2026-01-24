import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({
    token,
    email,
}: ResetPasswordProps) {
    const errors = usePage().props.errors;
    
    const { data, setData, post, processing, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Set a new password for your account.</CardDescription>
            </CardHeader>

            <form onSubmit={submit}>
                <Field invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        placeholder="Enter your email"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <FieldError match={!!errors.email}>{errors.email}</FieldError>
                </Field>

                <Field className="mt-4" invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        placeholder="Enter new password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                </Field>

                <Field className="mt-4" invalid={!!errors.password_confirmation}>
                    <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <FieldError match={!!errors.password_confirmation}>{errors.password_confirmation}</FieldError>
                </Field>

                <Button variant="primary" className="mt-4 w-full" type="submit" disabled={processing}>
                    Reset Password
                </Button>
            </form>
        </GuestLayout>
    );
}
