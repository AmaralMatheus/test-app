<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Bob',
            'email' => 'bob@print.com',
            'password' => bcrypt('print2132'),
        ]);
        DB::table('users')->insert([
            'name' => 'Annoying Manager',
            'email' => 'manager@print.com',
            'password' => bcrypt('print2132'),
        ]);
    }
}