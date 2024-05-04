<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReactChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('react_charts', function (Blueprint $table) {
            $table->id();

			$table->string('name');
			$table->string('getter_class');

			$table->string('chart_grid_size');
			$table->string('chart_type');

			$table->json('options');
			$table->json('data');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('react_charts');
    }
}
