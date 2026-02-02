import { Button } from '@/components/ui/button';
import { LucideTrash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';

interface RoleDeleteDialogProps {
    roleId: number;
    roleName: string;
    disabled?: boolean;
    variant?: 'sm' | 'default';
}

export function RoleDeleteDialog({ roleId, roleName, disabled = false, variant = 'default' }: RoleDeleteDialogProps) {
    const { show } = useConfirmDialogStore();

    const handleClick = () => {
        show({
            title: 'Are you sure?',
            description: `This will permanently delete the role "${roleName}". This action cannot be undone.`,
            variant: 'danger',
            confirmText: 'Delete',
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
            {variant === 'sm' ? 'Delete' : <span className="hidden xl:inline">Delete</span>}
        </Button>
    );
}

