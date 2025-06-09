<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config
{
    // This is the new function from your university's tutorial.
    // It checks for an environment variable first, and if it doesn't find one, it uses the default value.
    public static function get_env($name, $default)
    {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }



    public static function DATABASE_NAME()
    {

        return Config::get_env("DB_NAME", "PetSociety");
    }

    public static function DATABASE_HOST()
    {
        // Environment variable: DB_HOST
        // Default (your local): 'localhost'
        return Config::get_env("DB_HOST", "localhost");
    }

    public static function DATABASE_USERNAME()
    {
        // Environment variable: DB_USER
        // Default (your local): 'root'
        return Config::get_env("DB_USER", "root");
    }

    public static function DATABASE_PASSWORD()
    {
        // Environment variable: DB_PASSWORD
        // Default (your local): '' (empty)
        return Config::get_env("DB_PASSWORD", "");
    }

    public static function JWT_SECRET()
    {
        // Environment variable: JWT_SECRET
        // Default (your local): 'extremelysecurekey'
        return Config::get_env("JWT_SECRET", "extremelysecurekey");
    }
}
