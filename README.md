# UPS Tracker

UPSTracker is a Node.js service that fetches real-time order status from UPS using tracking numbers.

## What UPS tracking info can I access? 📦

1. **Package Status:**

   - **Status Code:** `statusCode` (e.g., "200")
   - **Status Text:** `statusText` (e.g., "Successful")
   - **Package Status:** `trackDetails[0].packageStatus` (e.g., "Shipment Ready for UPS")

2. **Weight:**

   - **Weight:** `trackDetails[0].additionalInformation.weight` (e.g., "1.00 LBS")
   - **Weight Unit:** `trackDetails[0].additionalInformation.weightUnit` (e.g., "LBS")

3. **Service Type:**

   - **Service Name:** `trackDetails[0].additionalInformation.serviceInformation.serviceName` (e.g., "UPS Ground")

4. **Delivery Address:**

   - **City:** `trackDetails[0].shipToAddress.city` (e.g., "ALISO VIEJO")
   - **State:** `trackDetails[0].shipToAddress.state` (e.g., "CA")
   - **Country:** `trackDetails[0].shipToAddress.country` (e.g., "US")

5. **Progress Events:**

   - **Milestones:**
     - **Current Milestone:** `trackDetails[0].milestones` (list of milestone objects, each with details like date, time, location, and name)
   - **Shipment Progress Activities:**
     - **Activity Scan:** `trackDetails[0].shipmentProgressActivities` (list of activities with date, time, location, and description)

## Input Format

You can enter up to 20 tracking numbers in a single request.

```json
{
  "trackingNumbers": ["1ZB350090325362692"]
}
```

## Output Examples

#### ✅ Valid Tracking Number

```json
[
  {
    "trackNumber": "1Z3TWW700308932865",
    "result": {
      "statusCode": "200",
      "statusText": "Successful",
      "isLoggedInUser": false,
      "trackedDateTime": "10/03/2024 3:43 P.M. EST",
      "isBcdnMultiView": false,
      "returnToDetails": {
        "returnToURL": null,
        "returnToApp": null
      },
      "trackDetails": [
        {
          "errorCode": null,
          "errorText": null,
          "requestedTrackingNumber": "1Z3TWW700308932865",
          "trackingNumber": "1Z3TWW700308932865",
          "isMobileDevice": false,
          "packageStatus": "Shipment Ready for UPS",
          "packageStatusType": "M",
          "packageStatusCode": "003",
          "progressBarType": "ManifestUpload",
          "progressBarPercentage": null,
          "simplifiedText": "",
          "endOfDayResCMSKey": null,
          "receivedBy": "",
          "leaveAt": null,
          "nextExpectedEvent": null,
          "milestones": [],
          "altTrkNumInfo": null,
          "alertCount": 0,
          "isEligibleViewMoreAlerts": false,
          "cdiLeaveAt": null,
          "leftAtActionCMSKey": "cms.stapp.at",
          "leftAt": "",
          "showNoInfoDate": false,
          "showPickupByDate": false,
          "shipToAddress": {},
          "shipFromAddress": null,
          "consigneeAddress": null,
          "deliveryAddress": null,
          "signatureImage": "",
          "trackHistoryDescription": null,
          "additionalInformation": {}
        }
      ]
    }
  }
]
```

#### ❌ Invalid Tracking Number

```json
[
  {
    "trackNumber": "1Z3TWW700308932865",
    "result": { "errorMessage": "INVALID_TRACKING_NUMBER" }
  }
]
```

### Your Feedback 🙏

If you have any feedback or notice any bugs, please create an issue on the Issues tab in Apify Console. Thank you!
