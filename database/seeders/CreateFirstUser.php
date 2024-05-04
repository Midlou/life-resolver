<?php

namespace Database\Seeders;

use Src\User\Models\User;
use Illuminate\Database\Seeder;

class CreateFirstUser extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		if (User::count()) return;

		User::firstOrNew(['email' => 'admin@admin.admin'])
			->fill([
				'name' => 'Admin',
				'type' => 'system',
				'password' => bcrypt('FirstUser'),
			])
			->save();
	}
}
