<?php

namespace App\Services;

use App\Models\Permission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PermissionService
{
    /**
     * Get all permissions with pagination.
     */
    public function getAllPermissions(): LengthAwarePaginator
    {
        return Permission::with('roles')->latest()->paginate(10);
    }

    /**
     * Create a new permission.
     */
    public function createPermission(array $data): Permission
    {
        return Permission::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'guard_name' => $data['guard_name'] ?? 'web',
        ]);
    }

    /**
     * Update an existing permission.
     */
    public function updatePermission(Permission $permission, array $data): Permission
    {
        $permission->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'guard_name' => $data['guard_name'],
        ]);

        return $permission;
    }

    /**
     * Delete a permission.
     */
    public function deletePermission(Permission $permission): void
    {
        $permission->delete();
    }

    /**
     * Prepare permission data for display.
     */
    public function getPermissionForShow(Permission $permission): Permission
    {
        return $permission->load('roles');
    }
}
