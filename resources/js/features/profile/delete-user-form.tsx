import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogPopup,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LucideTrash2 } from 'lucide-react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
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
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <Card className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-muted">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button variant="danger" onClick={confirmUserDeletion}>
                <LucideTrash2/>
                Delete Account
            </Button>

            <Dialog open={confirmingUserDeletion} onOpenChange={(open) => !open && closeModal()}>
                <DialogPopup>
                    <form onSubmit={deleteUser}>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        </DialogHeader>

                        <DialogBody>
                            <p className="mt-1 text-sm text-muted">
                                Once your account is deleted, all of its resources and
                                data will be permanently deleted. Please enter your
                                password to confirm you would like to permanently delete
                                your account.
                            </p>

                            <div className="mt-6">
                                <Field invalid={!!errors.password}>
                                    <FieldLabel htmlFor="password" className="sr-only">Password</FieldLabel>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full"
                                        autoFocus
                                        placeholder="Enter your password"
                                    />

                                    <FieldError match={!!errors.password}>{errors.password}</FieldError>
                                </Field>
                            </div>
                        </DialogBody>

                        <DialogFooter>
                            <Button variant="plain" onClick={closeModal}>
                                Cancel
                            </Button>

                            <Button variant="danger" className="ms-3" type="submit" disabled={processing}>
                                <LucideTrash2/>
                                Delete Account
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogPopup>
            </Dialog>
        </Card>
    );
}
