<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staff = Staff::orderBy('name')
                    // ->filter(Request::only('search', 'trashed'))
                    ->paginate();
                    // ->appends(Request::all());
// dd($staff);
        return Inertia::render('modules/staff/index', [
            // 'pharmacy' => new PharmacyResource($pharmacy),
            // 'organizations' => new UserOrganizationCollection(
            //     Auth::user()->account->organizations()
            //         ->orderBy('name')
            //         ->get()
            // ),
            'staff' => $staff,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
