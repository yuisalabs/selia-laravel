<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? $this->getAuthUserData($request->user())
                    : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'locale' => [
                'current' => app()->getLocale(),
                'available' => $this->getAvailableLocales(),
                'urls' => $this->getLocaleUrls(),
            ],
        ];
    }

    /**
     * Get authenticated user data.
     *
     * @return array<string, mixed>
     */
    private function getAuthUserData($user): array
    {
        $user->loadMissing('roles.permissions');

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at?->toISOString(),
            'roles' => $user->roles->pluck('name')->toArray(),
            'permissions' => $user->getAllPermissionNames(),
        ];
    }

    /**
     * Get available locales with their information.
     *
     * @return array<string, array<string, string>>
     */
    private function getAvailableLocales(): array
    {
        $locales = [];
        foreach (config('laravellocalization.supportedLocales', []) as $code => $info) {
            $locales[$code] = [
                'name' => $info['name'],
                'native' => $info['native'],
            ];
        }

        return $locales;
    }

    /**
     * Get URLs for switching locales.
     *
     * @return array<string, string>
     */
    private function getLocaleUrls(): array
    {
        $urls = [];
        foreach (array_keys(config('laravellocalization.supportedLocales', [])) as $locale) {
            $urls[$locale] = LaravelLocalization::getLocalizedURL($locale, null, [], true);
        }

        return $urls;
    }
}
