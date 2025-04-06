import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";

import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialButtons from "@/components/layout/SocialButtons";

function App() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/checkout" component={Checkout} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <SocialButtons />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;
