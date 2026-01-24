import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text, TextLink } from '@/components/ui/text';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface LoginFormProps {
    canResetPassword?: boolean;
}

export default function LoginForm({ canResetPassword }: LoginFormProps) {
    const errors = usePage().props.errors;

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
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        placeholder="Enter your email"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <FieldError match={!!errors.email}>{errors.email}</FieldError>
                </Field>

                <Field className="mt-4" invalid={!!errors.password}>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        {canResetPassword && (
                            <TextLink href={route('password.request')}>
                                Forgot your password?
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        placeholder="Enter your password"
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
                        <span>Remember me</span>
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
                    Log in
                </Button>
            </form>

            <Text className="text-center mt-4">
                Don't have an account? <TextLink href={route('register')}>Register</TextLink>
            </Text>
        </>
    );
}
