import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectList, SelectPopup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface Role {
    id: number;
    name: string;
}

interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

interface UserFormErrors {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    role?: string;
}

interface UserFormProps {
    data: UserFormData;
    errors: UserFormErrors;
    roles: Role[];
    onDataChange: <K extends keyof UserFormData>(key: K, value: UserFormData[K]) => void;
    mode?: 'create' | 'edit';
}

export function UserForm({ data, errors, roles, onDataChange, mode = 'create' }: UserFormProps) {
    const isEditMode = mode === 'edit';
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <Field invalid={!!errors.name}>
                <FieldLabel htmlFor="name">{t('users.name')}</FieldLabel>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => onDataChange('name', e.target.value)}
                    required
                    autoFocus
                    placeholder={t('users.name_placeholder')}
                />
                <FieldError match={!!errors.name}>{errors.name}</FieldError>
            </Field>

            <Field invalid={!!errors.email}>
                <FieldLabel htmlFor="email">{t('users.email')}</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => onDataChange('email', e.target.value)}
                    required
                    placeholder={t('users.email_placeholder')}
                />
                <FieldError match={!!errors.email}>{errors.email}</FieldError>
            </Field>

            <Field invalid={!!errors.password}>
                <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => onDataChange('password', e.target.value)}
                    required={!isEditMode}
                    placeholder={isEditMode ? t('users.password_placeholder_edit') : t('users.password_placeholder')}
                />
                <FieldError match={!!errors.password}>{errors.password}</FieldError>
            </Field>

            <Field invalid={!!errors.password_confirmation}>
                <FieldLabel htmlFor="password_confirmation">{t('auth.confirm_password')}</FieldLabel>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => onDataChange('password_confirmation', e.target.value)}
                    required={!isEditMode}
                    placeholder={isEditMode ? t('users.password_confirm_placeholder_edit') : t('users.password_confirm_placeholder')}
                />
                <FieldError match={!!errors.password_confirmation}>{errors.password_confirmation}</FieldError>
            </Field>

            <Field invalid={!!errors.role}>
                <FieldLabel>{t('users.role')}</FieldLabel>
                <Select value={data.role} onValueChange={(value) => onDataChange('role', value as string)}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('users.select_role')} />
                    </SelectTrigger>
                    <SelectPopup>
                        <SelectList>
                            {roles.map((role) => (
                                <SelectItem key={role.id} value={role.name}>
                                    {role.name}
                                </SelectItem>
                            ))}
                        </SelectList>
                    </SelectPopup>
                </Select>
                <FieldError match={!!errors.role}>{errors.role}</FieldError>
            </Field>
        </div>
    );
}
