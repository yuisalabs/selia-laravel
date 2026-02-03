import { Button } from '@/components/ui/button';
import { LucideTrash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';
import { useTranslation } from 'react-i18next';

interface RoleDeleteDialogProps {
    roleId: number;
    roleName: string;
    disabled?: boolean;
    variant?: 'sm' | 'default';
}

export function RoleDeleteDialog({ roleId, roleName, disabled = false, variant = 'default' }: RoleDeleteDialogProps) {
    const { show } = useConfirmDialogStore();
    const { t } = useTranslation();

    const handleClick = () => {
        show({
            title: t('common.are_you_sure'),
            description: t('roles.delete_confirm', { name: roleName, defaultValue: `This will permanently delete the role "${roleName}". This action cannot be undone.` }),
            variant: 'danger',
            confirmText: t('common.delete'),
            onConfirm: () => {
                router.delete(route('roles.destroy', roleId));
            },
        });
    };

    return (
        <Button
            variant="danger"
            size="sm"
            className={variant === 'sm' ? 'h-8 px-2' : ''}
            disabled={disabled}
            onClick={handleClick}
        >
            <LucideTrash2 className={variant === 'sm' ? 'w-4 h-4 mr-1' : 'size-4'} />
            {variant === 'sm' ? t('common.delete') : <span className="hidden xl:inline">{t('common.delete')}</span>}
        </Button>
    );
}
