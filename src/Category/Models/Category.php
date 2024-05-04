<?php

namespace Src\Category\Models;

use Illuminate\Database\Eloquent\Model;
use Src\Transaction\Models\Transaction;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
	use SoftDeletes;

	protected $table = 'categories';
	protected $fillable = [
		'name',
		'description',
	];

	public $searchable = [
		'name',
		'description',
	];

	// Relationships

	public function transactions()
	{
		return $this->hasMany(Transaction::class, 'category_id');
	}

	// Boot

	public static function boot()
	{
		parent::boot();
	}
}
