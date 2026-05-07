import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";

// Pages
import Home from "@/pages/Home";
import CasinoBonuses from "@/pages/CasinoBonuses";
import BettingSites from "@/pages/BettingSites";
import Country from "@/pages/Country";
import Privacy from "@/pages/Privacy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import ResponsibleGambling from "@/pages/ResponsibleGambling";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Offers from "@/pages/Offers";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/casino-bonuses" component={CasinoBonuses} />
        <Route path="/betting-sites" component={BettingSites} />
        <Route path="/country/:code" component={Country} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/responsible-gambling" component={ResponsibleGambling} />
        <Route path="/offers" component={Offers} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
