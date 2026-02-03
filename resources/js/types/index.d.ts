import type { AuthUserData } from './generated';

export type User = AuthUserData;

// Manual type definitions for relationship objects
// These are plain objects returned from Data classes, not full Data objects
export interface SimpleRole {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
}

export interface SimplePermission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
}

export interface SimpleUser {
    id: number;
    name: string;
    email: string;
}

export interface RoleWithPermissions extends SimpleRole {
    permissions: SimplePermission[];
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
        user: AuthUserData;
    };
    locale: LocaleData;
    flash: FlashMessages;
};
