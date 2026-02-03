<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Mcamara\LaravelLocalization\Traits\LoadsTranslatedCachedRoutes;

class AppServiceProvider extends ServiceProvider
{
    use LoadsTranslatedCachedRoutes;

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        RouteServiceProvider::loadCachedRoutesUsing(fn () => $this->loadCachedRoutes());

        // ACL Gate integration - allows using @can directive and Gate::allows()
        Gate::before(function ($user, $ability) {
            // Super Admin bypasses all permission checks
            if ($user->hasRole('Super Admin')) {
                return true;
            }

            // Check if user has the permission
            if ($user->hasPermission($ability)) {
                return true;
            }

            // Return null to let other gates handle it
            return null;
        });
    }
}
