import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

export default function VerifyEmailForm({ status }: { status?: string }) {
    const { post, processing } = useForm({});
    const { t } = useTranslation();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {t('auth.verification_link_sent', { defaultValue: 'A new verification link has been sent to the email address you provided during registration.' })}
                </div>
            )}

            <form onSubmit={submit}>
                <Button
                    variant="primary"
                    type="submit"
                    size="md"
                    className="w-full"
                    progress={processing}
                    disabled={processing}
                >
                    {t('auth.resend_verification')}
                </Button>
                <Button
                    nativeButton={true}
                    variant="plain"
                    className="mt-4 w-full"
                    render={
                        <Link
                            className='justify-center w-full'
                            href={route('logout')}
                            method="post"
                            as="button"
                        />
                    }>
                    {t('auth.logout')}
                </Button>
            </form>
        </>
    );
}
