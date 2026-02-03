import type { AuthUserData } from './generated';

export type User = AuthUserData;

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
