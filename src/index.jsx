import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/dashboard";
import Callback from "./routes/callback";
import Test from "./routes/dashboard/test";
import Page404 from "./routes/404";
import Daily from "./routes/dashboard/@me/daily";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="dashboard/@me" element={<Dashboard />} />
        <Route exact path="dashboard/@me/daily" element={<Daily />} />
        <Route exact path="dashboard/:guildId/test" element={<Test />} />
        <Route path="callback" element={<Callback />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);