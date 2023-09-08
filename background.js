// background.js

// Listen for the popup to open and request WiFi details
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    // Handle messages from the popup
    port.onMessage.addListener((msg) => {
      if (msg.action === "getWiFiDetails") {
        // Retrieve WiFi details from the background script
        chrome.networking.onConnect.addListener((details) => {
          const wifiDetails = {
            ssid: details.networkInfo.SSID,
            signalStrength: details.networkInfo.signalStrength + " dBm",
            securityType: details.networkInfo.security,
            macAddress: details.networkInfo.BSSID,
          };

          // Send WiFi details back to the popup
          port.postMessage({ action: "sendWiFiDetails", details: wifiDetails });
        });
      }
    });
  }
});

// Example: Store WiFi details in local storage
function storeWiFiDetails(wifiDetails) {
  // Check if local storage is supported
  if (chrome.storage) {
    // Store WiFi details in local storage
    chrome.storage.local.set({ wifiDetails }, () => {
      console.log("WiFi details stored in local storage.");
    });
  } else {
    console.error("Local storage not supported.");
  }
}

// Example: Retrieve WiFi details from local storage
function getStoredWiFiDetails(callback) {
  // Check if local storage is supported
  if (chrome.storage) {
    // Retrieve WiFi details from local storage
    chrome.storage.local.get("wifiDetails", (result) => {
      const wifiDetails = result.wifiDetails || {};
      callback(wifiDetails);
    });
  } else {
    console.error("Local storage not supported.");
    callback({});
  }
}
