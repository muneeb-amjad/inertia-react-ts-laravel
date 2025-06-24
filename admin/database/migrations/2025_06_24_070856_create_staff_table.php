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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_id')->nullable();
            $table->string("hash_id", 20)->nullable();
            $table->string('first_name', 60)->nullable();
            $table->string('middle_name',60)->nullable();
            $table->string('last_name', 60)->nullable();
            $table->date('dob')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();
            $table->string('email', 128)->nullable();
            $table->string('password', 255)->nullable(); // min:6 max:20
            $table->timestamp('email_verified_at')->nullable();
            $table->string('contact_number', 16)->nullable();
            $table->string('address_1', 100)->nullable();
            $table->string('address_2', 100)->nullable();
            $table->string('address_3', 100)->nullable();
            $table->string('city_town', 60)->nullable();
            $table->string('postcode', 20)->nullable();
            $table->string('county', 60)->nullable();
            $table->smallInteger('country_id')->nullable();
            $table->enum('status', ['1', '0'])->default('1')->nullable();
            $table->string('profile_picture', 100)->nullable();
            $table->string('signature')->nullable();
            $table->text('about_me')->nullable();
            $table->enum('is_superintendent', ['1', '0'])->default('0')->nullable();
            $table->enum('is_locum', ['1', '0'])->default('0')->nullable();
            $table->enum('is_store_manager', ['1', '0'])->default('0')->nullable();
            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
