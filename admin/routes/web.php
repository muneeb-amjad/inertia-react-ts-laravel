<?php

use App\Http\Controllers\BrandController;
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
});

Route::resource('brands', BrandController::class);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
