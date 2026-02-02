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
        /** @var PermissionData[]|int[] */
        public array $permissions,
    ) {}

    public static function fromModel(Role $role): self
    {
        return new self(
            id: $role->id,
            name: $role->name,
            description: $role->description,
            guard_name: $role->guard_name,
            permissions: $role->relationLoaded('permissions')
                ? PermissionData::collect($role->permissions)->toArray()
                : [],
        );
    }
}
