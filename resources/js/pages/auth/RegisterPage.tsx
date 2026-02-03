import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from '@/features/auth/register-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('common.register')} />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>{t('auth.register_title')}</CardTitle>
                <CardDescription>{t('auth.register_description')}</CardDescription>
            </CardHeader>

            <RegisterForm />
        </GuestLayout>
    );
}
