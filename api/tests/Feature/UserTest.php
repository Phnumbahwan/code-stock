<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_login_api()
    {
        $user = User::factory()->create(['password' => bcrypt('foo')]);

        $formData = [
            'email'=> $user->email,
            'password'=> 'foo'
        ];
        $this->post('/api/login',$formData)
        ->assertStatus(201);
    }

    public function test_register_api()
    {
        $password = $this->faker->password();

        $formData = [
            'name'=> $this->faker->name(),
            'email'=> $this->faker->email(),
            'password'=> $password,
            'password_confirmation'=> $password
        ];

        $this->post('/api/register',$formData)
        ->assertStatus(201);
    }

    public function test_logout_api()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/api/logout')
        ->assertStatus(200);
    }
}
