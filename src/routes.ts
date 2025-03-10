/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/age-alert"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect loggedin users to homepage
 * @type {string[]}
 */

export const authRoutes = [
  "/login",
  "/registration",
  "/registration/overview",
  "/registration/experiences",
  "/registration/experiences/profession",
  "/registration/country",
  "/registration/country/Canada",
  "/registration/country/United%20States",
  "/registration/country/United%20States/business_information",
  "/registration/country/Canada/business_information",
  "/registration/country/Mexico/business_information",
  "/registration/country/Germany/business_information",
  "/registration/country/Spain/business_information",
  "/registration/country/Thailand/business_information",
  "/registration/country/Uruguay/business_information",
  "/registration/country/Netherlands/business_information",
  "/registration/country/Austria/business_information",
  "/registration/country/Belgium/business_information",
  "/registration/country/Bulgaria/business_information",
  "/registration/country/Croatia/business_information",
  "/registration/country/Cyprus/business_information",
  "/registration/country/Czechia/business_information",
  "/registration/country/Denmark/business_information",
  "/registration/country/Estonia/business_information",
  "/registration/country/France/business_information",
  "/registration/country/Greece/business_information",
  "/registration/country/Hungary/business_information",
  "/registration/country/Ireland/business_information",
  "/registration/country/Italy/business_information",
  "/registration/country/Latvia/business_information",
  "/registration/country/Lithuania/business_information",
  "/registration/country/Luxembourg/business_information",
  "/registration/country/Poland/business_information",
  "/registration/country/Portugal/business_information",
  "/registration/country/Romania/business_information",
  "/registration/country/Slovakia/business_information",
  "/registration/country/Slovenia/business_information",
  "/registration/country/Switzerland/business_information",
  "/registration/country/United%20Kingdom/business_information",
  "/registration/country/Argentina/business_information",
  "/registration/country/Japan/business_information",
  "/registration/country/Australia/business_information",
  "/registration/country/South%20Africa/business_information"
];


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
