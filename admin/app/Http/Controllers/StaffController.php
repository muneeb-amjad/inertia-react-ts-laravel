<?php

namespace App\Http\Controllers;

use App\Models\CqcRegistration;
use App\Models\Staff;
use App\Models\UserRole;
use App\Models\UserType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = in_array($request->get('per_page'), [10, 20, 50, 100])
            ? $request->get('per_page')
            : 10;

        return Inertia::render('modules/staff/index', [
            'filters' => $request->all(['search', 'status', 'per_page']),
            'staff' => Staff::with(['pharmacy_staff.userRole'])
                ->orderByName()
                ->filter($request->only(['search', 'status']))
                ->paginate($perPage)
                ->withQueryString(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userRoles = UserRole::where('status', '1')->select('id', 'title')->get();
        $userTypes = UserType::where('status', '1')->select('id', 'title')->orderBy('display_order')->get();
        $cqcSettings = CqcRegistration::where('status', '1')->select('id', 'business_name')->orderBy('display_order')->get();
        return Inertia::render('modules/staff/create', [
            'userRoles' => $userRoles,
            'userTypes' => $userTypes,
            'cqcSettings' => $cqcSettings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $staff = Staff::create($request->all());
        $staff->pharmacy_staff()->create($request->all());
        return redirect()->route('staff-users.index')->with('success', 'Record created successfully');
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
        return Inertia::render('modules/staff/edit');
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
