import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/features/auth/LoginForm';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

interface LoginProps {
    canResetPassword: boolean;
}

export default function Login({    
    canResetPassword,
}: LoginProps) {
    return (
        <GuestLayout>
            <Head title="Log in" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>Sign in with your email or continue with a connected account.</CardDescription>
            </CardHeader>

            <LoginForm canResetPassword={canResetPassword} />
        </GuestLayout>
    );
}
