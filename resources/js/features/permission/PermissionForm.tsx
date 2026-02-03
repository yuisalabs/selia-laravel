import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';

interface PermissionFormData {
    name: string;
    description: string;
    guard_name: string;
}

interface PermissionFormErrors {
    name?: string;
    description?: string;
    guard_name?: string;
}

interface PermissionFormProps {
    data: PermissionFormData;
    errors: PermissionFormErrors;
    onDataChange: <K extends keyof PermissionFormData>(key: K, value: PermissionFormData[K]) => void;
}

export function PermissionForm({ data, errors, onDataChange }: PermissionFormProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <Field invalid={!!errors.name}>
                <FieldLabel htmlFor="name">{t('permissions.name')}</FieldLabel>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => onDataChange('name', e.target.value)}
                    required
                    autoFocus
                    placeholder={t('permissions.name_placeholder', { defaultValue: 'e.g., edit-posts, delete-users' })}
                />
                <FieldError match={!!errors.name}>{errors.name}</FieldError>
            </Field>

            <Field invalid={!!errors.description}>
                <FieldLabel htmlFor="description">{t('permissions.description')} ({t('common.optional', { defaultValue: 'Optional' })})</FieldLabel>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => onDataChange('description', e.target.value)}
                    placeholder={t('permissions.description_placeholder', { defaultValue: 'Enter permission description' })}
                />
                <FieldError match={!!errors.description}>{errors.description}</FieldError>
            </Field>

            <Field invalid={!!errors.guard_name}>
                <FieldLabel htmlFor="guard_name">{t('roles.guard_name')}</FieldLabel>
                <Input
                    id="guard_name"
                    value={data.guard_name}
                    onChange={(e) => onDataChange('guard_name', e.target.value)}
                    required
                    placeholder={t('roles.guard_name_placeholder')}
                />
                <FieldError match={!!errors.guard_name}>{errors.guard_name}</FieldError>
            </Field>
        </div>
    );
}
