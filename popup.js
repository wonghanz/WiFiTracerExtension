chrome.networking.onConnect.addListener(function (details) {
  const wifiDetails = document.getElementById("wifiDetails");
  
  const ssid = details.networkInfo.SSID;
  const signalStrength = details.networkInfo.signalStrength + " dBm";
  const securityType = details.networkInfo.security;
  const macAddress = details.networkInfo.BSSID;

  wifiDetails.innerHTML = `
    <p>SSID: ${ssid}</p>
    <p>Signal Strength: ${signalStrength}</p>
    <p>Security Type: ${securityType}</p>
    <p>MAC Address: ${macAddress}</p>
  `;
});
