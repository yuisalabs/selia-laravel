import { Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { LucideArrowDown, LucideArrowUp, LucideArrowUpDown, LucideEye, LucideSquarePen } from 'lucide-react';
import { Permission } from './types';
import { PermissionDeleteDialog } from './PermissionDeleteDialog';
import { useTranslation } from 'react-i18next';

interface PermissionDesktopTableProps {
    permissions: Permission[];
    state?: { search?: string, sort?: string };
}

export function PermissionDesktopTable({ permissions, state }: PermissionDesktopTableProps) {
    const { t } = useTranslation();

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader label={t('permissions.name')} sortKey="name" state={state} />
                        <TableHead>{t('permissions.description')}</TableHead>
                        <TableHead>{t('roles.guard_name')}</TableHead>
                        <TableHead>{t('permissions.roles')}</TableHead>
                        <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permissions.map((permission) => (
                        <TableRow key={permission.id}>
                            <TableCell className="font-medium">{permission.name}</TableCell>
                            <TableCell className="text-muted-foreground">{permission.description || '-'}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{permission.guard_name}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {permission.roles.map((role) => (
                                        <Badge key={role.id} variant="secondary" className="text-xs">
                                            {role.name}
                                        </Badge>
                                    ))}
                                    {permission.roles.length === 0 && (
                                        <span className="text-sm text-muted">{t('permissions.no_roles')}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        as="button"
                                        href={route('permissions.show', permission.id)}
                                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                    >
                                        <LucideEye className="size-4" />
                                        <span className="hidden xl:inline">{t('common.view')}</span>
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route('permissions.edit', permission.id)}
                                        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                    >
                                        <LucideSquarePen className="size-4" />
                                        <span className="hidden xl:inline">{t('common.edit')}</span>
                                    </Link>
                                    <PermissionDeleteDialog
                                        permissionId={permission.id}
                                        permissionName={permission.name}
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
            route('permissions.index'),
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
