<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hamburger;
use App\Description;

class HamburgerDescriptionController extends Controller
{
    public function index($hamburgerId) {
        return Description::ofHamburger($hamburgerId)->paginate();
    }

    public function store(Request $request, Hamburger $hamburger) {

        // validate our input description
        $this->validate($request, [  'description' => 'required' , 'author' => 'required', 'title' => 'required']);

        $hamburger->descriptions()->save(new Description([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'author' => $request->input('author')
        ]));

        return $hamburger->descriptions;
    }

    public function show(Hamburger $hamburger, Description $description) {
        return $description;
    }

    public function update(Request $request, Hamburger $hamburger, Description $description) {
        if ($request->input('author') == $description['author']) {
            // validate our input description
            $this->validate($request, [  'description' => 'required' , 'author' => 'required', 'title' => 'required']);
            
            $description->update([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'author' => $request->input('author')
            ]);
            return $description;
        } else {
            // Unprocessable entity
            return response()->json(['name' => 'Failure! You are not the author of this description'], 422);
        }
    }

    public function destroy(Request $request, Hamburger $hamburger, Description $description) {
        $description->delete();
        return $description;
    }
}
