import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {store} from "./app/store.ts";

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
