<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hamburger extends Model
{
    protected $fillable = ['name', 'overview', 'author'];

    public function descriptions() {
        return $this->hasMany(Description::class);
    }
}
