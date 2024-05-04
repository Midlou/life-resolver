<?php

namespace Src\User\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Src\User\UseCases\FindUseCase;
use App\Http\Controllers\Controller;
use Src\User\UseCases\CreateUseCase;
use Src\User\UseCases\UpdateUseCase;
use Src\User\UseCases\DestroyUseCase;
use Src\User\UseCases\ListingUseCase;
use Src\User\UseCases\RestoreUseCase;

class UserController extends Controller
{
	public function index(Request $request, ListingUseCase $useCase)
	{
		if ($request->wantsJson()) {
			if ($request->has('all')) {
				return response()->json($useCase->all());
			}

			return response()->json($useCase->paginate());
		}

		return Inertia::render('users/index', []);
	}

	public function store(Request $request, CreateUseCase $useCase)
	{
		$validated = $this->validator($request);
		$sanitized = $this->sanitize($validated);

		return response()->json($useCase->execute($sanitized));
	}

	public function update($id, Request $request, UpdateUseCase $useCase)
	{
		$validated = $this->validator($request, $id);
		$sanitized = $this->sanitize($validated);

		return response()->json($useCase->execute($id, $sanitized));
	}

	public function show($id, Request $request, FindUseCase $useCase)
	{
		return response()->json($useCase->execute($id));
	}

	public function destroy($id, Request $request, DestroyUseCase $useCase)
	{
		return response()->json(['deleted' => $useCase->execute($id)]);
	}

	public function restore($id, RestoreUseCase $useCase)
	{
		return response()->json(['restored' => $useCase->execute($id)]);
	}

	public function validator(Request $request, $id = null)
	{
		return $this->validate($request, [
			'name' => ['required'],
			'password' => [
				'confirmed',
				Rule::requiredIf(function () use ($request) {
					return !$request->id;
				}),
			],
			'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
		], [], [
			'password' => "senha",
			'name' => "nome",
		]);
	}

	public function sanitize($data)
	{
		if ($data['password'] ?? false) {
			$data['password'] = bcrypt($data['password']);
		}

		return $data;
	}
}
