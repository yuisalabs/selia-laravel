<?php

namespace App\Services;

use App\Data\RoleData;
use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class RoleService
{
    /**
     * Get all roles with pagination.
     */
    public function getAllRoles(): LengthAwarePaginator
    {
        return Role::with('permissions')->latest()->paginate(10);
    }

    /**
     * Create a new role.
     */
    public function createRole(array $data): RoleData
    {
        return DB::transaction(function () use ($data): RoleData {
            $role = Role::create([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'guard_name' => $data['guard_name'] ?? 'web',
            ]);

            if (isset($data['permissions'])) {
                $role->syncPermissions($data['permissions']);
            }

            $role->load('permissions');

            return RoleData::fromModel($role);
        });
    }

    /**
     * Update an existing role.
     */
    public function updateRole(Role $role, array $data): RoleData
    {
        return DB::transaction(function () use ($role, $data): RoleData {
            $role->update([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'guard_name' => $data['guard_name'] ?? 'web',
            ]);

            if (isset($data['permissions'])) {
                $role->syncPermissions($data['permissions']);
            }

            $role->load('permissions');

            return RoleData::fromModel($role);
        });
    }

    /**
     * Delete a role.
     *
     * @throws \Exception
     */
    public function deleteRole(Role $role): void
    {
        if ($role->name === 'Super Admin') {
            throw new \Exception('Cannot delete Super Admin role.');
        }

        DB::transaction(function () use ($role): void {
            $role->delete();
        });
    }

    /**
     * Prepare role data for display.
     */
    public function getRoleForShow(Role $role): RoleData
    {
        $role->load(['permissions', 'users']);

        return RoleData::fromModel($role);
    }

    /**
     * Prepare role data for editing.
     */
    public function getRoleForEdit(Role $role): RoleData
    {
        $role->load('permissions');

        return RoleData::fromModel($role);
    }
}
