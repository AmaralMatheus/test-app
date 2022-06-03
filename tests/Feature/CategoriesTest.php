<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use Laravel\Passport\Passport;
use Artisan;

class CategoriesTest extends TestCase
{
    public function setUpUser(array $attributes = [])
    {
        $this->logout();
      
        $this->user = User::factory()->create($attributes);

        $this->login();

        Artisan::call('migrate:refresh', [
            '--env'  => 'testing',
           "--database" => "pgsql"
        ]);

        return $this;
    }

    public function login()
    {
        Passport::actingAs($this->user);
    }
    
    public function logout()
    {
        $this->user = null;
    }

    public function test_create_main_category() {
        $this->setUpUser();

        $body = [
            'name' => 'Category',
            'depth' =>  1
        ];

        $response = $this->json('POST', '/api/categories', $body);
        $response->assertStatus(200);
        $this->assertDatabaseHas('categories', [
            'name' => 'Category',
        ]);
    }

    public function test_create_already_existing_category() {
        $this->setUpUser();

        $body = [
            'name' => 'Category',
            'depth' =>  1
        ];

        $response = $this->json('POST', '/api/categories', $body);

        $response = $this->json('POST', '/api/categories', $body);
        $response->assertStatus(422);
    }

    public function test_create_max_depth_category() {
        $this->setUpUser();

        $count = 0;
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response->assertStatus(200);
        $response = $this->json('POST', '/api/categories', ['name'=> 'Category'.$count++, 'depth' => $count, 'parent_id' => $count-1]);
        $response->assertStatus(422);
    }
}
