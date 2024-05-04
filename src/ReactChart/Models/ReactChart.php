<?php

namespace Src\ReactChart\Models;

use Illuminate\Database\Eloquent\Model;

class ReactChart extends Model
{
	protected $table = 'react_charts';
	protected $fillable = [
		'chart_grid_size',
		'chart_type',
		'options',
		'data',
		'getter_class'
	];

	protected $casts = [
        'options' => 'array',
        'data' => 'array',
	];

	public $timestamps = [];
	public $searchable = [];

	const CHART_GETTERS_PATH = 'Src\\ReactChart\\UseCases\\ChartGetters\\';

	// Relationships

	// Methods

	public function getPrepared() {

		$getter = get_use_case(self::CHART_GETTERS_PATH, $this->getter_class);

		$getterData = $getter->execute();

		$data = $getterData['data'] ?? [];
		$labels = $getterData['labels'] ?? [];
		$datasets = $getterData['datasets'] ?? [];

		$preparedDatasets = [];
		if ($datasets) {
			$preparedDatasets = $datasets;
		} else {
			foreach ($this->data['datasets'] as $key => $value) {
				$value['data'] = $data[$key];

				array_push($preparedDatasets, $value);
			}
		}

		return [
			'chart_grid_size' => $this->chart_grid_size,
			'chart_type' => $this->chart_type,
			'options' => $this->options,
			'data' => [
				'labels' => $labels,
				'datasets' => $preparedDatasets
			]
		];
	}

}
