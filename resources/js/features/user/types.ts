export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
}

export interface UserIndexPageProps {
    users: {
        data: User[];
        links: any[];
        first_page_url: string;
        last_page_url: string;
        current_page: number;
        last_page: number;
    };
}
