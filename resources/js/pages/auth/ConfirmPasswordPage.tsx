import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Confirm Password</CardTitle>
                <CardDescription>This is a secure area of the application. Please confirm your password before continuing.</CardDescription>
            </CardHeader>

            <form onSubmit={submit}>
                <Field className="mt-4" invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder="Enter your password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                </Field>

                <Button variant="primary" className="mt-4 w-full" type="submit" disabled={processing}>
                    Confirm
                </Button>
            </form>
        </GuestLayout>
    );
}
