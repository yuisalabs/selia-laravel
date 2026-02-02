import { usePage } from '@inertiajs/react';
import type { AuthUserData } from '@/types/generated';

export function usePermission() {
    const { auth } = usePage<{ auth: { user: AuthUserData } }>().props;

    const can = (permission: string): boolean => {
        return auth.user?.permissions?.includes(permission) ?? false;
    };

    const hasRole = (role: string): boolean => {
        return auth.user?.roles?.includes(role) ?? false;
    };

    const hasAnyRole = (roles: string[]): boolean => {
        return roles.some((role) => hasRole(role));
    };

    const canAny = (permissions: string[]): boolean => {
        return permissions.some((permission) => can(permission));
    };

    return { can, canAny, hasRole, hasAnyRole };
}
