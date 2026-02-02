import { usePermission } from '@/hooks/usePermission';
import type { ReactNode } from 'react';

interface CanProps {
    permission?: string;
    permissions?: string[];
    role?: string;
    roles?: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export function Can({ permission, permissions, role, roles, children, fallback = null }: CanProps) {
    const { can, canAny, hasRole, hasAnyRole } = usePermission();

    const hasPermission = permission
        ? can(permission)
        : permissions
            ? canAny(permissions)
            : true;

    const hasRequiredRole = role
        ? hasRole(role)
        : roles
            ? hasAnyRole(roles)
            : true;

    if (hasPermission && hasRequiredRole) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}
