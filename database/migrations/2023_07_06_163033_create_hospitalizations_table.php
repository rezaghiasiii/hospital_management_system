<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hospitalizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->references('id')->on('patients')->noActionOnDelete();
            $table->foreignId('room_id')->references('id')->on('rooms')->noActionOnDelete();
            $table->foreignId('doctor_id')->references('id')->on('doctors')->noActionOnDelete();
            $table->string('disease');
            $table->date('date_of_hospitalization')->default(Carbon::now());
            $table->time('start_time');
            $table->time('end_time');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospitalizations');
    }
};
