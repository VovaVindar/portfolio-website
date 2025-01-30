export function supportsHEVCAlpha() {
  // Check if window and navigator are available
  if (
    typeof window === "undefined" ||
    typeof window.navigator === "undefined"
  ) {
    return false;
  }

  const navigator = window.navigator;
  const ua = navigator.userAgent.toLowerCase();
  const hasMediaCapabilities = !!(
    navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
  );
  const isSafariOrIOS =
    (/safari/.test(ua) && !/chrome/.test(ua) && /version\//.test(ua)) ||
    /iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  return isSafariOrIOS && hasMediaCapabilities;
}
