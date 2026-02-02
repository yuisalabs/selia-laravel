export interface Role {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    created_at: string;
    permissions: Array<{ id: number; name: string }>;
}

export interface RoleIndexPageProps {
    roles: {
        data: Role[];
        links: any[];
        first_page_url: string;
        last_page_url: string;
        current_page: number;
        last_page: number;
    };
}
