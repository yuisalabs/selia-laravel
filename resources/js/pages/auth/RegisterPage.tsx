import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Text, TextLink } from '@/components/ui/text';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const errors = usePage().props.errors;

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Register</CardTitle>
                <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>

            <form onSubmit={submit}>
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        placeholder="Enter your name"
                        onChange={(e) => setData('name', e.target.value)}/>
                    <FieldError match={!!errors.name} >{errors.name}</FieldError>
                </Field>

                <Field className="mt-4">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        placeholder="Enter your email"
                        onChange={(e) => setData('email', e.target.value)}/>
                    <FieldError match={!!errors.email} >{errors.email}</FieldError>
                </Field>

                <Field className="mt-4">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        onChange={(e) => setData('password', e.target.value)}/>
                    <FieldError match={!!errors.password} >{errors.password}</FieldError>
                </Field>

                <Field className="mt-4">
                    <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}/>
                    <FieldError match={!!errors.password_confirmation} >{errors.password_confirmation}</FieldError>
                </Field>

                <Button
                    variant="primary"
                    type="submit"
                    className="mt-4 w-full"
                    size="md"
                    progress={processing}
                    disabled={processing}
                >
                    Register
                </Button>
            </form>

            <Text className="text-center mt-4">
                Already registered? <TextLink href={route('login')}>Log in</TextLink>
            </Text>
        </GuestLayout>
    );
}
