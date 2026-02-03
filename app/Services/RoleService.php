<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * @extends BaseService<Role>
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
        $query = Role::query();

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return QueryBuilder::for($query)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::partial('description'),
            ])
            ->allowedSorts(['name', 'created_at'])
            ->allowedIncludes(['permissions'])
            ->defaultSort('-created_at')
            ->with('permissions')
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * Prepare role for display.
     */
    public function getRoleForShow(Role $role): Role
    {
        $role->load(['permissions', 'users']);

        return $role;
    }

    /**
     * Prepare role for editing.
     */
    public function getRoleForEdit(Role $role): Role
    {
        $role->load('permissions');

        return $role;
    }
}
