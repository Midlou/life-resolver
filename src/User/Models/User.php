<?php

namespace Src\User\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
	use SoftDeletes, HasApiTokens, HasFactory, Notifiable;

	protected $fillable = [
		'type',
		'name',
		'email',
		'contact',
		'password',
		'document',
		'location',
		//   'username',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected $casts = [
		'contact' => 'array',
		'location' => 'array',
	];

	public $searchable = [
		'id',
		'name',
		'email',
		'contact',
		'document',
		'location',
	];
}
