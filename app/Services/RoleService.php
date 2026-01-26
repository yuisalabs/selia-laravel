<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
    public function createRole(array $data): Role
    {
        $role = Role::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'guard_name' => $data['guard_name'] ?? 'web',
        ]);

        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return $role;
    }

    /**
     * Update an existing role.
     */
    public function updateRole(Role $role, array $data): Role
    {
        $role->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'guard_name' => $data['guard_name'],
        ]);

        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return $role;
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

        $role->delete();
    }

    /**
     * Prepare role data for display.
     */
    public function getRoleForShow(Role $role): Role
    {
        return $role->load(['permissions', 'users']);
    }

    /**
     * Prepare role data for editing.
     */
    public function getRoleForEdit(Role $role): Role
    {
        return $role->load('permissions');
    }
}
