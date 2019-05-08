import * as React from "react";

import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Test from "./Pages/Test";

// components
const OnSWupdate = React.lazy(() =>
  import("./Components/ServiceWorker_PopUps/OnUpdate")
);
const OnSWsuccess = React.lazy(() =>
  import("./Components/ServiceWorker_PopUps/OnSuccess")
);
const OnNoInternet = React.lazy(() =>
  import("./Components/ServiceWorker_PopUps/OnNoInternet")
);

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const [SWstate, setSWstate] = React.useState("");
  const handleServiceWorkerInfo = (e: any) => {
    setSWstate(e.detail);
  };
  window.addEventListener("serviceWorker", handleServiceWorkerInfo, true);
  const SWpopUp = (type: string) => {
    switch (type) {
      case "success":
        return (
          <React.Suspense fallback={"...loading"}>
            <OnSWsuccess />
          </React.Suspense>
        );
      case "updated":
        return (
          <React.Suspense fallback={"...loading"}>
            <OnSWupdate />
          </React.Suspense>
        );
    }
  };
  const toReturn = () => {
    return process.env.NODE_ENV === "production" ? (
      <BrowserRouter>
        {SWstate === "" ? null : SWpopUp(SWstate)}
        {navigator.onLine ? null : (
          <React.Suspense fallback={"...loading"}>
            <OnNoInternet />
          </React.Suspense>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    ) : (
      <HashRouter>
        {SWstate === "" ? null : SWpopUp(SWstate)}
        {navigator.onLine ? null : (
          <React.Suspense fallback={"...loading"}>
            <OnNoInternet />
          </React.Suspense>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </HashRouter>
    );
  };
  return toReturn();
};

export default App;
