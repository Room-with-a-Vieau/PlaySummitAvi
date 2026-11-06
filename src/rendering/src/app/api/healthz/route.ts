/**
 * Health check for hosting platforms. /healthz rewrites to this route.
 */
export const dynamic = 'force-dynamic';

export const GET = () => new Response('Healthy', { status: 200 });
