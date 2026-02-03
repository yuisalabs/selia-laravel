import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Item } from '@/components/ui/item';
import { useTranslation } from 'react-i18next';

interface Permission {
    id: number;
    name: string;
    description: string | null;
}

interface RoleFormData {
    name: string;
    description: string;
    guard_name: string;
    permissions: number[];
}

interface RoleFormErrors {
    name?: string;
    description?: string;
    guard_name?: string;
    permissions?: string;
}

interface RoleFormProps {
    data: RoleFormData;
    errors: RoleFormErrors;
    permissions: Permission[];
    onDataChange: <K extends keyof RoleFormData>(key: K, value: RoleFormData[K]) => void;
    onPermissionToggle: (permissionId: number) => void;
}

export function RoleForm({ data, errors, permissions, onDataChange, onPermissionToggle }: RoleFormProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <Field invalid={!!errors.name}>
                <FieldLabel htmlFor="name">{t('roles.name')}</FieldLabel>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => onDataChange('name', e.target.value)}
                    required
                    autoFocus
                    placeholder={t('roles.name_placeholder')}
                />
                <FieldError match={!!errors.name}>{errors.name}</FieldError>
            </Field>

            <Field invalid={!!errors.description}>
                <FieldLabel htmlFor="description">{t('roles.description')} ({t('common.optional', { defaultValue: 'Optional' })})</FieldLabel>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => onDataChange('description', e.target.value)}
                    placeholder={t('roles.description_placeholder')}
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

            <Item variant="plain" className="space-y-2 flex flex-col p-0">
                <label className="text-foreground flex items-center gap-3">{t('permissions.title')}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2 p-2">
                            <Checkbox
                                id={`permission-${permission.id}`}
                                checked={data.permissions.includes(permission.id)}
                                onCheckedChange={() => onPermissionToggle(permission.id)}
                                className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={`permission-${permission.id}`}
                                    className="text-sm font-medium leading-none cursor-pointer"
                                >
                                    {permission.name}
                                </label>
                                {permission.description && (
                                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {errors.permissions && <p className="text-sm text-danger">{errors.permissions}</p>}
            </Item>
        </div>
    );
}
