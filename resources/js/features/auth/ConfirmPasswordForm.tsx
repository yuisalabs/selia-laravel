import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPasswordForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <form onSubmit={submit}>
            <Field className="mt-4" invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    placeholder="Enter your password"
                    onChange={(e) => setData('password', e.target.value)}
                />
                <FieldError match={!!errors.password}>{errors.password}</FieldError>
            </Field>

            <Button variant="primary" className="mt-4 w-full" type="submit" disabled={processing}>
                Confirm
            </Button>
        </form>
    );
}
