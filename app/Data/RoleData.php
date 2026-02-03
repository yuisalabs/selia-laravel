<?php

namespace App\Data;

use App\Models\Role;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RoleData extends Data
{
    public function __construct(
        public int|Optional $id,
        public string $name,
        public string|Optional|null $description,
        public string $guard_name,
        public array $permissions,
        public array $users,
    ) {}

    public static function fromModel(Role $role): self
    {
        return new self(
            id: $role->id,
            name: $role->name,
            description: $role->description,
            guard_name: $role->guard_name,
            permissions: $role->relationLoaded('permissions')
                 ? $role->permissions->map(fn ($perm) => [
                     'id' => $perm->id,
                     'name' => $perm->name,
                     'description' => $perm->description,
                     'guard_name' => $perm->guard_name,
                 ])->toArray()
                 : [],
            users: $role->relationLoaded('users')
                ? $role->users->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ])->toArray()
                : [],
        );
    }
}
