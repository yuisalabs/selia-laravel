import { Button, buttonVariants } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogPopup,
    AlertDialogBody,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogClose,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { IconBox, iconBoxVariants } from '@/components/ui/icon-box';
import { useConfirmDialogStore, ConfirmDialogVariant } from '@/stores/confirm-dialog-store';
import { LucideAlertTriangle, LucideInfo, LucideAlertCircle, LucideTrash2 } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';

type IconBoxVariant = NonNullable<VariantProps<typeof iconBoxVariants>['variant']>;
type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

const variantConfig: Record<
    ConfirmDialogVariant,
    {
        icon: typeof LucideAlertTriangle;
        iconBoxVariant: IconBoxVariant;
        buttonVariant: ButtonVariant;
    }
> = {
    danger: {
        icon: LucideTrash2,
        iconBoxVariant: 'danger',
        buttonVariant: 'danger',
    },
    warning: {
        icon: LucideAlertTriangle,
        iconBoxVariant: 'warning',
        buttonVariant: 'primary',
    },
    info: {
        icon: LucideInfo,
        iconBoxVariant: 'info',
        buttonVariant: 'primary',
    },
    default: {
        icon: LucideAlertCircle,
        iconBoxVariant: 'primary',
        buttonVariant: 'primary',
    },
};

export function ConfirmDialog() {
    const { isOpen, options, isLoading, hide, setLoading } = useConfirmDialogStore();

    if (!options) return null;

    const { title, description, content, confirmText, cancelText, variant = 'default', confirmDisabled, onConfirm, onCancel } = options;
    const config = variantConfig[variant];
    const Icon = config.icon;

    const handleConfirm = async () => {
        if (onConfirm) {
            try {
                setLoading(true);
                await onConfirm();
            } finally {
                setLoading(false);
                hide();
            }
        } else {
            hide();
        }
    };

    const handleCancel = () => {
        onCancel?.();
        hide();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
            <AlertDialogPopup>
                <AlertDialogHeader>
                    <IconBox variant={config.iconBoxVariant}>
                        <Icon className="size-5" />
                    </IconBox>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                    {content && <div className="mt-4">{content}</div>}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <AlertDialogClose disabled={isLoading}>{cancelText}</AlertDialogClose>
                    <Button variant={config.buttonVariant} onClick={handleConfirm} disabled={isLoading || confirmDisabled}>
                        {isLoading ? 'Processing...' : confirmText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogPopup>
        </AlertDialog>
    );
}

