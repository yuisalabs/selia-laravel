export interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    created_at: string;
    roles: Array<{ id: number; name: string }>;
}

export interface PermissionIndexPageProps {
    permissions: {
        data: Permission[];
        links: any[];
        first_page_url: string;
        last_page_url: string;
        current_page: number;
        last_page: number;
    };
}
