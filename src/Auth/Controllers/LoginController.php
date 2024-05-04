<?php

namespace Src\Auth\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
	/*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

	use AuthenticatesUsers;

	/**
	 * Where to redirect users after login.
	 *
	 * @var string
	 */
	protected $redirectTo = RouteServiceProvider::HOME;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest')->except('logout');
	}

	public function username()
	{
		if (filter_var(request('login'), FILTER_VALIDATE_EMAIL)) {
			request()->request->add(['email' => request('login')]);
			return 'email';
		}

		request()->request->add(['document' => request('login')]);
		return 'document';
	}

	protected function validateLogin(Request $request)
	{
		$request->validate([
			'login' => 'required|string',
			'password' => 'required|string',
		]);
	}

	public function showLoginForm()
	{
		return Inertia::render('auth/index', []);
	}

	public function index(Request $request)
	{
		return Inertia::render('home/index', []);
	}

}
