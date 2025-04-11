<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use InvalidArgumentException;
// use InvalidArgumentException;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ADMIN_PASSWORD = env('ADMIN_PASSWORD');
        $USER_PASSWORD = env('USER_PASSWORD');

        if (empty($ADMIN_PASSWORD) || empty($USER_PASSWORD)) {
            throw new InvalidArgumentException('ADMIN_PASSWORD or USER_PASSWORD environment variables are not set.');
        }

        User::create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'username' => 'admin',
            'password' => Hash::make($ADMIN_PASSWORD),
            'role' => 'admin'
        ]);

        User::create([
            'first_name' => 'Marwane',
            'last_name' => 'Ahansal',
            'username' => 'mahansal',
            'password' => Hash::make($USER_PASSWORD),
            'role' => 'user'
        ]);
    }
}
