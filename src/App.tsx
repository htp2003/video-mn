import React, { Children } from "react";
import { AppProvider } from "./providers/app-provider";
import { AppRouter } from "./routes";

import "./index.css";

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
