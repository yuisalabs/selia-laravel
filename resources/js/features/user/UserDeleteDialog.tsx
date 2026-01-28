import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogPopup,
    AlertDialogBody,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogClose,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { LucideTrash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface UserDeleteDialogProps {
    userId: number;
    userName: string;
    disabled?: boolean;
    variant?: 'sm' | 'default';
}

export function UserDeleteDialog({ userId, userName, disabled = false, variant = 'default' }: UserDeleteDialogProps) {
    const handleDelete = () => {
        router.delete(route('users.destroy', userId));
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="danger"
                        size="sm"
                        className={variant === 'sm' ? 'h-8 px-2' : ''}
                        disabled={disabled}
                    />
                }
            >
                <LucideTrash2 className={variant === 'sm' ? 'w-4 h-4 mr-1' : 'size-4'} />
                {variant === 'sm' ? 'Delete' : <span className="hidden xl:inline">Delete</span>}
            </AlertDialogTrigger>
            <AlertDialogPopup>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <AlertDialogDescription>
                        This will permanently delete the user "{userName}". This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <AlertDialogClose>Cancel</AlertDialogClose>
                    <Button variant="danger" onClick={handleDelete}>
                        <LucideTrash2 />
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogPopup>
        </AlertDialog>
    );
}
