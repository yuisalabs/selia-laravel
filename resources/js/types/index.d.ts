import type { AuthUserData } from './generated';

export type User = AuthUserData;

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: AuthUserData;
    };
};
