import type { APIRoute } from 'astro';

export const prerender = false;

const MCP_DOCS_URL = 'https://mcp.santiago-jv.tech/docs';

// Handles both `/mcp` and `/mcp/*` with a temporary 307 redirect to the public MCP docs.
export const ALL: APIRoute = () =>
  new Response(null, {
    status: 307,
    headers: {
      Location: MCP_DOCS_URL,
      'Cache-Control': 'public, max-age=300',
    },
  });
