import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"

import { getContext } from "./integrations/tanstack-query/root-provider"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient: context.queryClient,
    // dehydrateOptions: {
    //   shouldDehydrateQuery: (query) => query.meta?.ssr !== false,
    // },
    // hydrateOptions: {
    //   defaultOptions: {
    //     queries: {
    //       gcTime: 60_000,
    //     },
    //   },
    // },
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
