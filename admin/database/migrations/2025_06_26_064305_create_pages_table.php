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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string("hash_id", 20)->nullable();
            $table->string("title", 70);
            $table->string("slug", 200)->nullable();
            $table->text("description")->nullable();
            $table->enum("status", ["1", "0"])->default("1");
            $table->string("seo_title", 70)->nullable();
            $table->string("seo_keywords")->nullable();
            $table->string("seo_description", 160)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
