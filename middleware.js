export default function middleware(req) {
  const url = new URL(req.url);
  const cookie = req.headers.get('cookie') || '';
  
  // 1. if they use the password, give them the cookie and send them to the proxy
  if (url.searchParams.get('pw') === 'science123') {
    const response = new Response(null, { status: 302, headers: { 'Location': '/active/' } });
    response.headers.append('Set-Cookie', 'authorized=true; Path=/; Max-Age=86400; SameSite=Lax');
    return response;
  }

  // 2. if they have the cookie, let them stay in /active/
  if (cookie.includes('authorized=true')) {
    return; 
  }

  // 3. let the background assets load so the page doesn't look broken
  if (url.pathname.startsWith('/active/uv/') || url.pathname.includes('favicon')) {
    return;
  }

  // 4. everyone else gets the "noisy" screen
  return new Response('<html><body style="background:#000;color:#0f0;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;"><h1>Uh Oh! It seems like you cant stop being noisy!</h1></body></html>', {
    status: 403,
    headers: { 'Content-Type': 'text/html' },
  });
}

export const config = { matcher: '/((?!api|_next/static|_next/image).*)' };
