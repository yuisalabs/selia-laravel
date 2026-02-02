<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin role with all permissions
        $superAdmin = Role::firstOrCreate(
            ['name' => 'Super Admin'],
            [
                'description' => 'Full access to all system features',
                'guard_name' => 'web',
            ]
        );

        // Assign all permissions to Super Admin
        $allPermissions = Permission::all();
        $superAdmin->syncPermissions($allPermissions->pluck('id')->toArray());

        // Create Admin role with specific permissions
        $admin = Role::firstOrCreate(
            ['name' => 'Admin'],
            [
                'description' => 'Can manage users and view role/permissions',
                'guard_name' => 'web',
            ]
        );

        // Admin can manage users but not role/permissions
        $adminPermissions = Permission::whereIn('name', [
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            'view-roles',
            'view-permissions',
        ])->get();

        $admin->syncPermissions($adminPermissions->pluck('id')->toArray());

        // Create User role with limited permissions
        $user = Role::firstOrCreate(
            ['name' => 'User'],
            [
                'description' => 'Standard user access',
                'guard_name' => 'web',
            ]
        );

        // Users can only view their own profile (no specific permissions by default)
        // You can add permissions here as needed

        $this->command->info('Roles seeded successfully!');
        $this->command->table(
            ['Role', 'Permissions Count'],
            [
                ['Super Admin', $superAdmin->permissions()->count()],
                ['Admin', $admin->permissions()->count()],
                ['User', $user->permissions()->count()],
            ]
        );
    }
}
