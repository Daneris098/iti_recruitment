import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@src/index.css";
import '@mantine/charts/styles.css';
import { TailwindIndicator } from "@src/components/tailwind-indicator"


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <React.StrictMode>
    <MantineProvider theme={theme}>
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <App />
          <TailwindIndicator />
        </QueryClientProvider>
      </React.Fragment>
    </MantineProvider>
  </React.StrictMode>
);
