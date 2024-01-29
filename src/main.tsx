import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import * as Sentry from "@sentry/react";
import { ReactQueryDevtools } from "react-query/devtools";
// import { setLogger } from 'react-query'

// Sentry.init({
//   dsn: "https://5d9314919253490d86cf85ab788788c6@o4505270613966848.ingest.sentry.io/4505270617374721",
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//       // tracePropagationTargets: ["localhost", `${import.meta.env.VITE_API_URL}`],
//     }),
//     new Sentry.Replay(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
      cacheTime: 1 * (60 * 1000),
      // staleTime: 1 * (60 * 100)
    },
  },
});

// setLogger({
//   log: message => {
//     Sentry.captureMessage(message)
//   },
//   warn: message => {
//     Sentry.captureMessage(message)
//   },
//   error: error => {
//     Sentry.captureException(error)
//   },
// })

const theme = createTheme({
  palette: {
    primary: {
      main: "#E66558",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#295576",
    },
    tertiary: {
      main: "#4EB8B9",
    },
    textColor: {
      main: "#252A2D",
    },
  },

  typography: {
    fontFamily: ["Lexend", "Inter"].join(","),
    h3: {
      fontFamily: "Lexend",
      color: "#295576",
      fontWeight: 600,
      fontSize: "2.25rem",
      fontStyle: "normal",
    },
    h4: {
      fontFamily: "Inter",
      color: "#295576",
      fontWeight: 400,
      fontSize: "2.25rem",
      //fontStyle: 'normal',
      lineHeight: "2.723rem",
    },
    h5: {
      fontFamily: "Lexend",
      color: "#295576",
      fontWeight: 600,
      fontSize: "1.5rem",
      fontStyle: "normal",
    },
    body1: {
      fontFamily: "Inter",
      color: "#FFFFFF",
    },
    body2: {
      fontFamily: "Inter",
      color: "#252A2D",
      fontWeight: "400",
      fontSize: "0.75rem",
    },
    h6: {
      fontFamily: "Lexend",
      color: "#FFFFFF",
      fontWeight: 600,
      fontSize: "0.75rem",
      fontStyle: "normal",
    },
    tableHeader: {
      fontFamily: "Lexend",
      color: "#295576",
      fontWeight: 600,
      fontSize: "1rem",
      fontStyle: "normal",
    },
    subtitle1: {
      fontFamily: "Inter",
      color: "#295576",
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: "Inter",
      color: "#252A2D",
      fontWeight: 400,
      lineHeight: "1.21rem",
    },
    button: {
      fontFamily: "Inter",
      textTransform: "none",
      color: "#295576",
    },
    menuLink1: {
      fontFamily: "Inter",
      color: "#4EB8B9",
      fontWeight: 400,
    },
    selectedTitle: {
      fontFamily: "Inter",
      color: "#4EB8B9",
      fontWeight: 600,
    },
    labelText1: {
      fontFamily: "Inter",
      color: "#252A2D",
      fontWeight: 400,
    },
    labelText2: {
      fontFamily: "Inter",
      color: "#252A2D",
      fontWeight: 600,
      fontSize: "1.25rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face{
          font-family: 'Lexend';
        }`,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <WrappedApp />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
