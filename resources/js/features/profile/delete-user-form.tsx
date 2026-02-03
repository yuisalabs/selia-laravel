import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LucideTrash2 } from 'lucide-react';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';
import { useTranslation } from 'react-i18next';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState('');
    const { show, update, hide } = useConfirmDialogStore();
    const { t } = useTranslation();

    const {
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setPassword('');
        clearErrors();
        
        show({
            title: t('profile.delete_account_confirm'),
            description: t('profile.delete_account_confirm_description', { defaultValue: 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.' }),
            variant: 'danger',
            confirmText: t('common.delete_account'),
            confirmDisabled: true,
            content: (
                <PasswordInput
                    passwordInput={passwordInput}
                    error={errors.password}
                    onChange={(value) => {
                        setPassword(value);
                        setData('password', value);
                        update({ confirmDisabled: !value });
                    }}
                    placeholder={t('auth.password_placeholder')}
                />
            ),
            onConfirm: () => {
                return new Promise<void>((resolve, reject) => {
                    destroy(route('profile.destroy'), {
                        preserveScroll: true,
                        onSuccess: () => {
                            hide();
                            resolve();
                        },
                        onError: () => {
                            passwordInput.current?.focus();
                            reject();
                        },
                        onFinish: () => {
                            reset();
                            setPassword('');
                        },
                    });
                });
            },
            onCancel: () => {
                clearErrors();
                reset();
                setPassword('');
            },
        });
    };

    return (
        <Card className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    {t('profile.delete_account')}
                </h2>

                <p className="mt-1 text-sm text-muted">
                    {t('profile.delete_account_description', { defaultValue: 'Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.' })}
                </p>
            </header>

            <Button variant="danger" onClick={confirmUserDeletion}>
                <LucideTrash2/>
                {t('common.delete_account')}
            </Button>
        </Card>
    );
}

function PasswordInput({
    passwordInput,
    error,
    onChange,
    placeholder,
}: {
    passwordInput: React.RefObject<HTMLInputElement>;
    error?: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <Field invalid={!!error}>
            <FieldLabel htmlFor="password" className="sr-only">Password</FieldLabel>
            <Input
                id="password"
                type="password"
                name="password"
                ref={passwordInput}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full"
                autoFocus
                placeholder={placeholder}
            />
            <FieldError match={!!error}>{error}</FieldError>
        </Field>
    );
}
