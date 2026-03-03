export default function middleware(req) {
  const url = new URL(req.url);
  const cookie = req.headers.get('cookie') || '';
  
  // let the proxy's internal guts (the video players) pass through without checking
  if (url.pathname.includes('/uv/') || url.pathname.includes('worker') || url.pathname.includes('sw.js')) {
    return; 
  }

  if (url.searchParams.get('pw') === 'science123') {
    const response = new Response(null, { status: 302, headers: { 'Location': '/active/' } });
    response.headers.append('Set-Cookie', 'authorized=true; Path=/; Max-Age=86400; SameSite=Lax');
    return response;
  }

  if (cookie.includes('authorized=true')) {
    return; 
  }

  return new Response('Uh Oh! Too noisy!', { status: 403 });
}

export const config = { matcher: '/((?!api|_next/static|_next/image).*)' };
