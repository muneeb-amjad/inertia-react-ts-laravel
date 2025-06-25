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
        Schema::create('cqc_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('hash_id', 20)->nullable();
            $table->string('business_name')->nullable();
            $table->string('contact_no', 20)->nullable();
            $table->string('fax_no', 20)->nullable();
            $table->string('registration_no')->nullable();
            $table->string('address_1', 100)->nullable();
            $table->string('address_2', 100)->nullable();
            $table->string('address_3', 100)->nullable();
            $table->string('city_town', 60)->nullable();
            $table->string('postcode', 20)->nullable();
            $table->string('county', 60)->nullable();
            $table->smallInteger('country_id')->nullable();
            $table->double('latitude', 10, 7)->nullable();
            $table->double('longitude', 10, 7)->nullable();
            $table->enum("status", ['1', '0'])->default('1')->nullable();
            $table->smallInteger("display_order")->default(1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cqc_registrations');
    }
};
