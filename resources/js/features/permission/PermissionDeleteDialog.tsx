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

interface PermissionDeleteDialogProps {
    permissionId: number;
    permissionName: string;
    variant?: 'sm' | 'default';
}

export function PermissionDeleteDialog({ permissionId, permissionName, variant = 'default' }: PermissionDeleteDialogProps) {
    const handleDelete = () => {
        router.delete(route('permissions.destroy', permissionId));
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                nativeButton
                render={
                    <Button
                        variant="danger"
                        size="sm"
                        className={variant === 'sm' ? 'h-8 px-2' : ''}
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
                        This will permanently delete the permission "{permissionName}". This action cannot be undone.
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
