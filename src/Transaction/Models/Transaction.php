<?php

namespace Src\Transaction\Models;

use Src\Category\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
	use SoftDeletes;

	protected $table = 'transactions';
	protected $fillable = [
		'amount',
		'category_id',
		'description',
		'transacted_at',
	];

	// public $timestamps = [
	// 	'transacted_at'
	// ];

	protected $casts = [
		'amount' => 'double',
		'transacted_at' => 'datetime:Y-m-d'
	];

	public $searchable = [];

	// Relationships

	public function category()
	{
		return $this->belongsTo(Category::class, 'category_id');
	}

	// Boot

	public static function boot()
	{
		parent::boot();
	}
}
