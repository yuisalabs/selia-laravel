import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { LucideEye, LucideSquarePen } from 'lucide-react';
import { Role } from './types';
import { RoleDeleteDialog } from './RoleDeleteDialog';
import { useTranslation } from 'react-i18next';

interface RoleMobileListProps {
    roles: Role[];
}

export function RoleMobileList({ roles }: RoleMobileListProps) {
    const { t } = useTranslation();

    return (
        <div>
            {roles.map((role) => (
                <div key={role.id} className="border-b last:border-0 border-accent p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="font-medium truncate mr-2">{role.name}</div>
                            <div className="text-sm text-muted-foreground">{role.description || '-'}</div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                            {role.guard_name}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('permissions.title')}:</span>
                        <div className="flex flex-wrap gap-1 justify-end">
                            {role.permissions.map((permission) => (
                                <Badge key={permission.id} variant="secondary" className="text-xs">
                                    {permission.name}
                                </Badge>
                            ))}
                            {role.permissions.length === 0 && <span className="text-muted">{t('roles.no_permissions')}</span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <Link
                            as="button"
                            href={route('roles.show', role.id)}
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-8 px-2')}
                        >
                            <LucideEye className="w-4 h-4 mr-1" />
                            {t('common.view')}
                        </Link>
                        <Link
                            as="button"
                            href={route('roles.edit', role.id)}
                            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'h-8 px-2')}
                        >
                            <LucideSquarePen className="w-4 h-4 mr-1" />
                            {t('common.edit')}
                        </Link>
                        <RoleDeleteDialog
                            roleId={role.id}
                            roleName={role.name}
                            disabled={role.name === 'Super Admin'}
                            variant="sm"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
