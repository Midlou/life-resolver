<?php

use Illuminate\Support\Facades\Route;
use Src\Home\Controllers\HomeController;
use Src\User\Controllers\UserController;
use Src\Auth\Controllers\LoginController;
use Src\Setting\Controllers\SettingController;
use Src\Category\Controllers\CategoryController;
use Src\Transaction\Controllers\TransactionController;
use Src\TransactionDashboard\Controllers\TransactionDashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['web', 'auth'])->group(function () {
	Route::get('/', [HomeController::class, 'index']);

	// Users
	Route::resource('users', UserController::class)->except(['create', 'edit']);
	Route::put('users/{item}/restore', [UserController::class, 'restore']);

	// Transactions
	Route::put('transactions/{item}/restore', [TransactionController::class, 'restore']);
	Route::get('transactions/dashboards', [TransactionDashboardController::class, 'index']);
	Route::resource('transactions', TransactionController::class)->except(['create', 'edit']);

	// Transactions dashboard
	Route::resource('transactions/dashboard', TransactionDashboardController::class)->except(['create', 'edit']);

	// Categories
	Route::resource('categories', CategoryController::class)->except(['create', 'edit']);
	Route::put('categories/{item}/restore', [CategoryController::class, 'restore']);

	// Settings
	Route::get('settings', [SettingController::class, 'index']);
	Route::post('settings', [SettingController::class, 'saveSettings']);

});

Route::middleware([])->group(function () {
	// Auth
	Route::post('login', [LoginController::class, 'login']);
	Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
	Route::post('logout', [LoginController::class, 'logout']);
});
