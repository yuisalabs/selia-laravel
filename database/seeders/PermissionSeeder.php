<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User management
            ['name' => 'view-users', 'description' => 'View list of users and their details'],
            ['name' => 'create-users', 'description' => 'Create new user accounts'],
            ['name' => 'edit-users', 'description' => 'Edit existing user information'],
            ['name' => 'delete-users', 'description' => 'Delete user accounts'],

            // Role management
            ['name' => 'view-roles', 'description' => 'View available roles and their permissions'],
            ['name' => 'create-roles', 'description' => 'Create new roles'],
            ['name' => 'edit-roles', 'description' => 'Edit role names and permissions'],
            ['name' => 'delete-roles', 'description' => 'Delete roles'],

            // Permission management
            ['name' => 'view-permissions', 'description' => 'View all available permissions'],
            ['name' => 'create-permissions', 'description' => 'Create new permissions'],
            ['name' => 'edit-permissions', 'description' => 'Edit existing permissions'],
            ['name' => 'delete-permissions', 'description' => 'Delete permissions'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission['name']],
                [
                    'description' => $permission['description'],
                    'guard_name' => 'web',
                ]
            );
        }

        $this->command->info('Permissions seeded successfully!');
    }
}
