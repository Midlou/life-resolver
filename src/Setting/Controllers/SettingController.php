<?php

namespace Src\Setting\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Src\Setting\UseCases\SaveUseCase;
use Src\Setting\UseCases\ListingUseCase;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SettingController extends Controller
{
	public function index(Request $request, ListingUseCase $useCase)
	{
		if ($request->wantsJson()) {
			if ($request->has('all')) {
				return response()->json($useCase->all());
			}

			return response()->json($useCase->paginate());
		}

		return Inertia::render('settings/index', []);
	}


	public function saveSettings(Request $request, SaveUseCase $useCase)
	{
		$validated = $this->validator($request);
		$sanitized = $this->sanitize($validated);

		return response()->json($useCase->execute($sanitized));
	}


	public function validator(Request $request, $id = null)
	{
		if (auth()->user()->type == 'customer') {
			throw new HttpException(403, "Você não tem permissão para realizar essa ação.");
		}

		return $this->validate($request, [
			'contact_phone' => ['nullable'],
		]);
	}

	public function sanitize($data)
	{
		if (!($data ?? false)) $data['status'] = 'unavailable';

		return $data;
	}
}
