import { Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { LucideArrowDown, LucideArrowUp, LucideArrowUpDown, LucideEye, LucideSquarePen } from 'lucide-react';
import { Role } from './types';
import { RoleDeleteDialog } from './RoleDeleteDialog';
import { useTranslation } from 'react-i18next';

interface RoleDesktopTableProps {
    roles: Role[];
    state?: { search?: string, sort?: string };
}

export function RoleDesktopTable({ roles, state }: RoleDesktopTableProps) {
    const { t } = useTranslation();

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader label={t('roles.name')} sortKey="name" state={state} />
                        <TableHead>{t('roles.description')}</TableHead>
                        <TableHead>{t('roles.guard_name')}</TableHead>
                        <TableHead>{t('permissions.title')}</TableHead>
                        <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell className="font-medium">{role.name}</TableCell>
                            <TableCell className="text-muted-foreground">{role.description || '-'}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{role.guard_name}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {role.permissions.map((permission) => (
                                        <Badge key={permission.id} variant="secondary" className="text-xs">
                                            {permission.name}
                                        </Badge>
                                    ))}
                                    {role.permissions.length === 0 && (
                                        <span className="text-sm text-muted">{t('roles.no_permissions')}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        as="button"
                                        href={route('roles.show', role.id)}
                                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                    >
                                        <LucideEye className="size-4" />
                                        <span className="hidden xl:inline">{t('common.view')}</span>
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route('roles.edit', role.id)}
                                        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                    >
                                        <LucideSquarePen className="size-4" />
                                        <span className="hidden xl:inline">{t('common.edit')}</span>
                                    </Link>
                                    <RoleDeleteDialog
                                        roleId={role.id}
                                        roleName={role.name}
                                        disabled={role.name === 'Super Admin'}
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
            route('roles.index'),
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
