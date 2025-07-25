import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'
const protectedRoutes=createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/meeting(.*)',
    '/personal-room'
])
export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    const { isAuthenticated, redirectToSignIn } = await auth();
    if (!isAuthenticated) {
      return redirectToSignIn();
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}