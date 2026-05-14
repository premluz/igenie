import { Search, Home, Activity, Compass, Database, Box, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsightListingPage } from "./components/InsightListingPage";
import { InsightDetail } from "./components/InsightDetail";
import { AskPresto } from "./components/AskPresto";
import { useAgentStore } from "./store/useAgentStore";

export default function App() {
  const { selectedInsight } = useAgentStore();

  return (
    <div className="dark flex h-screen w-full bg-background text-foreground font-sans overflow-hidden">
      {/* LEFT SIDEBAR NAVIGATION */}
      <nav className="w-14 border-r border-border bg-card/50 flex flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold text-lg mb-2">
          G
        </div>
        <div className="flex flex-col space-y-4 text-muted-foreground">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md">
            <Search size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md">
            <Home size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-md text-foreground bg-accent"
          >
            <Activity size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md">
            <Compass size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md">
            <Database size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md">
            <Box size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md">
            <BarChart3 size={16} />
          </Button>
        </div>
      </nav>

      {/* MAIN CONTENT - Pages */}
      {selectedInsight ? <InsightDetail /> : <InsightListingPage />}

      {/* RIGHT PANEL: PRESTO ASSISTANT */}
      <AskPresto />
    </div>
  );
}