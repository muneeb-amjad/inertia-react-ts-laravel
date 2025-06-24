<?php

use Illuminate\Support\Str;


function hashId(): string
{
    return strtolower(Str::random());
}
