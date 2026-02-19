import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { CartProvider } from "./context/CartContext";

import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Catalogos from "./pages/Catalogos";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SocialButtons from "./components/layout/SocialButtons";

import CartDrawer from "./components/CartDrawer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/catalogos" component={Catalogos} />
      <Route path="/productos/:id" component={ProductDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <SocialButtons />
        </div>

        {/* Drawer global del carrito */}
        <CartDrawer />

        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;

