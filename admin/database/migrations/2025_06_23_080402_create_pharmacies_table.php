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
        Schema::create('pharmacies', function (Blueprint $table) {
            $table->id();
            $table->string("hash_id", 20)->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('business_name', 100)->nullable();
            $table->string('pharmacy_name', 100)->nullable();
            $table->string('superintendent', 150)->nullable();
            $table->string('contact_no', 16)->nullable();
            $table->string('fax_no', 16)->nullable();
            $table->string('whatsapp_no', 16)->nullable();
            $table->string('primary_email', 128)->nullable();
            $table->string('secondary_email', 128)->nullable();
            $table->text("about_company")->nullable();
            $table->string('branch_code', 20)->nullable();
            $table->string('company_register_in', 100)->nullable();
            $table->string('company_reg_no', 50)->nullable();
            $table->string('address_1', 100)->nullable();
            $table->string('address_2', 100)->nullable();
            $table->string('address_3', 100)->nullable();
            $table->string('city_town', 60)->nullable();
            $table->string('postcode', 20)->nullable();
            $table->string('county', 60)->nullable();
            $table->unsignedBigInteger('country_id')->nullable();
            $table->double('latitude', 10, 7)->nullable();
            $table->double('longitude', 10, 7)->nullable();
            $table->string('recaptcha', 100)->nullable();
            $table->string('slug')->nullable();
            $table->enum("order_type", ['BOTH', 'CLICK_N_COLLECT', 'PAYMENT'])->default('BOTH')->nullable();
            $table->enum("status", ['1', '0'])->default('1')->nullable();
            $table->string('logo')->nullable();
            $table->string('logo_2')->nullable();
            $table->string('image')->nullable();
            $table->string('fav_icon')->nullable();
            $table->string("seo_title")->nullable();
            $table->string("seo_keywords")->nullable();
            $table->string("seo_description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacies');
    }
};
