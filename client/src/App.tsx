import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Metrics from "./pages/Metrics";
import Ideas from "./pages/Ideas";
import Admin from "./pages/Admin";
import Transparency from "./pages/Transparency";
import Governance from "./pages/Governance";
import FounderProfile from "./pages/FounderProfile";
import FounderHero from "./pages/FounderHero";
import AITrainingHub from "./pages/AITrainingHub";
import ContributionPlanGenerator from "./pages/ContributionPlanGenerator";
import LanguageLearning from "./pages/LanguageLearning";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/metrics"} component={Metrics} />
      <Route path={"/ideas"} component={Ideas} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/transparency"} component={Transparency} />
      <Route path={"/governance"} component={Governance} />
      <Route path={"/founder"} component={FounderProfile} />
      <Route path={"/founder-hero"} component={FounderHero} />
      <Route path={"/ai-training"} component={AITrainingHub} />
      <Route path={"/contribution-plan"} component={ContributionPlanGenerator} />
      <Route path={"/language-learning"} component={LanguageLearning} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
