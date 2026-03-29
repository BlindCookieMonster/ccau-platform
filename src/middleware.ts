import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Device API endpoints use API key auth, not Clerk
const isDeviceRoute = createRouteMatcher(["/api/devices(.*)"]);

// S3 webhook doesn't need Clerk auth
const isWebhookRoute = createRouteMatcher(["/api/webhooks(.*)"]);

// Portal and admin routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/projects(.*)",
  "/admin(.*)",
  "/api/admin(.*)",
  "/api/projects(.*)",
  "/api/images(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip Clerk auth for device and webhook routes
  if (isDeviceRoute(req) || isWebhookRoute(req)) {
    return;
  }

  // Protect portal and admin routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
