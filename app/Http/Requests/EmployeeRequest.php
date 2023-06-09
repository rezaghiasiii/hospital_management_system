<?php

namespace App\Http\Requests;

use App\Rules\Nationalcode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'first_name' => ['required','persian_alpha'],
            'last_name' => ['required','persian_alpha'],
            'phone' => ['required','ir_mobile'],
            'national_code' => ['required',Rule::unique('employees')->ignore($this->request->get('id')),'numeric','digits:10'],
            'gender' => ['required','min:1','max:2'],
            'photo' => ['nullable','image','mimes:jpg,png,jpeg','max:2048'],
            'email' => ['nullable','email'],
            'address' => ['required'],
            'job_id' => ['required','exists:jobs,id'],
            'salary' => ['numeric','nullable'],
            'date_of_birth' => ['required']
        ];
        if (request()->isMethod('put')){
            $rules['photo'] = [''];
        }

        return $rules;
    }
}
