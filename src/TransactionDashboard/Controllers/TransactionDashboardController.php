<?php

namespace Src\TransactionDashboard\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Src\TransactionDashboard\UseCases\ListingUseCase;

class TransactionDashboardController extends Controller
{
	public function index(Request $request, ListingUseCase $useCase)
	{
		if ($request->wantsJson()) {
			return response()->json($useCase->execute());
		}

		return Inertia::render('transactions_dashboard/index', []);
	}
}
