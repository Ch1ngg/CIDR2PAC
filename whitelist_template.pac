
/**
 * This PAC was generated by CIDR2PAC ver-0.2.3
 * Last updated at {#date}
 * More informations: https://github.com/wspl/CIDR2PAC
 */

var ipRepo = [{#ipRepo}];

function ipToLong(ip) {
  var ipl = 0;
  var ipParts = ip.split('.');
  for (var i = 0; i < ipParts.length; i += 1) {
    ipl <<= 8;
    ipl += parseInt(ipParts[i]);
  }
  return ipl >>> 0;
}

function isInside(host) {
  var testIpLong = ipToLong(dnsResolve(host));

  var startRange = 0;
  var endRange = ipRepo.length;

  var leftPot = parseInt((startRange + endRange) / 2);
  var rightPot = leftPot + 1;

  var leftLong = ipRepo[leftPot][1];
  var rightLong = ipRepo[rightPot][0];

  while (1) {
    if (testIpLong <= leftLong) {
      endRange = leftPot;
      
      var leftMin = ipRepo[leftPot][0];
      var leftMax = ipRepo[leftPot][1];
      if (testIpLong >= leftMin && testIpLong <= leftMax) {
        return true;
      }
      
      leftPot = parseInt((startRange + endRange) / 2);
      rightPot = leftPot + 1;
      leftLong = ipRepo[leftPot][1];
      rightLong = ipRepo[rightPot][0];
    } else if (testIpLong >= rightLong) {
      startRange = rightPot;
      
      var rightMin = ipRepo[rightPot][0];
      var rightMax = ipRepo[rightPot][1];
      if (testIpLong >= rightMin && testIpLong <= rightMax) {
        return true;
      }
      
      leftPot = parseInt((startRange + endRange) / 2);
      rightPot = leftPot + 1;
      leftLong = ipRepo[leftPot][1];
      rightLong = ipRepo[rightPot][0];
    } else {
      return false;
    }
  }
}

function FindProxyForURL(url, host) {
  if (isInside(host)) {
    return 'DIRECT';
  } else {
    return 'PROXY 127.0.0.1:1080';
  }
}
