import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

export default function ForgotPasswordForm({ status }: { status?: string }) {
    const errors = usePage().props.errors;
    const { t } = useTranslation();

    const { data, setData, post, processing } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Field invalid={!!errors.email}>
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

                <Button
                    type="submit"
                    className="my-4 w-full"
                    disabled={processing}
                >
                    {t('auth.send_reset_link')}
                </Button>
            </form>
        </>
    );
}
