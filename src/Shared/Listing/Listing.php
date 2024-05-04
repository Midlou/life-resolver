<?php

namespace Src\Shared\Listing;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Listing
{
	protected $model;
	protected $modelTable;

	protected $query;

	private $params;

	function __construct()
	{
		$this->model = new $this->model;
		$this->modelTable = $this->model->getTable();
	}

	public function params()
	{
		if ($this->params) return $this->params;

		$sorting = json_decode(request()->get('sorting'));
		$filter = json_decode(request()->get('filter'));

		return $this->params = (object) compact('sorting', 'filter');
	}

	public function request($key)
	{
		$this->params();
		if (isset($this->params) && property_exists($this->params, $key)) {
			return $this->params->{$key};
		}
		return null;
	}

	public function requestFilter($key)
	{
		$this->params();
		if (isset($this->params->filter) && property_exists($this->params->filter, $key)) {
			return $this->params->filter->{$key};
		}
		return null;
	}

	public function applyFilter()
	{
		$this->query = $this->model->query();
		if ($except_id = $this->requestFilter('except_id')) {
			$this->query->where('id', '<>', $except_id);
		}

		$this->query->where(function ($q) {
			$search = $this->requestFilter('search');

			if (!$search) return $q;

			foreach ($this->model->searchable ?? [] as $relation => $field) {
				$auxSearch = $search;
				if (is_array($field)) {

					$q->whereHas($relation, function ($relationQ) use ($field, $search) {
						$firstField = array_shift($field);
						$relationQ->where($firstField, 'like', "%{$search}%");

						foreach ($field as $relationField) {
							$relationQ->orWhere($relationField, 'like', "%{$search}%");
						}
					});
					continue;
				}
				if ($field == 'id') $auxSearch = (int) $search;
				if ($auxSearch) {
					$q->orWhere($field, 'like', "%{$auxSearch}%");
				}
			}
		});

		if ($this->requestFilter('only_trashed')) {
			$this->getBuilder()->onlyTrashed();
		}

		return $this;
	}

	public function applySorting() {
		$sorting = $this->params->sorting;

		if (!$sorting || !isset($sorting->field) || !isset($sorting->command)) return $this;

		$this->query->orderBy($sorting->field, $sorting->command);

		return $this;
	}

	public function all($columns = ['*']): Collection
	{
		return $this->query->get($columns);
	}

	public function paginate($limit = 10, $columns = ['*'])
	{
		$count = request('count') ? request('count') : $limit;
		return $this->query->paginate($count, $columns);
	}

	public function with($relations = [])
	{
		$this->query->with($relations);
		return $this;
	}

	public function getBuilder()
	{
		return $this->query;
	}

	protected function getDate($field)
	{
		return $this->requestFilter($field)
			? parse_date($this->requestFilter($field))
			: null;
	}

	protected function applyDateFilters($defaultDateField = 'created_at')
	{
		$startDate = $this->getDate('date_start');
		$endDate = $this->getDate('date_end');

		$periodField = $this->requestFilter('date_field') ?: $defaultDateField;

		if ($startDate) {
			$this->getBuilder()->whereDate($periodField, '>=', $startDate->toDateString());
		}
		if ($endDate) {
			$this->getBuilder()->whereDate($periodField, '<', $endDate->toDateString());
		}
	}

}
