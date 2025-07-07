import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { queryClient } from "./lib/queryClient";
import Dashboard from "@/pages/dashboard";
// import NotFound from "@/pages/not-found";
import Register from "./pages/register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster richColors />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
