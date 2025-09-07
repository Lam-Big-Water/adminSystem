import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DarkModeProvider } from "./context/DarkModeContext";

import { routeMap } from "./routes/routeMap";
import ToastProvider from "./context/Toast/ToastProvider";
import ToastShelf from "./ToastShelf";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  const router = createBrowserRouter(routeMap);
  return (
    <ToastProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastShelf />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DarkModeProvider>
    </ToastProvider>
  );
};

export default App;
