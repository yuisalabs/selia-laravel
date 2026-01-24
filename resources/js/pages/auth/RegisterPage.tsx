import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from '@/features/auth/RegisterForm';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function Register() {
    return (
        <GuestLayout>
            <Head title="Register" />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>Register</CardTitle>
                <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>

            <RegisterForm />
        </GuestLayout>
    );
}
