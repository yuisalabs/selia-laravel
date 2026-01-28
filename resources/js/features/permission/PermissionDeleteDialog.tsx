import { Button } from '@/components/ui/button';
import { LucideTrash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';

interface PermissionDeleteDialogProps {
    permissionId: number;
    permissionName: string;
    variant?: 'sm' | 'default';
}

export function PermissionDeleteDialog({ permissionId, permissionName, variant = 'default' }: PermissionDeleteDialogProps) {
    const { show } = useConfirmDialogStore();

    const handleClick = () => {
        show({
            title: 'Are you sure?',
            description: `This will permanently delete the permission "${permissionName}". This action cannot be undone.`,
            variant: 'danger',
            confirmText: 'Delete',
            onConfirm: () => {
                router.delete(route('permissions.destroy', permissionId));
            },
        });
    };

    return (
        <Button
            variant="danger"
            size="sm"
            className={variant === 'sm' ? 'h-8 px-2' : ''}
            onClick={handleClick}
        >
            <LucideTrash2 className={variant === 'sm' ? 'w-4 h-4 mr-1' : 'size-4'} />
            {variant === 'sm' ? 'Delete' : <span className="hidden xl:inline">Delete</span>}
        </Button>
    );
}

