<?php

namespace App\Services;

use App\Data\PermissionData;
use App\Models\Permission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * @extends BaseService<Permission, PermissionData>
 */
class PermissionService extends BaseService
{
    /**
     * Get the model class name.
     *
     * @return class-string<Permission>
     */
    protected function model(): string
    {
        return Permission::class;
    }

    /**
     * Get the data class name.
     *
     * @return class-string<PermissionData>
     */
    protected function dataClass(): string
    {
        return PermissionData::class;
    }

    /**
     * Hook: Before storing - set default guard_name.
     */
    protected function beforeStore(array &$data): void
    {
        $data['guard_name'] = $data['guard_name'] ?? 'web';
    }

    /**
     * Get all permissions with pagination.
     */
    public function getAllPermissions(): LengthAwarePaginator
    {
        $query = Permission::query();

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
            ->allowedIncludes(['roles'])
            ->defaultSort('-created_at')
            ->with('roles')
            ->paginate(10)
            ->withQueryString();
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
