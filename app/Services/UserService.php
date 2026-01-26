<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Get all users with pagination.
     */
    public function getAllUsers(): LengthAwarePaginator
    {
        return User::with('roles')->latest()->paginate(10);
    }

    /**
     * Create a new user.
     */
    public function createUser(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    /**
     * Update an existing user.
     */
    public function updateUser(User $user, array $data): User
    {
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        if (isset($data['password']) && $data['password']) {
            $user->update([
                'password' => Hash::make($data['password']),
            ]);
        }

        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    /**
     * Delete a user.
     *
     * @throws \Exception
     */
    public function deleteUser(User $user): void
    {
        if ($user->id === auth()->id()) {
            throw new \Exception('Cannot delete your own account.');
        }

        $user->delete();
    }

    /**
     * Prepare user data for editing.
     */
    public function getUserForEdit(User $user): array
    {
        $user->load('roles');

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->roles,
        ];
    }

    /**
     * Prepare user data for display.
     */
    public function getUserForShow(User $user): array
    {
        $user->load(['roles.permissions']);

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
            'created_at' => $user->created_at,
            'roles' => $user->roles,
            'permissions' => $user->getAllPermissionNames(),
        ];
    }
}
