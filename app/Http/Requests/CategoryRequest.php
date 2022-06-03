<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class CategoryRequest extends FormRequest
{   
    public function authorize()
    {
        return true;
    }
    public function rules(Request $request)
    {
        return [            
            'name' => 'required|unique:categories',
            'parent_id' => 'numeric',
            'depth' => 'numeric|max:10'
        ];
    }
    public function messages()
    {
        return [            
            'name.required' => 'Category name is required',
            'depth.max' => 'Already using max category depth',
        ];
    }
}