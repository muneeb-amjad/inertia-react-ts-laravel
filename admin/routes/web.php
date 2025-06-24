<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CompanyDetail;
use App\Http\Controllers\FrontendWebsite\BlogCategoryController;
use App\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/head-office-details', [CompanyDetail::class, 'index']);
    Route::put('/pharmacy/{pharmacy:hash_id}', [CompanyDetail::class, 'update'])->name('pharmacy.update');

    Route::resource("staff-users", StaffController::class);

    //Resource Controllers
    Route::resource('brands', BrandController::class);

    Route::post("blog-category-list", [BlogCategoryController::class, "list"]);
    Route::resource("blog-categories", BlogCategoryController::class);

    Route::post("blog-list", [BlogController::class, "list"]);
    Route::resource("blogs", BlogController::class);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
