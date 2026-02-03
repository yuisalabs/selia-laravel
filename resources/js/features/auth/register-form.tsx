import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Text, TextLink } from '@/components/ui/text';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
    const errors = usePage().props.errors;
    const { t } = useTranslation();

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <Field>
                    <FieldLabel htmlFor="name">{t('users.name')}</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        placeholder={t('users.name_placeholder')}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <FieldError match={!!errors.name}>{errors.name}</FieldError>
                </Field>

                <Field className="mt-4">
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

                <Field className="mt-4">
                    <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        placeholder={t('auth.password_placeholder')}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                </Field>

                <Field className="mt-4">
                    <FieldLabel htmlFor="password_confirmation">{t('auth.confirm_password')}</FieldLabel>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        placeholder={t('auth.confirm_password_placeholder', { defaultValue: 'Confirm your password' })}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <FieldError match={!!errors.password_confirmation}>{errors.password_confirmation}</FieldError>
                </Field>

                <Button
                    variant="primary"
                    type="submit"
                    className="mt-4 w-full"
                    size="md"
                    progress={processing}
                    disabled={processing}
                >
                    {t('auth.register')}
                </Button>
            </form>

            <Text className="text-center mt-4">
                {t('auth.already_registered')} <TextLink href={route('login')}>{t('auth.login')}</TextLink>
            </Text>
        </>
    );
}
