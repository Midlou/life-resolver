<?php

namespace Src\User\UseCases;

use Src\User\Models\User;

class FindUseCase extends BaseUseCase
{
	public function execute($id)
	{
        return User::with([])->find($id);
	}

}
