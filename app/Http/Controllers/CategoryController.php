<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    public function index() {
        $categories = Category::where('parent_id', null)->with('categories')->get();
        return $categories;
    }

    public function show($id) {
        $categories = Category::where('parent_id', $id)->get();
        return $categories;
    }

    public function store(CategoryRequest $request) {
        $category = new Category();

        $category->name = $request['name'];
        $category->parent_id = $request['parent_id'] ? $request['parent_id'] : null;
        $category->depth = $request['depth'] ? $request['depth'] : null;
        $category->save();

    }

    public function update(CategoryRequest $request, $id) {
        $category = Category::find($id);

        $category->name = $request['name'];
        $category->save();
    }

    public function destroy($id) {
        Category::find($id)->delete();
    }
}
