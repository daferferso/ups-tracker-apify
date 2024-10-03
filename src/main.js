import { Actor } from "apify";
import { getCookies, getStatus } from "./services/services.js";

await Actor.init();

const input = await Actor.getInput();

const { trackingNumbers } = input;

const trackingNumberRegex = /^[A-Z0-9]{18}$/;

/**
 * Main function to handle tracking number requests.
 *
 * This function fetches the cookies required for making requests to the UPS tracking
 * service and processes each tracking number provided in the input. It checks if
 * each tracking number is valid, retrieves its status, and pushes the results to
 * Apify's dataset.
 *
 * @async
 * @function main
 * @throws {Error} If there is an issue retrieving cookies or processing tracking numbers.
 */
async function main() {
  try {
    const cookies = await getCookies();

    if (!cookies) {
      console.error("No cookies were retrieved from the UPS tracking page.");
      throw new Error("No cookies were retrieved from the UPS tracking page.");
    }

    for (const item of trackingNumbers) {
      const trackNumberId = String(item);

      if (!trackingNumberRegex.test(trackNumberId)) {
        console.error(
          `trackingNumber: ${trackNumberId} - INVALID_TRACKING_NUMBER`
        );
        await Actor.pushData({
          trackNumber: trackNumberId,
          result: { errorMessage: "INVALID_TRACKING_NUMBER" },
        });
        continue;
      }

      try {
        let trackInfo = await getStatus(trackNumberId, cookies);

        if (trackInfo.languageOptions) {
          delete trackInfo.languageOptions;
        }

        await Actor.pushData({
          trackNumber: trackNumberId,
          result: trackInfo,
        });
      } catch (error) {
        console.error(
          `trackingNumber: ${trackNumberId} - ${
            error.message || "UNKNOWN_ERROR"
          }`
        );
        await Actor.pushData({
          trackNumber: trackNumberId,
          result: { errorMessage: error.message || "UNKNOWN_ERROR" },
        });
      }
    }
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  } finally {
    await Actor.exit();
  }
}

main();
