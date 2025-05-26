import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@src/index.css";
import "@mantine/charts/styles.css";
import { TailwindIndicator } from "@src/components/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./client/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <App />
          <TailwindIndicator />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.Fragment>
    </MantineProvider>
  </React.StrictMode>
);
