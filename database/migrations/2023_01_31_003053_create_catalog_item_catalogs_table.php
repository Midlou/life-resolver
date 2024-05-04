<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatalogItemCatalogsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('catalog_item_catalogs', function (Blueprint $table) {
			$table->id();

			$table->foreignId('catalog_id')->nullable()->constrained('catalogs');
			$table->foreignId('catalog_item_id')->nullable()->constrained('catalog_items');

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
		Schema::dropIfExists('catalog_item_catalogs');
	}
}
