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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string("iso", 10)->nullable();
            $table->string("name", 80)->nullable();
            $table->string("nicename", 80)->nullable();
            $table->string("slug")->nullable();
            $table->string("iso3", 10)->nullable();
            $table->string("image")->nullable();
            $table->integer("numcode")->nullable();
            $table->integer("phonecode")->nullable();
            $table->enum("status", ['1', '0'])->default('1')->nullable();
            $table->enum("international_delivery", ['1', '0'])->default('0')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
