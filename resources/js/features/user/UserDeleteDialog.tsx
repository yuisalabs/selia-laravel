import { Button } from '@/components/ui/button';
import { LucideTrash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useConfirmDialogStore } from '@/stores/confirm-dialog-store';

interface UserDeleteDialogProps {
    userId: number;
    userName: string;
    disabled?: boolean;
    variant?: 'sm' | 'default';
}

export function UserDeleteDialog({ userId, userName, disabled = false, variant = 'default' }: UserDeleteDialogProps) {
    const { show } = useConfirmDialogStore();

    const handleClick = () => {
        show({
            title: 'Are you sure?',
            description: `This will permanently delete the user "${userName}". This action cannot be undone.`,
            variant: 'danger',
            confirmText: 'Delete',
            onConfirm: () => {
                router.delete(route('users.destroy', userId));
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

