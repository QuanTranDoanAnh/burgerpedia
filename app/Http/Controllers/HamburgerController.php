<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hamburger;

class HamburgerController extends Controller
{
    public function index() {
        return Hamburger::paginate();
    }

    public function store(Request $request) {
        // validate our input hamburger
        $this->validate($request, [ 'name' => 'required|unique:hamburgers|max:255' ]);
        $this->validate($request, [ 'author' => 'required' ]);
        $this->validate($request, [ 'overview' => 'required' ]);

        $hamburger = Hamburger::create([
            'name' => $request->input('name'),
            'author' => $request->input('author'),
            'overview' => $request->input('overview')
        ]);

        return $hamburger;
    }

    public function show(Hamburger $hamburger) {
        return $hamburger;
    }
}
