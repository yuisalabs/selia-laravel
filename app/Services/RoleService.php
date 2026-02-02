<?php

namespace App\Services;

use App\Data\RoleData;
use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

/**
 * @extends BaseService<Role, RoleData>
 */
class RoleService extends BaseService
{
    /**
     * Get the model class name.
     *
     * @return class-string<Role>
     */
    protected function model(): string
    {
        return Role::class;
    }

    /**
     * Get the data class name.
     *
     * @return class-string<RoleData>
     */
    protected function dataClass(): string
    {
        return RoleData::class;
    }

    /**
     * Hook: Before storing - set default guard_name.
     */
    protected function beforeStore(array &$data): void
    {
        $data['guard_name'] = $data['guard_name'] ?? 'web';
    }

    /**
     * Hook: After storing - sync permissions.
     *
     * @param  Role  $role
     */
    protected function afterStore(Model $role, array $data): void
    {
        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        $role->load('permissions');
    }

    /**
     * Hook: After updating - sync permissions.
     *
     * @param  Role  $role
     */
    protected function afterUpdate(Model $role, array $data): void
    {
        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        $role->load('permissions');
    }

    /**
     * Hook: Before deleting - prevent Super Admin deletion.
     *
     * @param  Role  $role
     *
     * @throws \Exception
     */
    protected function beforeDestroy(Model $role): void
    {
        /** @var Role $role */
        if ($role->name === 'Super Admin') {
            throw new \Exception('Cannot delete Super Admin role.');
        }
    }

    /**
     * Get all roles with pagination.
     */
    public function getAllRoles(): LengthAwarePaginator
    {
        return Role::with('permissions')->latest()->paginate(10);
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
