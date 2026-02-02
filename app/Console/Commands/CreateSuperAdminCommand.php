<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\password;
use function Laravel\Prompts\text;

class CreateSuperAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:superadmin 
                            {--email= : The email of the super admin user}
                            {--password= : The password for the user (only for new users)}
                            {--name= : The name of the user (only for new users)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or assign Super Admin role to a user';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->option('email') ?? text(
            label: 'What is the email of the super admin?',
            required: true,
            validate: fn (string $value) => filter_var($value, FILTER_VALIDATE_EMAIL) ? null : 'Please enter a valid email address.',
        );

        // Find or create the Super Admin role
        $superAdminRole = $this->getOrCreateSuperAdminRole();

        // Find or create the user
        $user = User::where('email', $email)->first();

        if (! $user) {
            $user = $this->createUser($email);
            $this->components->info("Created new user: {$user->email}");
        } else {
            $this->components->info("Found existing user: {$user->email}");
        }

        // Assign Super Admin role to user
        if ($user->hasRole('Super Admin')) {
            $this->components->warn('User already has Super Admin role.');

            return self::SUCCESS;
        }

        $user->assignRole($superAdminRole);

        $this->components->success("Super Admin role assigned to {$user->email} successfully!");

        return self::SUCCESS;
    }

    /**
     * Get or create the Super Admin role with all permissions.
     */
    protected function getOrCreateSuperAdminRole(): Role
    {
        $role = Role::firstOrCreate(
            ['name' => 'Super Admin'],
            ['guard_name' => 'web']
        );

        // Assign all permissions to Super Admin
        $allPermissions = Permission::all();

        if ($allPermissions->isNotEmpty()) {
            $role->syncPermissions($allPermissions->pluck('id')->toArray());
            $this->components->info("Assigned {$allPermissions->count()} permissions to Super Admin role.");
        }

        return $role;
    }

    /**
     * Create a new user with the given email.
     */
    protected function createUser(string $email): User
    {
        $name = $this->option('name') ?? text(
            label: 'What is the name of the user?',
            required: true,
        );

        $password = $this->option('password') ?? password(
            label: 'What is the password?',
            required: true,
            validate: fn (string $value) => strlen($value) >= 8 ? null : 'Password must be at least 8 characters.',
        );

        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);
    }
}
