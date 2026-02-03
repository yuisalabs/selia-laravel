<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int|Optional $id,
        public string $name,
        public string $email,
        public string|Optional|null $password,
        public string|Optional|null $role,
        public string|Optional|null $email_verified_at,
        public string|Optional $created_at,
        public array $roles,
        /** @var string[] */
        public array $permissions,
    ) {}

    public static function fromModel(User $user): self
    {
        // Load permissions if roles are loaded
        if ($user->relationLoaded('roles')) {
            $user->loadMissing('roles.permissions');
        }

        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            password: Optional::create(),
            role: Optional::create(),
            email_verified_at: $user->email_verified_at?->toISOString(),
            created_at: $user->created_at->toISOString(),
            roles: $user->relationLoaded('roles')
                ? $user->roles->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                    'description' => $role->description,
                    'guard_name' => $role->guard_name,
                    'permissions' => $role->permissions->map(fn ($perm) => [
                        'id' => $perm->id,
                        'name' => $perm->name,
                    ])->toArray(),
                ])->toArray()
                : [],
            permissions: $user->relationLoaded('roles')
                ? $user->getAllPermissionNames()
                : [],
        );
    }
}
