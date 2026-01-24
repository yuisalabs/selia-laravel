import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ForgotPasswordForm from '@/features/auth/ForgotPasswordForm';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <CardHeader className="text-center border-none">
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that will
                    allow you to choose a new one.
                </CardDescription>
            </CardHeader>

            <ForgotPasswordForm status={status} />
        </GuestLayout>
    );
}
