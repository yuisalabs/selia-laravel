// Model types - matches Eloquent model serialization
export interface Role {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
    users?: User[];
}

export interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    created_at: string;
    updated_at: string;
    roles?: Role[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: RoleWithPermissions[];
    permissions?: string[];
}

export interface RoleWithPermissions extends Omit<Role, 'permissions'> {
    permissions: Permission[];
}

// Extended types with required relations (for pages that load relations)
export interface RoleWithRelations extends Omit<Role, 'permissions' | 'users'> {
    permissions: Permission[];
    users: User[];
}

export interface PermissionWithRelations extends Omit<Permission, 'roles'> {
    roles: Role[];
}

export interface UserWithRelations extends Omit<User, 'roles' | 'permissions'> {
    roles: RoleWithPermissions[];
    permissions: string[];
}

// Auth user type for HandleInertiaRequests
export interface AuthUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    roles: string[];
    permissions: string[];
}

export interface LocaleInfo {
    name: string;
    native: string;
}

export interface LocaleData {
    current: string;
    available: Record<string, LocaleInfo>;
    urls: Record<string, string>;
}

export interface FlashMessages {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: AuthUser;
    };
    locale: LocaleData;
    flash: FlashMessages;
};
