import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { initAdSense } from "./lib/adsense";
import { useAnalytics } from "./hooks/use-analytics";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  // Track page views when routes change - Google Analytics integration
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google services when app loads
  useEffect(() => {
    // Initialize Google Analytics
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA();
    } else {
      console.warn('Missing Google Analytics key: VITE_GA_MEASUREMENT_ID');
    }

    // Initialize Google AdSense
    if (import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID) {
      initAdSense();
    } else {
      console.warn('Missing Google AdSense key: VITE_GOOGLE_ADSENSE_CLIENT_ID');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
