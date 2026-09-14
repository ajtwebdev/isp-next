/**
 * Studio address and map link, in one place.
 *
 * The address previously appeared in four different formats across the site
 * (footer, contact, privacy policy, contest form). Everything now reads from
 * here so the wording can only drift in one file.
 */
export const STUDIO_ADDRESS = "711-84 Ave SW, Calgary, Alberta, Canada, T2V 0V8";

/**
 * Existing Google Business Profile listing, already referenced by
 * components/forms/formContest.js. The `sa=X&ved=...` query Google appended
 * are search-session artifacts, not part of the listing, so they are dropped.
 */
export const STUDIO_MAP_URL =
  "https://www.google.com/maps/place/Inner+Spirit+Photography/@50.977725,-114.0806245,15z/data=!4m2!3m1!1s0x0:0xbbb2559053a55ca5";
