import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerifyEmailForm from '@/features/auth/VerifyEmailForm';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</CardDescription>
            </CardHeader>

            <VerifyEmailForm status={status} />
        </GuestLayout>
    );
}
