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
import CartContent from "./CartContent";

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <SafeComponent>
      <Suspense fallback={<div>Loading data...</div>}>
        <Header />
        <div className="my-10">
          <CartContent />
        </div>
        <Footer />
      </Suspense>
    </SafeComponent>
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
