<?php

namespace App\Traits;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

trait HasRoles
{
    /**
     * Get the roles that belong to the user.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user')
            ->withTimestamps();
    }

    /**
     * Assign a role to the user.
     *
     * @param  Role|string|array<Role|string>  $roles
     */
    public function assignRole(Role|string|array $roles): self
    {
        $roles = $this->resolveRoles($roles);

        $this->roles()->syncWithoutDetaching($roles);

        return $this;
    }

    /**
     * Remove a role from the user.
     *
     * @param  Role|string|array<Role|string>  $roles
     */
    public function removeRole(Role|string|array $roles): self
    {
        $roles = $this->resolveRoles($roles);

        $this->roles()->detach($roles);

        return $this;
    }

    /**
     * Sync roles for the user (replaces all existing).
     *
     * @param  array<Role|string>  $roles
     */
    public function syncRoles(array $roles): self
    {
        $roles = $this->resolveRoles($roles);

        $this->roles()->sync($roles);

        return $this;
    }

    /**
     * Check if the user has a specific role.
     */
    public function hasRole(Role|string $role): bool
    {
        $roleName = $role instanceof Role ? $role->name : $role;

        return $this->roles->contains('name', $roleName);
    }

    /**
     * Check if the user has any of the given roles.
     *
     * @param  array<Role|string>  $roles
     */
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if the user has all of the given roles.
     *
     * @param  array<Role|string>  $roles
     */
    public function hasAllRoles(array $roles): bool
    {
        foreach ($roles as $role) {
            if (! $this->hasRole($role)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if the user has a specific permission (through their roles).
     */
    public function hasPermission(Permission|string $permission): bool
    {
        $permissionName = $permission instanceof Permission ? $permission->name : $permission;

        return $this->getAllPermissions()->contains('name', $permissionName);
    }

    /**
     * Alias for hasPermission.
     */
    public function hasPermissionTo(Permission|string $permission): bool
    {
        return $this->hasPermission($permission);
    }

    /**
     * Check if the user has any of the given permissions.
     *
     * @param  array<Permission|string>  $permissions
     */
    public function hasAnyPermission(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if ($this->hasPermission($permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if the user has all of the given permissions.
     *
     * @param  array<Permission|string>  $permissions
     */
    public function hasAllPermissions(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if (! $this->hasPermission($permission)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get all permissions for the user (from all roles).
     */
    public function getAllPermissions(): Collection
    {
        return $this->roles
            ->flatMap(fn (Role $role) => $role->permissions)
            ->unique('id');
    }

    /**
     * Get all permission names for the user.
     *
     * @return array<string>
     */
    public function getAllPermissionNames(): array
    {
        return $this->getAllPermissions()->pluck('name')->all();
    }

    /**
     * Resolve roles to IDs.
     *
     * @param  Role|string|array<Role|string>  $roles
     * @return array<int>
     */
    protected function resolveRoles(Role|string|int|array $roles): array
    {
        $roles = is_array($roles) ? $roles : [$roles];

        return collect($roles)->map(function ($role) {
            if ($role instanceof Role) {
                return $role->id;
            }

            if (is_int($role) || is_numeric($role)) {
                return (int) $role;
            }

            return Role::where('name', $role)->firstOrFail()->id;
        })->all();
    }
}
