import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Card } from '@/components/ui/card';

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        put,
        reset,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card className={className}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-muted">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <Field invalid={!!errors.current_password}>
                    <FieldLabel htmlFor="current_password">Current Password</FieldLabel>

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        placeholder="Enter your current password"
                    />

                    <FieldError match={!!errors.current_password}>{errors.current_password}</FieldError>
                </Field>

                <Field invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">New Password</FieldLabel>

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="Enter your new password"
                    />

                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                </Field>

                <Field invalid={!!errors.password_confirmation}>
                    <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="Confirm your new password"
                    />

                    <FieldError match={!!errors.password_confirmation}>{errors.password_confirmation}</FieldError>
                </Field>

                <div className="flex items-center gap-4">
                    <Button variant="primary" type="submit" disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-muted">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </Card>
    );
}
