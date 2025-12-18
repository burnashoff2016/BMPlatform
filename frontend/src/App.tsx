import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import { useAuth } from "./context/AuthContext";
import DashboardPage from "./routes/DashboardPage";
import LoginPage from "./routes/LoginPage";
import TaskPage from "./routes/TaskPage";
import SettingsPage from "./routes/SettingsPage";
import FeedbackPage from "./routes/FeedbackPage";
import StackPage from "./routes/StackPage";
import MonitoringFormPage from "./routes/MonitoringFormPage";
import DigitalInclusionDFOPage from "./routes/DigitalInclusionDFOPage";
import DigitalInclusionReportPage from "./routes/DigitalInclusionReportPage";
import DigitalInclusionFullPage from "./routes/DigitalInclusionFullPage";
import DigitalInclusionMainPage from "./routes/DigitalInclusionMainPage";
import NnGorodIdeyPrototypePage from "./routes/NnGorodIdeyPrototypePage";
import NnGorodIdeyNewPrototypePage from "./routes/NnGorodIdeyNewPrototypePage";
import RegionalDigitalServicesArticle from "./routes/RegionalDigitalServicesArticle";
import KpiSuzdalArticle from "./routes/KpiSuzdalArticle";
import CrowdsourcingRoadsArticle from "./routes/CrowdsourcingRoadsArticle";
import DigitalParticipationArticle from "./routes/DigitalParticipationArticle";
import DigitalIdentityArticle from "./routes/DigitalIdentityArticle";
import SmartCitiesArticle from "./routes/SmartCitiesArticle";
import GovtechInnovationArticle from "./routes/GovtechInnovationArticle";


import DigitalEthicsArticle from "./routes/DigitalEthicsArticle";
import MobilityInterfacePage from "./routes/MobilityInterfacePage";
import SocialRadarPage from "./routes/SocialRadarPage";

const ProtectedRoute = () => {
  const { token, user, isLoading } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-600">
        Проверяем сессию...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tasks/:slug" element={<TaskPage />} />
          <Route path="tasks/monitoring-kostroma/form" element={<MonitoringFormPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="stack" element={<StackPage />} />
          <Route path="nn-gorod-idey-prototype" element={<NnGorodIdeyNewPrototypePage />} />
          <Route path="regional-digital-services" element={<RegionalDigitalServicesArticle />} />
          <Route path="tasks/kpi-suzdal" element={<KpiSuzdalArticle />} />
          <Route path="tasks/crowdsourcing-roads" element={<CrowdsourcingRoadsArticle />} />
          <Route path="tasks/digital-participation" element={<DigitalParticipationArticle />} />
          <Route path="tasks/digital-identity" element={<DigitalIdentityArticle />} />
          <Route path="tasks/smart-cities" element={<SmartCitiesArticle />} />
          <Route path="tasks/govtech-innovation" element={<GovtechInnovationArticle />} />
          <Route path="tasks/mobility-360" element={<MobilityInterfacePage />} />

          <Route path="tasks/digital-ethics" element={<DigitalEthicsArticle />} />
          <Route path="mobility-interface" element={<MobilityInterfacePage />} />
          <Route path="digital-inclusion" element={<DigitalInclusionMainPage />} />
          <Route path="tasks/digital-inclusion" element={<DigitalInclusionMainPage />} />
          <Route path="digital-inclusion-dfo" element={<DigitalInclusionDFOPage />} />
          <Route path="digital-inclusion-report" element={<DigitalInclusionReportPage />} />
          <Route path="digital-inclusion-full" element={<DigitalInclusionFullPage />} />
          <Route path="tasks/social-radar" element={<SocialRadarPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
