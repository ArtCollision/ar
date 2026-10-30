// Art Collision – AR auto-launch
// Runs on Netlify's edge for the home page ("/") only.
// When someone scans the QR code on the business card:
//   • iPhone / iPad (Safari, Chrome…)  -> opens the USDZ directly in AR Quick Look
//   • Android (Chrome, Samsung…)       -> opens Google Scene Viewer in AR mode
//   • Anything else (computer, in-app browsers, link previews) -> normal 3D web page
// Add "?view=1" to the address to always see the web page (used as the fallback).

const GLB = "/models/ArtCollision_Logo_AR.glb";
const USDZ = "/models/ArtCollision_Logo_AR.usdz";
const TITLE = "Art Collision";

// In-app browsers (Instagram, Facebook, LinkedIn…) usually can't launch AR,
// and link-preview robots must receive the HTML page.
const IN_APP_OR_BOT =
  /FBAN|FBAV|FB_IAB|FBIOS|Instagram|LinkedInApp|Snapchat|TikTok|musical_ly|Bytedance|Line\/|MicroMessenger|Pinterest|Twitter|bot|crawler|spider|facebookexternalhit|Slackbot|WhatsApp|TelegramBot|Discord|Embedly|preview/i;

function redirect(location) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      Vary: "User-Agent",
    },
  });
}

export default async (request) => {
  const url = new URL(request.url);
  if (url.searchParams.has("view")) return; // show the page

  const ua = request.headers.get("user-agent") || "";
  if (!ua || IN_APP_OR_BOT.test(ua)) return;

  const origin = url.origin;

  // iPhone / iPod / iPad (older iPadOS UA). Newer iPads report "Macintosh"
  // and simply get the page, whose AR button works there.
  if (/iPhone|iPod|iPad/.test(ua)) {
    return redirect(`${origin}${USDZ}`);
  }

  // Android browsers, but not Android WebViews ("; wv)") used inside apps.
  if (/Android/i.test(ua) && !/; wv\)/.test(ua)) {
    const file = encodeURIComponent(`${origin}${GLB}`);
    const fallback = encodeURIComponent(`${origin}/?view=1`);
    const intent =
      `intent://arvr.google.com/scene-viewer/1.0?file=${file}` +
      `&mode=ar_preferred&title=${encodeURIComponent(TITLE)}` +
      `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
      `action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`;
    return redirect(intent);
  }

  return; // desktop & others: serve index.html
};

export const config = { path: "/" };
