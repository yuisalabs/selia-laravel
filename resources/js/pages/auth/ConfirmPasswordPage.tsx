import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmPasswordForm from '@/features/auth/confirm-password-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ConfirmPassword() {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('auth.confirm_password')} />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>{t('auth.confirm_password')}</CardTitle>
                <CardDescription>{t('auth.confirm_password_message')}</CardDescription>
            </CardHeader>

            <ConfirmPasswordForm />
        </GuestLayout>
    );
}
