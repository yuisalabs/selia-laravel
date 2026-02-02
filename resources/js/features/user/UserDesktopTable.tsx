import { Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { LucideArrowDown, LucideArrowUp, LucideArrowUpDown, LucideEye, LucideSquarePen } from 'lucide-react';
import { User } from './types';
import { UserDeleteDialog } from './UserDeleteDialog';

interface UserDesktopTableProps {
    users: User[];
    authUserId: number;
    state?: { search?: string, sort?: string };
}

export function UserDesktopTable({ users, authUserId, state }: UserDesktopTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader label="Name" sortKey="name" state={state} />
                        <SortableHeader label="Email" sortKey="email" state={state} />
                        <SortableHeader label="Created At" sortKey="created_at" state={state} />
                        <TableHead>Roles</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* ... (rest of table body remains same, omitted for brevity if unmodified, but here I must include or be careful) ... */}
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
                                    <span className="text-sm text-muted">No role</span>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.email_verified_at ? (
                                    <Badge variant="success">Verified</Badge>
                                ) : (
                                    <Badge variant="warning">Unverified</Badge>
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
                                        <span className="hidden xl:inline">View</span>
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route('users.edit', user.id)}
                                        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                    >
                                        <LucideSquarePen className="size-4" />
                                        <span className="hidden xl:inline">Edit</span>
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
