import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export function useAcl() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const hasRole = (role: string | string[]): boolean => {
        if (!user || !user.roles) return false;

        const roles = Array.isArray(role) ? role : [role];
        return roles.some((r) => user.roles.includes(r));
    };

    const hasAnyRole = (roles: string[]): boolean => {
        return hasRole(roles);
    };

    const hasAllRoles = (roles: string[]): boolean => {
        if (!user || !user.roles) return false;

        return roles.every((role) => user.roles.includes(role));
    };

    const hasPermission = (permission: string | string[]): boolean => {
        if (!user || !user.permissions) return false;

        const permissions = Array.isArray(permission) ? permission : [permission];
        return permissions.some((p) => user.permissions.includes(p));
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        return hasPermission(permissions);
    };

    const hasAllPermissions = (permissions: string[]): boolean => {
        if (!user || !user.permissions) return false;

        return permissions.every((permission) => user.permissions.includes(permission));
    };

    return {
        hasRole,
        hasAnyRole,
        hasAllRoles,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        roles: user?.roles || [],
        permissions: user?.permissions || [],
    };
}
