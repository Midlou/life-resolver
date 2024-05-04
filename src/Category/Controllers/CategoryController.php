<?php

namespace Src\Category\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Src\Category\UseCases\FindUseCase;
use Src\Category\UseCases\CreateUseCase;
use Src\Category\UseCases\UpdateUseCase;
use Src\Category\UseCases\DestroyUseCase;
use Src\Category\UseCases\ListingUseCase;
use Src\Category\UseCases\RestoreUseCase;

class CategoryController extends Controller
{
	public function index(Request $request, ListingUseCase $useCase)
	{
		if ($request->wantsJson()) {
			if ($request->has('all')) {
				return response()->json($useCase->all());
			}

			return response()->json($useCase->paginate());
		}

		return Inertia::render('categories/index', []);
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
			'description' => ['nullable'],
		]);
	}

	public function sanitize($data)
	{
		return $data;
	}
}
