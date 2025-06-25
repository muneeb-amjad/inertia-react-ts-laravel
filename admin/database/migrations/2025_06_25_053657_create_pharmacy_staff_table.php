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
        Schema::create('pharmacy_staff', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('pharmacy_id')->nullable();
            $table->unsignedInteger('staff_id')->nullable();
            $table->unsignedInteger('user_type_id')->nullable();
            $table->unsignedInteger('user_role_id')->nullable();
            $table->unsignedInteger('designation_id')->nullable();
            $table->unsignedInteger('cqc_setting_id')->nullable();
            $table->enum('status', ['1', '0'])->default('1');
            $table->timestamp("last_login_at")->nullable();
            $table->enum("account_level", ["HEAD_OFFICE", "BRANCH"])->nullable();
            $table->string('pin', 10)->nullable();
            $table->boolean('is_prescriber')->default('0')->nullable();
            $table->enum('is_manager', ['1', '0'])->default('0')->nullable();
            $table->enum('is_superintendent', ['1', '0'])->default('0')->nullable();
            $table->enum('is_admin', ['1', '0'])->default('0')->nullable();
            $table->string('registration_number', 16)->nullable();
            $table->string('qualifications', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacy_staff');
    }
};
