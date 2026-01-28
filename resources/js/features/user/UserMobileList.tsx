import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { LucideEye, LucideSquarePen } from 'lucide-react';
import { User } from './types';
import { UserDeleteDialog } from './UserDeleteDialog';

interface UserMobileListProps {
    users: User[];
    authUserId: number;
}

export function UserMobileList({ users, authUserId }: UserMobileListProps) {
    return (
        <div>
            {users.map((user) => (
                <div key={user.id} className="border-b last:border-0 border-accent p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="font-medium truncate mr-2">{user.name}</div>
                            <div className="text-sm text-muted-foreground break-all">{user.email}</div>
                        </div>
                        {user.email_verified_at ? (
                            <Badge variant="success" className="shrink-0">
                                Verified
                            </Badge>
                        ) : (
                            <Badge variant="warning" className="shrink-0">
                                Unverified
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Role:</span>
                        {user.roles.length > 0 ? (
                            <Badge variant="secondary" className="text-xs">
                                {user.roles[0].name}
                            </Badge>
                        ) : (
                            <span className="text-muted">No role</span>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <Link
                            as="button"
                            href={route('users.show', user.id)}
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-8 px-2')}
                        >
                            <LucideEye className="w-4 h-4 mr-1" />
                            View
                        </Link>
                        <Link
                            as="button"
                            href={route('users.edit', user.id)}
                            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'h-8 px-2')}
                        >
                            <LucideSquarePen className="w-4 h-4 mr-1" />
                            Edit
                        </Link>
                        <UserDeleteDialog
                            userId={user.id}
                            userName={user.name}
                            disabled={user.id === authUserId}
                            variant="sm"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
