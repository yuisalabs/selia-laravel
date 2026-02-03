<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/*
|--------------------------------------------------------------------------
| Localized Routes
|--------------------------------------------------------------------------
|
| Routes wrapped with LaravelLocalization::setLocale() prefix to support
| multiple languages. The locale will be determined from the URL prefix.
|
*/
Route::group([
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath'],
], function () {

    Route::get('/', function () {
        return Inertia::render('home/HomePage');
    })->name('welcome');

    Route::middleware(['auth', 'role:Super Admin,Admin'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::middleware(['auth', 'role:Super Admin,Admin'])->group(function () {
        Route::resource('roles', App\Http\Controllers\RoleController::class);
        Route::resource('permissions', App\Http\Controllers\PermissionController::class);
        Route::resource('users', App\Http\Controllers\UserController::class);
    });

    require __DIR__.'/auth.php';
});
