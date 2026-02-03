import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text, TextLink } from '@/components/ui/text';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
    canResetPassword?: boolean;
}

export default function LoginForm({ canResetPassword }: LoginFormProps) {
    const errors = usePage().props.errors;
    const { t } = useTranslation();

    const { data, setData, post, processing, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
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
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
                        {canResetPassword && (
                            <TextLink href={route('password.request')}>
                                {t('auth.forgot_password_question')}
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        placeholder={t('auth.password_placeholder')}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                </Field>

                <div className="mt-4 block">
                    <Label>
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                        />
                        <span>{t('auth.remember_me')}</span>
                    </Label>
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    className="mt-4 w-full"
                    size="md"
                    progress={processing}
                    disabled={processing}
                >
                    {t('auth.login')}
                </Button>
            </form>

            <Text className="text-center mt-4">
                {t('auth.no_account')} <TextLink href={route('register')}>{t('auth.register')}</TextLink>
            </Text>
        </>
    );
}
