<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Supported Locales
    |--------------------------------------------------------------------------
    |
    | The locales supported by this application.
    |
    */
    'supportedLocales' => [
        'en' => ['name' => 'English', 'script' => 'Latn', 'native' => 'English', 'regional' => 'en_US'],
        'id' => ['name' => 'Indonesian', 'script' => 'Latn', 'native' => 'Bahasa Indonesia', 'regional' => 'id_ID'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Use Accept Language Header
    |--------------------------------------------------------------------------
    |
    | Automatically determine locale from browser Accept-Language header
    | on first call if it's not defined in the URL.
    |
    */
    'useAcceptLanguageHeader' => true,

    /*
    |--------------------------------------------------------------------------
    | Hide Default Locale In URL
    |--------------------------------------------------------------------------
    |
    | If true, then a URL without locale is identical with the same URL
    | with default locale. For example, if `en` is default locale, then
    | `/en/about` and `/about` would be identical.
    |
    */
    'hideDefaultLocaleInURL' => true,

    /*
    |--------------------------------------------------------------------------
    | Locales Order
    |--------------------------------------------------------------------------
    |
    | Display locales in a particular order in the language selector.
    |
    */
    'localesOrder' => ['en', 'id'],

    /*
    |--------------------------------------------------------------------------
    | Locales Mapping
    |--------------------------------------------------------------------------
    |
    | Custom language URL segments mapping.
    |
    */
    'localesMapping' => [],

    /*
    |--------------------------------------------------------------------------
    | UTF8 Suffix
    |--------------------------------------------------------------------------
    |
    | Locale suffix for LC_TIME and LC_MONETARY.
    | Set to blank on Windows systems.
    |
    */
    'utf8suffix' => env('LARAVELLOCALIZATION_UTF8SUFFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | URLs Ignored
    |--------------------------------------------------------------------------
    |
    | URLs which should not be processed by localization.
    |
    */
    'urlsIgnored' => ['/storage/*', '/api/*'],

    /*
    |--------------------------------------------------------------------------
    | HTTP Methods Ignored
    |--------------------------------------------------------------------------
    |
    | HTTP methods that should not trigger locale redirects.
    |
    */
    'httpMethodsIgnored' => ['POST', 'PUT', 'PATCH', 'DELETE'],
];
