<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface PatientRepositoryInterface
{
    public function getWithTrashedLatest(Request $request);
}
