<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
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
     * Get the roles that have this permission.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_permission')
            ->withTimestamps();
    }

    /**
     * Assign this permission to a role.
     */
    public function assignToRole(Role|string $role): self
    {
        $role = $role instanceof Role
            ? $role
            : Role::where('name', $role)->firstOrFail();

        $this->roles()->syncWithoutDetaching([$role->id]);

        return $this;
    }

    /**
     * Remove this permission from a role.
     */
    public function removeFromRole(Role|string $role): self
    {
        $role = $role instanceof Role
            ? $role
            : Role::where('name', $role)->firstOrFail();

        $this->roles()->detach($role->id);

        return $this;
    }
}
