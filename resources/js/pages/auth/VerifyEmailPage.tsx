import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</CardDescription>
            </CardHeader>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <Button
                    variant="primary"
                    type="submit"
                    size="md"
                    className="w-full"
                    progress={processing}
                    disabled={processing}
                >
                    Resend Verification Email
                </Button>
                <Button
                    nativeButton={false}
                    variant="plain"
                    className="mt-4"
                    render={
                        <Link
                            className='text-center w-full'
                            href={route('logout')}
                            method="post"
                            as="button"
                        />
                    }>
                    Log out
                </Button>
            </form>
        </GuestLayout>
    );
}
