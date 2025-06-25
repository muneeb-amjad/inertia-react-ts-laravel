<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string("hash_id", 20)->nullable();
            $table->string("title", 60);
            $table->enum('status', ['1', '0'])->default('1')->nullable();
            $table->string("registration_number_label", 60)->default("Registration No")->nullable();
            $table->smallInteger("display_order")->default(1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_types');
    }
};
