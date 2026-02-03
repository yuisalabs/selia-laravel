import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { LucideEye, LucideSquarePen } from 'lucide-react';
import { Permission } from './types';
import { PermissionDeleteDialog } from './PermissionDeleteDialog';
import { useTranslation } from 'react-i18next';

interface PermissionMobileListProps {
    permissions: Permission[];
}

export function PermissionMobileList({ permissions }: PermissionMobileListProps) {
    const { t } = useTranslation();

    return (
        <div>
            {permissions.map((permission) => (
                <div key={permission.id} className="border-b last:border-0 border-accent p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="font-medium truncate mr-2">{permission.name}</div>
                            <div className="text-sm text-muted-foreground">{permission.description || '-'}</div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                            {permission.guard_name}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('permissions.roles')}:</span>
                        <div className="flex flex-wrap gap-1 justify-end">
                            {permission.roles.map((role) => (
                                <Badge key={role.id} variant="secondary" className="text-xs">
                                    {role.name}
                                </Badge>
                            ))}
                            {permission.roles.length === 0 && <span className="text-muted">{t('permissions.no_roles')}</span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <Link
                            as="button"
                            href={route('permissions.show', permission.id)}
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-8 px-2')}
                        >
                            <LucideEye className="w-4 h-4 mr-1" />
                            {t('common.view')}
                        </Link>
                        <Link
                            as="button"
                            href={route('permissions.edit', permission.id)}
                            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'h-8 px-2')}
                        >
                            <LucideSquarePen className="w-4 h-4 mr-1" />
                            {t('common.edit')}
                        </Link>
                        <PermissionDeleteDialog
                            permissionId={permission.id}
                            permissionName={permission.name}
                            variant="sm"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
