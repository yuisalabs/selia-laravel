import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmPasswordForm from '@/features/auth/confirm-password-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function ConfirmPassword() {
    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Confirm Password</CardTitle>
                <CardDescription>This is a secure area of the application. Please confirm your password before continuing.</CardDescription>
            </CardHeader>

            <ConfirmPasswordForm />
        </GuestLayout>
    );
}
