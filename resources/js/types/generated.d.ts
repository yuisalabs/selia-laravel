export type AuthUserData = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    roles: Array<string>;
    permissions: Array<string>;
};
export type PermissionData = {
    id: any | number;
    name: string;
    description: any | string | null;
    guard_name: string;
    roles: Array<any>;
};
export type RoleData = {
    id: any | number;
    name: string;
    description: any | string | null;
    guard_name: string;
    permissions: Array<any>;
    users: Array<any>;
};
export type UserData = {
    id: any | number;
    name: string;
    email: string;
    password: any | string | null;
    role: any | string | null;
    email_verified_at: any | string | null;
    created_at: any | string;
    roles: Array<any>;
    permissions: Array<string>;
};
