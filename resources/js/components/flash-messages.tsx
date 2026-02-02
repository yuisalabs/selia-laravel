'use client';

import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toastManager } from '@/components/ui/toast';

interface FlashData {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export function FlashMessages() {
    const props = usePage().props;
    const flash = (props as unknown as { flash?: FlashData }).flash;
    const lastFlashRef = useRef<string | null>(null);

    useEffect(() => {
        const flashKey = JSON.stringify(flash);
        
        if (flashKey === lastFlashRef.current) {
            return;
        }
        lastFlashRef.current = flashKey;

        const types = ['success', 'error', 'warning', 'info'] as const;

        types.forEach((type) => {
            const message = flash?.[type];
            if (message) {
                const toastId = `${type}-${Date.now()}`;
                toastManager.add({
                    id: toastId,
                    type,
                    title: type.charAt(0).toUpperCase() + type.slice(1),
                    description: message,
                    timeout: 2500,
                    actionProps: {
                        children: 'Dismiss',
                        onClick: () => toastManager.close(toastId),
                    },
                });
            }
        });
    }, [flash]);

    return null;
}
