<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class AuthUserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public ?string $email_verified_at,
        /** @var string[] */
        public array $roles,
        /** @var string[] */
        public array $permissions,
    ) {}

    public static function fromModel(User $user): self
    {
        $user->loadMissing('roles.permissions');

        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            email_verified_at: $user->email_verified_at?->toISOString(),
            roles: $user->roles->pluck('name')->toArray(),
            permissions: $user->getAllPermissionNames(),
        );
    }
}
