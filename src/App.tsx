import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DashboardPage from "./pages/DashboardPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import WorkflowsPage from "./pages/WorkflowsPage";
import CalculatorPage from "./pages/CalculatorPage";
import AutomationPage from "./pages/AutomationPage";
import RoadmapPage from "./pages/RoadmapPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
