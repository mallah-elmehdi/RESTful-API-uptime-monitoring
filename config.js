/*
Create and export configuration variables
*/

// container for the env variables
var env = {};

// staging (default) envirement
env.staging = {
    "httpPort": 3000,
    "httpsPort": 3001,
    "envName": "staging",
    "hashingSecret" : "verylongstring"
}

// production envirement
env.production = {
    "httpPort": 5000,
    "httpsPort": 5001,
    "envName": "production",
    "hashingSecret" : "verylongstring"
}

// determine which end was passed as a command-line argument
var currentEnv = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.toLowerCase() : "";

// Check that the current env is one of the above if not set it to default
var envToExport = typeof(env[currentEnv]) === "object" ? env[currentEnv] : env.staging;

// export the module
module.exports = envToExport;
