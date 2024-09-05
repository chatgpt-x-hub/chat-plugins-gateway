import * as net from 'node:net';
import { URL } from 'node:url';

function convertToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => {
    return (acc << 8) + Number.parseInt(octet, 10);
  }, 0);
}
function isPrivateIP(ipAddress: string): boolean {
  const privateRanges: [string, string][] = [
    ['10.0.0.0', '10.255.255.255'],
    ['172.16.0.0', '172.31.255.255'],
    ['192.168.0.0', '192.168.255.255'],
  ];

  const ip = net.isIPv6(ipAddress) ? ipAddress : convertToLong(ipAddress);
  return privateRanges.some((range) => {
    const [start, end] = range.map((element) => convertToLong(element));
    return ip >= start && ip <= end;
  });
}

function isLocalNetwork(urlString: string): boolean {
  const parsedUrl = new URL(urlString);
  const hostname = parsedUrl.hostname;

  // 检查主机名是否是 'localhost' 或 '127.0.0.1'
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return true;
  }

  // 检查主机名是否是环回地址（IPv6）
  const localIPv6Addresses: string[] = ['::1'];
  if (net.isIP(hostname) && net.isIPv6(hostname) && localIPv6Addresses.includes(hostname)) {
    return true;
  }

  return false;
}

function isLocalOrPrivateNetwork(urlString: string): boolean {
  const parsedUrl = new URL(urlString);
  const hostname = parsedUrl.hostname;

  // 先检查是否是本地网络
  if (isLocalNetwork(urlString)) {
    return true;
  }

  // 然后检查是否是内网 IP
  if (net.isIP(hostname)) {
    return isPrivateIP(hostname);
  }

  return false; // 既不是本地网络，也不是内网
}

export { isLocalNetwork, isLocalOrPrivateNetwork, isPrivateIP };
