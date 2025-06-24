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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("category_id")->nullable();
            $table->unsignedBigInteger("author_id")->nullable();
            $table->string("hash_id", 20)->nullable();
            $table->string("title")->nullable();
            $table->string("excerpt")->nullable();
            $table->string("slug")->nullable();
            $table->string("thumbnail")->nullable();
            $table->string("image")->nullable();
            $table->string("image_2")->nullable();
            $table->string("image_3")->nullable();
            $table->text("description")->nullable();
            $table->text("tags")->nullable();
            $table->smallInteger("display_order")->default(1)->nullable();
            $table->enum("position", ['ALL', "HOMEPAGE"])->nullable();
            $table->enum("status", ["1", "0"])->default("1")->nullable();
            $table->string("seo_title")->nullable();
            $table->text("seo_keywords")->nullable();
            $table->string("seo_description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
