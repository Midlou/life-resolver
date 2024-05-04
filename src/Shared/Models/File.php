<?php

namespace Src\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{

    protected $fillable = [
        'path',
        'filename',
        'properties',
    ];

    protected $casts = [
        'properties' => 'array'
    ];

    // Relationships

    public function ownerable()
    {
        return $this->morphTo();
    }

    // Methods
    public function getFilePath()
    {
        return "{$this->path}/{$this->filename}";
    }
}
