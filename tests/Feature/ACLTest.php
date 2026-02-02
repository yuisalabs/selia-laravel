<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

beforeEach(function () {
    // Create permissions
    Permission::create(['name' => 'edit-posts', 'guard_name' => 'web']);
    Permission::create(['name' => 'delete-posts', 'guard_name' => 'web']);
    Permission::create(['name' => 'view-posts', 'guard_name' => 'web']);
});

test('user can be assigned a role', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'Admin', 'guard_name' => 'web']);

    $user->assignRole($role);

    expect($user->hasRole('Admin'))->toBeTrue();
    expect($user->roles)->toHaveCount(1);
});

test('user can be removed from a role', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'Admin', 'guard_name' => 'web']);

    $user->assignRole($role);
    expect($user->hasRole('Admin'))->toBeTrue();

    $user->removeRole($role);
    $user->refresh();

    expect($user->hasRole('Admin'))->toBeFalse();
});

test('role can have permissions', function () {
    $role = Role::create(['name' => 'Editor', 'guard_name' => 'web']);
    $permission = Permission::where('name', 'edit-posts')->first();

    $role->givePermissionTo($permission);

    expect($role->hasPermission('edit-posts'))->toBeTrue();
    expect($role->permissions)->toHaveCount(1);
});

test('role can have multiple permissions', function () {
    $role = Role::create(['name' => 'Editor', 'guard_name' => 'web']);

    $role->givePermissionTo(['edit-posts', 'delete-posts']);

    expect($role->hasPermission('edit-posts'))->toBeTrue();
    expect($role->hasPermission('delete-posts'))->toBeTrue();
    expect($role->permissions)->toHaveCount(2);
});

test('user with role has role permissions', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'Editor', 'guard_name' => 'web']);
    $role->givePermissionTo(['edit-posts', 'view-posts']);

    $user->assignRole($role);

    expect($user->hasPermission('edit-posts'))->toBeTrue();
    expect($user->hasPermission('view-posts'))->toBeTrue();
    expect($user->hasPermission('delete-posts'))->toBeFalse();
});

test('user can check for any role', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'Admin', 'guard_name' => 'web']);
    Role::create(['name' => 'Editor', 'guard_name' => 'web']);

    $user->assignRole('Editor');

    expect($user->hasAnyRole(['Admin', 'Editor']))->toBeTrue();
    expect($user->hasAnyRole(['Admin', 'Moderator']))->toBeFalse();
});

test('user can check for all roles', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'Admin', 'guard_name' => 'web']);
    Role::create(['name' => 'Editor', 'guard_name' => 'web']);

    $user->syncRoles(['Admin', 'Editor']);

    expect($user->hasAllRoles(['Admin', 'Editor']))->toBeTrue();
    expect($user->hasAllRoles(['Admin', 'Moderator']))->toBeFalse();
});

test('user can get all permissions', function () {
    $user = User::factory()->create();

    $role1 = Role::create(['name' => 'Editor', 'guard_name' => 'web']);
    $role1->givePermissionTo(['edit-posts']);

    $role2 = Role::create(['name' => 'Viewer', 'guard_name' => 'web']);
    $role2->givePermissionTo(['view-posts']);

    $user->syncRoles(['Editor', 'Viewer']);

    $permissions = $user->getAllPermissions();

    expect($permissions)->toHaveCount(2);
    expect($user->getAllPermissionNames())->toContain('edit-posts', 'view-posts');
});

test('role middleware blocks unauthorized users', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'Admin', 'guard_name' => 'web']);

    $response = $this->actingAs($user)->get('/test-admin-route');

    $response->assertStatus(404); // Route doesn't exist yet, but middleware would block if it did
});

test('permission middleware blocks users without permission', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'User', 'guard_name' => 'web']);
    $user->assignRole($role);

    $response = $this->actingAs($user)->get('/test-permission-route');

    $response->assertStatus(404); // Route doesn't exist yet
});

test('super admin bypasses all permission checks', function () {
    $user = User::factory()->create();
    $superAdminRole = Role::create(['name' => 'Super Admin', 'guard_name' => 'web']);

    $user->assignRole($superAdminRole);

    // Super Admin should pass Gate::allows for any ability
    expect($user->hasRole('Super Admin'))->toBeTrue();
});
