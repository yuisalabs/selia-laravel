import type { PermissionData, RoleData, UserData } from './generated';
import type { SimpleRole, SimplePermission, SimpleUser, RoleWithPermissions } from './index';

// Extended types with proper relationship typing
// Use these instead of generated types for better type safety

export interface PermissionDataWithRelations extends Omit<PermissionData, 'roles'> {
    roles: SimpleRole[];
}

export interface RoleDataWithRelations extends Omit<RoleData, 'permissions' | 'users'> {
    permissions: SimplePermission[];
    users: SimpleUser[];
}

export interface UserDataWithRelations extends Omit<UserData, 'roles'> {
    roles: RoleWithPermissions[];
}
