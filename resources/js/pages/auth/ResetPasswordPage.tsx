import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/features/auth/ResetPasswordForm';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({
    token,
    email,
}: ResetPasswordProps) {
    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Set a new password for your account.</CardDescription>
            </CardHeader>

            <ResetPasswordForm token={token} email={email} />
        </GuestLayout>
    );
}
