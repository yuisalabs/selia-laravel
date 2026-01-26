<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'guard_name',
    ];

    /**
     * Get the permissions that belong to the role.
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_permission')
            ->withTimestamps();
    }

    /**
     * Get the users that have this role.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'role_user')
            ->withTimestamps();
    }

    /**
     * Give permission to the role.
     *
     * @param  Permission|string|array<Permission|string>  $permissions
     */
    public function givePermissionTo(Permission|string|array $permissions): self
    {
        $permissions = $this->resolvePermissions($permissions);

        $this->permissions()->syncWithoutDetaching($permissions);

        return $this;
    }

    /**
     * Revoke permission from the role.
     *
     * @param  Permission|string|array<Permission|string>  $permissions
     */
    public function revokePermissionTo(Permission|string|array $permissions): self
    {
        $permissions = $this->resolvePermissions($permissions);

        $this->permissions()->detach($permissions);

        return $this;
    }

    /**
     * Sync permissions to the role (replaces all existing).
     *
     * @param  array<Permission|string>  $permissions
     */
    public function syncPermissions(array $permissions): self
    {
        $permissions = $this->resolvePermissions($permissions);

        $this->permissions()->sync($permissions);

        return $this;
    }

    /**
     * Check if the role has a specific permission.
     */
    public function hasPermission(Permission|string $permission): bool
    {
        $permissionName = $permission instanceof Permission ? $permission->name : $permission;

        return $this->permissions->contains('name', $permissionName);
    }

    /**
     * Resolve permissions to IDs.
     *
     * @param  Permission|string|array<Permission|string>  $permissions
     * @return array<int>
     */
    protected function resolvePermissions(Permission|string|int|array $permissions): array
    {
        $permissions = is_array($permissions) ? $permissions : [$permissions];

        return collect($permissions)->map(function ($permission) {
            if ($permission instanceof Permission) {
                return $permission->id;
            }

            if (is_int($permission) || is_numeric($permission)) {
                return (int) $permission;
            }

            return Permission::where('name', $permission)->firstOrFail()->id;
        })->all();
    }
}
