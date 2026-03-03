export default function middleware(req) {
  const url = new URL(req.url);
  const cookie = req.headers.get('cookie') || '';

  // let internal proxy files through instantly
  if (url.pathname.includes('/uv/') || url.pathname.includes('sw.js')) {
    return;
  }

  // password check
  if (url.searchParams.get('pw') === 'science123') {
    const response = new Response(null, { status: 302, headers: { 'Location': '/active/' } });
    response.headers.append('Set-Cookie', 'authorized=true; Path=/; Max-Age=86400; SameSite=Lax');
    return response;
  }

  // check for the "wristband"
  if (cookie.includes('authorized=true')) {
    return;
  }

  // if all else fails, noisy screen
  return new Response('<html><body style="background:#000;color:#0f0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;"><h1>Uh Oh! Too noisy!</h1></body></html>', {
    status: 403,
    headers: { 'Content-Type': 'text/html' },
  });
}

export const config = { matcher: '/((?!api|_next/static|_next/image).*)' };
