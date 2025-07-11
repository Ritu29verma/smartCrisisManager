import { useLocation, Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import Dashboard from "@/pages/dashboard";
// import NotFound from "@/pages/not-found";
import Register from "./pages/register";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";

 const PrivateRoute = ({ component: Component }) => {
  const token = sessionStorage.getItem("token");
  return token ? <Component /> : <LoginRedirect />;
};

const LoginRedirect = () => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/");
  }, []);
  return null; // Optionally show a loading spinner here
};

function Router() {
  return (
     <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={() => <PrivateRoute component={Dashboard} />} />
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
