<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * @extends BaseService<User>
 */
class UserService extends BaseService
{
    /**
     * Get the model class name.
     *
     * @return class-string<User>
     */
    protected function model(): string
    {
        return User::class;
    }

    /**
     * Hook: After storing - assign role.
     *
     * @param  User  $user
     */
    protected function afterStore(Model $user, array $data): void
    {
        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        $user->load('roles');
    }

    /**
     * Hook: Before updating - remove empty password.
     *
     * @param  User  $user
     */
    protected function beforeUpdate(Model $user, array &$data): void
    {
        // Remove password if not provided to avoid overwriting with empty
        if (empty($data['password'])) {
            unset($data['password']);
        }
    }

    /**
     * Hook: After updating - sync role.
     *
     * @param  User  $user
     */
    protected function afterUpdate(Model $user, array $data): void
    {
        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        $user->load('roles');
    }

    /**
     * Hook: Before deleting - prevent self-deletion.
     *
     * @param  User  $user
     *
     * @throws \Exception
     */
    protected function beforeDestroy(Model $user): void
    {
        if ($user->id === Auth::id()) {
            throw new \Exception('Cannot delete your own account.');
        }
    }

    /**
     * Get all users with pagination.
     */
    public function getAllUsers(): LengthAwarePaginator
    {
        $query = User::query();

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return QueryBuilder::for($query)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::partial('email'),
            ])
            ->allowedSorts(['name', 'email', 'created_at'])
            ->allowedIncludes(['roles'])
            ->defaultSort('-created_at')
            ->with('roles')
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * Prepare user for editing.
     */
    public function getUserForEdit(User $user): User
    {
        $user->load('roles');

        return $user;
    }

    /**
     * Prepare user for display.
     */
    public function getUserForShow(User $user): array
    {
        $user->load('roles.permissions');

        return [
            ...$user->toArray(),
            'permissions' => $user->getAllPermissionNames(),
        ];
    }
}
