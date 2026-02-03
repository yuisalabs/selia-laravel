import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/features/auth/login-form';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface LoginProps {
    canResetPassword: boolean;
}

export default function Login({    
    canResetPassword,
}: LoginProps) {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('common.login')} />

            <CardHeader className="flex flex-col items-center text-center border-none">
                <CardTitle>{t('auth.login_title')}</CardTitle>
                <CardDescription>{t('auth.login_description')}</CardDescription>
            </CardHeader>

            <LoginForm canResetPassword={canResetPassword} />
        </GuestLayout>
    );
}
