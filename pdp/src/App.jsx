import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import "remixicon/fonts/remixicon.css"

const Header = React.lazy(() =>
  import("home/Header").catch(() => import("./FallBackComponent"))
);
const Footer = React.lazy(() =>
  import("home/Footer").catch(() => import("./FallBackComponent"))
);
import SafeComponent from "./SafeComponent";
import { PDPContent } from "./PDPContent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <div className="text-3xl mx-auto max-w-6xl">
      <SafeComponent>
        <Suspense fallback={<div>Loading data...</div>}>
          <Header />
          <div className="my-10">
            <Switch>
              <Route path="/product/:id" component={PDPContent} />
            </Switch>
          </div>
          <Footer />
        </Suspense>
      </SafeComponent>
    </div>
  </Router>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
