import { NextResponse } from 'next/server';

// In-memory sliding window IP rate limiter (resets automatically)
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 requests per minute per IP

// Cleanup stale IP entries every 3 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestCounts.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS * 3) {
      ipRequestCounts.delete(ip);
    }
  }
}, 3 * 60 * 1000);

// Signatures of malicious attack vectors & scanners to block immediately
const MALICIOUS_PATTERNS = [
  /\.\./i,                         // Path traversal (..)
  /%2e%2e/i,                     // URL-encoded path traversal (%2e%2e)
  /\.env/i,                       // Attempt to steal environment files
  /\.git/i,                       // Attempt to steal git metadata
  /wp-(?:admin|login|includes)/i, // WordPress exploit probes
  /phpmyadmin/i,                  // phpMyAdmin scanning
  /eval-stdin\.php/i,             // PHP exploit vectors
  /actuator\/health/i,            // SpringBoot vulnerability probes
  /<script/i,                     // XSS script injection
  /javascript:/i,                 // Javascript URI injection
  /union\s+(?:all\s+)?select/i,   // SQL injection signature
  /select\s+.*\s+from/i,          // SQL injection signature
  /drop\s+table/i,                // SQL destruction
  /;\s*--/i,                      // SQL comment truncation
  /\x00/i,                        // Null byte poison
];

export default function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const method = request.method;

  // 1. HTTP Method Validation (Block unsafe/probing methods)
  const allowedMethods = ['GET', 'HEAD', 'POST', 'OPTIONS'];
  if (!allowedMethods.includes(method)) {
    return new NextResponse('HTTP Method Not Permitted', {
      status: 405,
      headers: {
        'Allow': allowedMethods.join(', '),
        'X-Security-Reason': 'Disallowed-HTTP-Method',
      },
    });
  }

  // 2. Malicious Payload & Path Traversal Inspection
  let fullTarget = '';
  try {
    const rawTarget = pathname + (search || '');
    fullTarget = decodeURIComponent(rawTarget.replace(/\+/g, ' ')).toLowerCase();
  } catch (err) {
    // Malformed URI sequence (e.g. invalid percent-encoding attack)
    console.warn(`[SECURITY FIREWALL] Blocked malformed URI request: ${pathname}`);
    return new NextResponse('Access Denied: Malformed URI Encoding Rejected by Firewall', {
      status: 400,
      headers: {
        'X-Security-Firewall': 'BLOCKED-MALFORMED-ENCODING',
      },
    });
  }

  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(fullTarget)) {
      console.warn(`[SECURITY FIREWALL] Blocked malicious request attempt: ${request.ip || 'unknown'} -> ${pathname}`);
      return new NextResponse('Access Denied: Security Violation Detected by Firewall', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Security-Firewall': 'BLOCKED-MALICIOUS-SIGNATURE',
        },
      });
    }
  }

  // 3. Sliding Window IP Rate Limiting
  const clientIp = 
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
    request.headers.get('x-real-ip') || 
    '127.0.0.1';

  // Exclude static assets and prefetch chunks from aggressive rate limiting
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.includes('.') || 
    pathname.startsWith('/favicon');

  if (!isStaticAsset) {
    const now = Date.now();
    const rateData = ipRequestCounts.get(clientIp) || { count: 0, startTime: now };

    if (now - rateData.startTime > RATE_LIMIT_WINDOW_MS) {
      rateData.count = 1;
      rateData.startTime = now;
    } else {
      rateData.count += 1;
    }
    ipRequestCounts.set(clientIp, rateData);

    if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
      console.warn(`[SECURITY FIREWALL] Rate limit exceeded for IP: ${clientIp}`);
      return new NextResponse('Rate limit exceeded: Please throttle your requests.', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil((rateData.startTime + RATE_LIMIT_WINDOW_MS) / 1000)),
        },
      });
    }
  }

  // 4. Attach Security Response Headers
  const response = NextResponse.next();
  response.headers.set('X-Security-Firewall', 'Active-Shield-v2.0');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

// Apply middleware to all routes except Next.js internal static files
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
