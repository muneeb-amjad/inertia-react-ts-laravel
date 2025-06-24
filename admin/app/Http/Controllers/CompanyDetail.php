<?php

namespace App\Http\Controllers;

use App\Http\Requests\PharmacyUpdateRequest;
use App\Http\Resources\PharmacyResource;
use App\Models\Country;
use App\Models\Pharmacy;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class CompanyDetail extends Controller
{
    public function index(): Response
    {
        $pharmacy = Pharmacy::where('id', env('PARENT_PHARMACY', 1))->firstOrFail();

        return Inertia::render('modules/pharmacy/edit', [
            // 'pharmacy' => new PharmacyResource($pharmacy),
            // 'organizations' => new UserOrganizationCollection(
            //     Auth::user()->account->organizations()
            //         ->orderBy('name')
            //         ->get()
            // ),
            'countries' =>  Country::orderBy('nicename')
                ->pluck('nicename', 'id')
                ->toArray(),
            'pharmacy' => $pharmacy,
        ]);
    }

    public function update(Pharmacy $pharmacy, PharmacyUpdateRequest $request): RedirectResponse
    {
        // dd($request->all(), $pharmacy);
        $validated = $request->validated();
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($pharmacy->logo) {
                Storage::delete('public/logos/' . $pharmacy->logo);
            }

            // Store new logo
            $logoPath = $request->file('logo')->store('logos', 'public');
            $validated['logo'] = basename($logoPath);
        }
        $pharmacy->update($validated);

        return Redirect::back()->with('success', 'Record updated.');
    }
}
