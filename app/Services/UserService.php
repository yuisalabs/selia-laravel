<?php

namespace App\Services;

use App\Data\UserData;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * @extends BaseService<User, UserData>
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
     * Get the data class name.
     *
     * @return class-string<UserData>
     */
    protected function dataClass(): string
    {
        return UserData::class;
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
        return User::with('roles')->latest()->paginate(10);
    }

    /**
     * Prepare user data for editing.
     */
    public function getUserForEdit(User $user): UserData
    {
        $user->load('roles');

        return UserData::fromModel($user);
    }

    /**
     * Prepare user data for display.
     */
    public function getUserForShow(User $user): UserData
    {
        $user->load('roles.permissions');

        return UserData::fromModel($user);
    }
}
