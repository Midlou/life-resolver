<?php

namespace Src\File\Controllers;

use Src\Shared\Models\File;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class FileController extends Controller
{

    public function getFile(Request $request, $path)
    {
        /**
         * @var File
         */
        $file = File::where('filename', $path)->first();

        if(!$file) {
            throw new HttpException(404, "Arquivo não encontrado!");
        }

        return Storage::response($file->getFilePath());
    }
}
