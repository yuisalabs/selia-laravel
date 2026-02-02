<?php

namespace App\Services;

use App\Data\PermissionData;
use App\Models\Permission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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
    public function createPermission(array $data): PermissionData
    {
        return DB::transaction(function () use ($data): PermissionData {
            $permission = Permission::create([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'guard_name' => $data['guard_name'] ?? 'web',
            ]);

            return PermissionData::fromModel($permission);
        });
    }

    /**
     * Update an existing permission.
     */
    public function updatePermission(Permission $permission, array $data): PermissionData
    {
        return DB::transaction(function () use ($permission, $data): PermissionData {
            $permission->update([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'guard_name' => $data['guard_name'] ?? 'web',
            ]);

            return PermissionData::fromModel($permission);
        });
    }

    /**
     * Delete a permission.
     */
    public function deletePermission(Permission $permission): void
    {
        DB::transaction(function () use ($permission): void {
            $permission->delete();
        });
    }

    /**
     * Prepare permission data for display.
     */
    public function getPermissionForShow(Permission $permission): PermissionData
    {
        $permission->load('roles');

        return PermissionData::fromModel($permission);
    }
}
