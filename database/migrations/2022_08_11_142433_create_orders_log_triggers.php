<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersLogTriggers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared(
            'CREATE TRIGGER orders_log_create
            AFTER INSERT ON `orders` FOR EACH ROW
            BEGIN
                DECLARE original_query VARCHAR(1024);
                SET original_query = (SELECT info FROM INFORMATION_SCHEMA.PROCESSLIST WHERE id = CONNECTION_ID());
                INSERT INTO database_logs (`classable_type`, `classable_id`, `user_id`, `movement_type`, `query`, `created_at`)
                    VALUES ("order", NEW.id, NEW.user_id, "insert", original_query, NOW());
            END'
        );
        DB::unprepared(
            'CREATE TRIGGER orders_log_update
            AFTER UPDATE ON `orders` FOR EACH ROW
            BEGIN
                DECLARE original_query VARCHAR(1024);
                SET original_query = (SELECT info FROM INFORMATION_SCHEMA.PROCESSLIST WHERE id = CONNECTION_ID());
                INSERT INTO database_logs (`classable_type`, `classable_id`, `user_id`, `movement_type`, `query`, `created_at`)
                    VALUES ("order", NEW.id, NEW.user_id, "update", original_query, NOW());
            END'
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `orders_log_create`');
        DB::unprepared('DROP TRIGGER `orders_log_update`');
    }
}
