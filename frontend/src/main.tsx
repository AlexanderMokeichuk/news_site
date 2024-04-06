import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
