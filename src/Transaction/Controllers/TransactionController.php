<?php

namespace Src\Transaction\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Src\Transaction\UseCases\FindUseCase;
use Src\Transaction\UseCases\CreateUseCase;
use Src\Transaction\UseCases\UpdateUseCase;
use Src\Transaction\UseCases\DestroyUseCase;
use Src\Transaction\UseCases\ListingUseCase;
use Src\Transaction\UseCases\RestoreUseCase;

class TransactionController extends Controller
{
	public function index(Request $request, ListingUseCase $useCase)
	{
		if ($request->wantsJson()) {
			if ($request->has('all')) {
				return response()->json($useCase->all());
			}

			return response()->json($useCase->paginate());
		}

		return Inertia::render('transactions/index', []);
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
			'amount' => ['nullable'],
			'description' => ['nullable'],
			'category_id' => ['nullable'],
			'transacted_at' => ['required'],
		], [], [
			'amount' => 'valor',
			'transacted_at' => 'data'
		]);
	}

	public function sanitize($data)
	{
		$data['transacted_at'] = Carbon::parse($data['transacted_at'])->startOfDay();

		return $data;
	}
}
