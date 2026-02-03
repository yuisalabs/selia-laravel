import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

interface ResetPasswordFormProps {
    token: string;
    email: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
    const errors = usePage().props.errors;
    const { t } = useTranslation();

    const { data, setData, post, processing, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <form onSubmit={submit}>
            <Field invalid={!!errors.email}>
                <FieldLabel htmlFor="email">{t('auth.email')}</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    placeholder={t('auth.email_placeholder')}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <FieldError match={!!errors.email}>{errors.email}</FieldError>
            </Field>

            <Field className="mt-4" invalid={!!errors.password}>
                <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoComplete="new-password"
                    placeholder={t('auth.password_placeholder_new', { defaultValue: 'Enter new password' })}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <FieldError match={!!errors.password}>{errors.password}</FieldError>
            </Field>

            <Field className="mt-4" invalid={!!errors.password_confirmation}>
                <FieldLabel htmlFor="password_confirmation">{t('auth.confirm_password')}</FieldLabel>
                <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    placeholder={t('auth.confirm_password_placeholder_new', { defaultValue: 'Confirm new password' })}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <FieldError match={!!errors.password_confirmation}>{errors.password_confirmation}</FieldError>
            </Field>

            <Button variant="primary" className="mt-4 w-full" type="submit" disabled={processing}>
                {t('auth.reset_password')}
            </Button>
        </form>
    );
}
