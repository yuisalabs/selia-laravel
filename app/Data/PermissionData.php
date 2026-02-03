<?php

namespace App\Data;

use App\Models\Permission;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PermissionData extends Data
{
    public function __construct(
        public int|Optional $id,
        public string $name,
        public string|Optional|null $description,
        public string $guard_name,
        public array $roles,
    ) {}

    public static function fromModel(Permission $permission): self
    {
        return new self(
            id: $permission->id,
            name: $permission->name,
            description: $permission->description,
            guard_name: $permission->guard_name,
            roles: $permission->relationLoaded('roles')
                ? $permission->roles->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                    'description' => $role->description,
                    'guard_name' => $role->guard_name,
                ])->toArray()
                : [],
        );
    }
}
