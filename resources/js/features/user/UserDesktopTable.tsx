import { Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { LucideArrowDown, LucideArrowUp, LucideArrowUpDown, LucideEye, LucideSquarePen } from 'lucide-react';
import { User } from './types';
import { UserDeleteDialog } from './UserDeleteDialog';
import { useTranslation } from 'react-i18next';

interface UserDesktopTableProps {
    users: User[];
    authUserId: number;
    state?: { search?: string, sort?: string };
}

export function UserDesktopTable({ users, authUserId, state }: UserDesktopTableProps) {
    const { t } = useTranslation();

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader label={t('users.name')} sortKey="name" state={state} />
                        <SortableHeader label={t('users.email')} sortKey="email" state={state} />
                        <SortableHeader label={t('users.created_at')} sortKey="created_at" state={state} />
                        <TableHead>{t('users.roles')}</TableHead>
                        <TableHead>{t('users.status')}</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                                {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {user.roles.length > 0 ? (
                                    <Badge variant="secondary" className="text-xs">
                                        {user.roles[0].name}
                                    </Badge>
                                ) : (
                                    <span className="text-sm text-muted">{t('users.no_role')}</span>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.email_verified_at ? (
                                    <Badge variant="success">{t('users.verified')}</Badge>
                                ) : (
                                    <Badge variant="warning">{t('users.unverified')}</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        as="button"
                                        href={route('users.show', user.id)}
                                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                    >
                                        <LucideEye className="size-4" />
                                        <span className="hidden xl:inline">{t('common.view')}</span>
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route('users.edit', user.id)}
                                        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                    >
                                        <LucideSquarePen className="size-4" />
                                        <span className="hidden xl:inline">{t('common.edit')}</span>
                                    </Link>
                                    <UserDeleteDialog
                                        userId={user.id}
                                        userName={user.name}
                                        disabled={user.id === authUserId}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function SortableHeader({ label, sortKey, state }: { label: string, sortKey: string, state?: { search?: string, sort?: string } }) {
    const { sort, search } = state ?? {};
    
    const isSorted = sort === sortKey || sort === `-${sortKey}`;
    const direction = sort === `-${sortKey}` ? 'desc' : 'asc';

    const handleSort = () => {
        const newSort = sort === sortKey ? `-${sortKey}` : sortKey;
        
        router.get(
            route('users.index'),
            { 
                sort: newSort,
                search: search 
            },
            { preserveState: true }
        );
    };

    return (
        <TableHead 
            className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
            onClick={handleSort}
        >
            <div className="flex items-center gap-2 group">
                {label}
                <span className={cn("text-muted-foreground", isSorted ? "text-primary" : "opacity-0 group-hover:opacity-50")}>
                    {isSorted ? (
                        direction === 'asc' ? <LucideArrowUp className="size-3" /> : <LucideArrowDown className="size-3" />
                    ) : (
                        <LucideArrowUpDown className="size-3" />
                    )}
                </span>
            </div>
        </TableHead>
    );
}
