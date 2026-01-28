import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { LucideEye, LucideSquarePen } from 'lucide-react';
import { User } from './types';
import { UserDeleteDialog } from './UserDeleteDialog';

interface UserDesktopTableProps {
    users: User[];
    authUserId: number;
}

export function UserDesktopTable({ users, authUserId }: UserDesktopTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
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
