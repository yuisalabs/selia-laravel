import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Card } from '@/components/ui/card';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';
import { LucideSave } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UpdateProfileInformationProps {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: UpdateProfileInformationProps) {
    const user = usePage().props.auth.user;
    const errors = usePage().props.errors;
    const { show } = useConfirmDialogStore();
    const { t } = useTranslation();

    const { data, setData, patch, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    const handleUpdate = () => {
        show({
            title: t('profile.update_profile_confirm'),
            description: t('profile.update_profile_confirm_description', { defaultValue: 'Are you sure you want to update your profile information? This action will save all changes.' }),
            variant: 'info',
            confirmText: t('common.confirm_update'),
            onConfirm: () => {
                patch(route('profile.update'));
            },
        });
    };

    return (
        <Card className={className}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    {t('profile.profile_information')}
                </h2>

                <p className="mt-1 text-sm text-muted">
                    {t('profile.profile_information_description', { defaultValue: "Update your account's profile information and email address." })}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <Field invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">{t('users.name')}</FieldLabel>

                    <Input
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder={t('users.name_placeholder')}
                    />

                    <FieldError match={!!errors.name}>{errors.name}</FieldError>
                </Field>

                <Field invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">{t('auth.email')}</FieldLabel>

                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder={t('auth.email_placeholder')}
                    />

                    <FieldError match={!!errors.email}>{errors.email}</FieldError>
                </Field>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-foreground">
                            {t('auth.email_unverified')}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-muted underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                {t('auth.click_to_resend_verification')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                {t('auth.verification_link_sent_new', { defaultValue: 'A new verification link has been sent to your email address.' })}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button variant="primary" type="button" disabled={processing} onClick={handleUpdate}>
                        <LucideSave/>
                        {t('common.save')}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
