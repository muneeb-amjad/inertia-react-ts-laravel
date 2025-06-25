<?php

namespace App\Models;

use App\Trait\HasHashId;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasHashId;

    protected $table = "staff";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $dates = [
        "last_login_at"
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function pharmacy_staff()
    {
        return $this->hasOne(PharmacyStaff::class, "staff_id", "id");
    }

    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function scopeOrderByName($query)
    {
        $query->orderBy('last_name')->orderBy('first_name');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
                // ->orWhereHas('organization', function ($query) use ($search) {
                //     $query->where('name', 'like', '%'.$search.'%');
                // });
            });
        });
        
        if (array_key_exists('status', $filters) && $filters['status'] !== 'all' && $filters['status'] !== null && $filters['status'] !== '') {
            $query->where('status', $filters['status']);
        }
        return $query;
        // ->when($filters['status'] ?? null, function ($query, $status) {


        //     dd($status);
        //     if ($status !== 'all') {
        //         \Log::info('Status filter value:', ['status' => $status, 'type' => gettype($status)]);
        //         // Ensure it's a string and trim any whitespace
        //         $status = trim((string) $status);

        //         if ($status === '1') {
        //             $query->where('status', '1');
        //         } elseif ($status === '0') {
        //             $query->where('status', '0');
        //         }
        //     }
        // });
        // ->when($filters['trashed'] ?? null, function ($query, $trashed) {
        //     if ($trashed === 'with') {
        //         $query->withTrashed();
        //     } elseif ($trashed === 'only') {
        //         $query->onlyTrashed();
        //     }
        // });
    }

    public function staffDetail()
    {
        return $this->hasOne(PharmacyStaff::class, "staff_id", "id");
    }

    public function pharmacies()
    {
        return $this->belongsToMany(Pharmacy::class, 'pharmacy_staff', 'staff_id', 'pharmacy_id');
    }
}
