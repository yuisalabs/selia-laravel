<?php

namespace App\Services;

use App\Data\UserData;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
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
    public function createUser(array $data): UserData
    {
        return DB::transaction(function () use ($data): UserData {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            if (isset($data['role'])) {
                $user->syncRoles([$data['role']]);
            }

            $user->load('roles');

            return UserData::fromModel($user);
        });
    }

    /**
     * Update an existing user.
     */
    public function updateUser(User $user, array $data): UserData
    {
        return DB::transaction(function () use ($user, $data): UserData {
            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
            ]);

            if (isset($data['password']) && $data['password']) {
                $user->update(['password' => Hash::make($data['password'])]);
            }

            if (isset($data['role'])) {
                $user->syncRoles([$data['role']]);
            }

            $user->load('roles');

            return UserData::fromModel($user);
        });
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

        DB::transaction(function () use ($user): void {
            $user->delete();
        });
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
