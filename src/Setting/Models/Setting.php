<?php

namespace Src\Setting\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
	protected $table = 'settings';
	protected $fillable = [
		'key',
		'value',
	];
	public $timestamps = false;

	// Relationships

	// Boot

	public static function boot()
	{
		parent::boot();
	}
}
