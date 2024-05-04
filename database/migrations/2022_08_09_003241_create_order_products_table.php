<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->id();

            $table->integer('qty')->default(0);
            $table->decimal('price')->default(0);
            $table->decimal('discount')->default(0);

            $table->foreignId('order_id')->constrained('orders');
            $table->foreignId('product_id')->constrained('products');
				$table->foreignId('catalog_item_id')->constrained('catalog_items');

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
        Schema::dropIfExists('order_products');
    }
}
