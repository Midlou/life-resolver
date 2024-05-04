<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

function transaction($callback, $attempts = 2)
{
	return DB::transaction($callback, $attempts);
}

function parse_date($value)
{
	try {
		return $value ? Carbon::parse($value) : null;
	} catch (Exception $e) {
		throw new HttpException(400, "O valor <b>{$value}</b> não é uma data válida");
	}
}

function get_dates_in_range(Carbon $startDate, Carbon $endDate, $format = 'd-m', $addUnit = 'days')
{
    $dates = [];

    if ($startDate->lte($endDate)) {
        while ($startDate->lte($endDate)) {
            $dates[] = $startDate->format($format);
            $startDate->add(1, $addUnit);
        }
    }

    return $dates;
}


/**
 * @param string $useCasePath
 * @param string $useCaseClassName
 */
function get_use_case($useCasePath, $useCaseClassName): object
{
	try {
		if (!isset($useCasePath)) {
			throw new \Exception("Path '{$useCasePath}' does not exists");
		}

		$useCasePath = $useCasePath . $useCaseClassName;
		if (!class_exists($useCasePath)) {
			throw new \Exception("Class '{$useCasePath}' does not exists");
		}

		$useCase = new $useCasePath();
		if (!method_exists($useCase, 'execute')) {
			throw new \Exception("Method 'execute' does not exists");
		}

		return $useCase;
	} catch (\Exception $e) {
		throw new HttpException(501, $e->getMessage());
	}
}
