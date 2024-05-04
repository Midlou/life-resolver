<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDatabaseLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('database_logs', function (Blueprint $table) {
            $table->id();

            $table->morphs('classable');
            $table->string('movement_type');
            $table->mediumText('query')->nulllable();

            $table->foreignId('user_id')->nullable()->constrained('users');

            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('database_logs');
    }
}
