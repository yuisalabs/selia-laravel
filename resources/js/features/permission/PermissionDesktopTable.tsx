import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { LucideEye, LucideSquarePen } from 'lucide-react';
import { Permission } from './types';
import { PermissionDeleteDialog } from './PermissionDeleteDialog';

interface PermissionDesktopTableProps {
    permissions: Permission[];
}

export function PermissionDesktopTable({ permissions }: PermissionDesktopTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Guard</TableHead>
                        <TableHead>Roles</TableHead>
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
                                        <span className="text-sm text-muted">No roles</span>
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
                                        <span className="hidden xl:inline">View</span>
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route('permissions.edit', permission.id)}
                                        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                    >
                                        <LucideSquarePen className="size-4" />
                                        <span className="hidden xl:inline">Edit</span>
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
