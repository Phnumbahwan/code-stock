<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use App\Models\User;
use Tests\TestCase;

class CrudTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_show_all_products_api()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/api/products/')
        ->assertStatus(200);
    }

    public function test_show_specific_product_api()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/api/products/search/p')
        ->assertStatus(200);
    }

    public function test_create_api()
    {
        $user = User::factory()->create();

        $formData = [
            'name'=> $this->faker->name(),
            'slug'=> $this->faker->slug(),
            'description'=> 'This is test description',
            'price'=> '99.99'
        ];
        $this->actingAs($user)
        ->post('/api/products', $formData)
        ->assertStatus(200);
    }

    public function test_update_api()
    {
        $user = User::factory()->create();

        $id = '1';

        $this->actingAs($user)
        ->put('/api/products/{$id}')
        ->assertStatus(200);
    }

    public function test_delete_api()
    {
        $user = User::factory()->create();

        $id = '1';

        $this->actingAs($user)
        ->delete('/api/products/{$id}')
        ->assertStatus(200);
    }
}
