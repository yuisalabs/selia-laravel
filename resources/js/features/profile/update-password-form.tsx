import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogTrigger, AlertDialogPopup, AlertDialogHeader, AlertDialogTitle, AlertDialogBody, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from '@/components/ui/alert-dialog';
import { LucideSave } from 'lucide-react';

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
    };

    const handleUpdatePassword = () => {
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
                    <AlertDialog>
                        <AlertDialogTrigger
                            render={
                                <Button variant="primary" type="button" disabled={processing}>
                                    <LucideSave/>
                                    Save
                                </Button>
                            }
                        />
                        <AlertDialogPopup>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Password Update</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <AlertDialogDescription>
                                    Are you sure you want to update your password? This action will change your account password.
                                </AlertDialogDescription>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <AlertDialogClose
                                    render={
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    }
                                />
                                <AlertDialogClose
                                    render={
                                        <Button variant="primary" onClick={handleUpdatePassword} disabled={processing}>
                                            <LucideSave/>
                                            Confirm Update
                                        </Button>
                                    }
                                />
                            </AlertDialogFooter>
                        </AlertDialogPopup>
                    </AlertDialog>
                </div>
            </form>
        </Card>
    );
}
