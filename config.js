/*
Create and export configuration variables
*/

// container for the env variables
var env = {};

// staging (default) envirement
env.staging = {
    "port": 3000,
    "envName": "staging"
}

// production envirement
env.production = {
    "port": 5000,
    "envName": "production"
}

// determine which end was passed as a command-line argument
var currentEnv = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.toLowerCase() : "";

// Check that the current env is one of the above if not set it to default
var envToExport = typeof(env[currentEnv]) === "object" ? env[currentEnv] : env.staging;

// export the module
module.exports = envToExport;
