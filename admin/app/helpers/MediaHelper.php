<?php

namespace App\helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaHelper
{
    /**
     * @param $file
     * @param string $full_path
     * @param $fileName
     * @return bool
     */
    public static function uploadParentMedia($file, string $full_path, $fileName): bool
    {
        $url = env('MEDIA_API_URL').'media/store';
        $apiKey = env('MEDIA_TOKEN');
        $apiCall = Http::withToken($apiKey)
            ->attach("file", fopen($file,'r'), $fileName)
            ->post($url,
                [
                    'full_path' => $full_path
                ]
            );
        return $apiCall->successful();
    }

    /**
     * @param $file
     * @param string $full_path
     * @param $fileName
     * @return bool
     */
    public static function uploadFileContentParentMedia($file_content, string $full_path, $fileName): bool
    {
        $url = env('MEDIA_API_URL').'media/store';
        $apiKey = env('MEDIA_TOKEN');
        $apiCall = Http::withToken($apiKey)
            ->attach("file", $file_content, $fileName)
            ->post($url,
                [
                    'full_path' => $full_path
                ]
            );
        return $apiCall->successful();
    }

    /**
     * @param string $fullPath
     * @return bool
     */
    public static function removeParentMedia(string $fullPath): bool
    {
        $url = env('MEDIA_API_URL').'media/destroy';
        $apiKey = env('MEDIA_TOKEN');
        $apiCall = Http::withToken($apiKey)
            ->delete($url,
                [
                    'full_path' => $fullPath,
                ]
            );
        return $apiCall->successful();
    }

    /**
     * @param $file
     * @param string $path
     * @param string $file_name
     */
    public static function uploadLocalMedia(UploadedFile $file, string $path, string $file_name)
    {
        $file_name .= ".".$file->extension();
        Storage::disk("public")->put("$path/$file_name", file_get_contents($file));
        return $file_name;
    }

    /**
     * @param string|null $full_path
     */
    public static function removeLocalMedia(?string $full_path)
    {
        if ($full_path)
            Storage::disk("public")->delete($full_path);
    }
}
