import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/features/auth/reset-password-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({
    token,
    email,
}: ResetPasswordProps) {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('auth.reset_password')} />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>{t('auth.reset_password')}</CardTitle>
                <CardDescription>{t('auth.reset_password_description')}</CardDescription>
            </CardHeader>

            <ResetPasswordForm token={token} email={email} />
        </GuestLayout>
    );
}
