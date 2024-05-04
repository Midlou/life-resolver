<?php

namespace Src\Auth\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Src\User\UseCases\CreateUseCase;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RegisterController extends Controller
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function register(Request $request)
	{
		$validated = $this->validator($request);
		$sanitized = $this->sanitize($validated);

		$storeCase = new CreateUseCase();
		$newUser = $storeCase->execute($sanitized);

		Auth::login($newUser);

		return true;
	}

	public function showRegisterForm()
	{
		if (Auth::user()) {
			return redirect('/');
		}

		return Inertia::render('auth/register', []);
	}

	private function validator(Request $request)
	{
		return $this->validate($request, [
			'name' => ['required'],
			'phone' => ['required'],
			'password' => ['required', 'confirmed'],
			'document' => ['string', Rule::unique('users')],
			'email' => ['required', 'email', Rule::unique('users')],

			'cep' => ['required', 'string'],
			'city' => ['required', 'string'],
			'street' => ['required', 'string'],
			'district' => ['required', 'string'],
			'reference' => ['nullable', 'string'],
			'complement' => ['nullable', 'string'],
			'street_number' => ['nullable', 'string'],
			'federative_unit' => ['required', 'string'],
		], [], [
			'password' => "senha",
			'name' => "nome completo",
			'phone' => "telefone celular",
			'document' => "documento CPF ou CNPJ",

			'cep' => 'CEP',
			'city' => 'cidade',
			'street' => 'logradouro',
			'district' => 'bairro',
			'reference' => 'referência',
			'complement' => 'complemento',
			'federative_unit' => 'estado',
		]);
	}

	private function sanitize($data)
	{
		if ($data['password'] ?? false) {
			$data['password'] = bcrypt($data['password']);
		}

		if ($data['phone'] ?? []) {
			$data['contact'] = [
				'phone' => $data['phone']
			];
		}

		$data['location'] = [
			'cep' => $data['cep'] ?? '',
			'city' => $data['city'] ?? '',
			'street' => $data['street'] ?? '',
			'district' => $data['district'] ?? '',
			'reference' => $data['reference'] ?? '',
			'complement' => $data['complement'] ?? '',
			'street_number' => $data['street_number'] ?? '',
			'federative_unit' => $data['federative_unit'] ?? '',
		];

		return $data;
	}
}
