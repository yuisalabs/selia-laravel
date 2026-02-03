import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ForgotPasswordForm from '@/features/auth/forgot-password-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword({ status }: { status?: string }) {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('auth.forgot_password')} />

            <CardHeader className="text-center border-none">
                <CardTitle>{t('auth.forgot_password')}</CardTitle>
                <CardDescription>
                    {t('auth.forgot_password_message')}
                </CardDescription>
            </CardHeader>

            <ForgotPasswordForm status={status} />
        </GuestLayout>
    );
}
