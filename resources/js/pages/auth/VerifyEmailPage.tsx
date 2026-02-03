import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerifyEmailForm from '@/features/auth/verify-email-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function VerifyEmail({ status }: { status?: string }) {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('auth.verify_email')} />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>{t('auth.verify_email')}</CardTitle>
                <CardDescription>{t('auth.verify_email_message')}</CardDescription>
            </CardHeader>

            <VerifyEmailForm status={status} />
        </GuestLayout>
    );
}
