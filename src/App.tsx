import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import SideNav from "./components/SideNav/SideNav";

import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import NotFound from "./pages/NotFound";
// import Sandbox from "./pages/sandbox/Sandbox";
import ActionApproveLeave from "./pages/ActionApproveLeave";
import ActionRejectLeave from "./pages/ActionRejectLeave";
import Patient from "./pages/patient/Patient";
import PatientDetails from "./pages/patient/PatientDetails";
import CreatePatient from "./pages/patient/CreatePatient";
import RPA from "./pages/Rpa";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const ClaimMain = lazy(() => import("./pages/claim/ClaimMain"));
const Claims = lazy(() => import("./pages/claim/Claims"));
const ClaimsApproval = lazy(() => import("./pages/claim/ClaimsApproval"));
const ClaimsSubmission = lazy(() => import("./pages/claim/ClaimsSubmission"));
const LeaveMain = lazy(() => import("./pages/leave/LeaveMain"));
const Leaves = lazy(() => import("./pages/leave/Leaves"));
const LeaveApproval = lazy(() => import("./pages/leave/LeaveApproval"));
const LeaveApplication = lazy(() => import("./pages/leave/LeaveApplication"));
const ActionRejectClaim = lazy(() => import("./pages/ActionRejectClaim"));
const ActionApproveClaim = lazy(() => import("./pages/ActionApproveClaim"));

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="claims/externalaction/approve/:actionRef?"
          element={<ActionApproveClaim />}
        />
        <Route
          path="claims/externalaction/reject/:actionRef?"
          element={<ActionRejectClaim />}
        />
        <Route
          path="leaves/externalaction/approve/:actionRef?"
          element={<ActionApproveLeave />}
        />
        <Route
          path="leaves/externalaction/reject/:actionRef?"
          element={<ActionRejectLeave />}
        />
        <Route
          path="main"
          element={
            <RequireAuth>
              <SideNav />
            </RequireAuth>
          }
        >
          <Route path="rpa" element={<RPA />} />

          <Route
            path="patient"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <Patient />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="patient/patient-details"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <PatientDetails />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="patient/create-patient"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <CreatePatient />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            index
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <Home />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="claim/claim-main"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <ClaimMain />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="claim/my-claim"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <Claims />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="claim/my-approval-claim"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <ClaimsApproval />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="claim/my-claim/claim-submission"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <ClaimsSubmission />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="claim/my-approval-claim/claim-details"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <ClaimsSubmission />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="leave/leave-main"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <LeaveMain />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="leave/my-leaves"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <Leaves />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="leave/my-approval-leaves"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <LeaveApproval />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="leave/my-leaves/leave-application"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <LeaveApplication />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="leave/my-approval-leaves/leave-application"
            element={
              <Suspense fallback={<CircularProgress />}>
                <RequireAuth>
                  <LeaveApplication />
                </RequireAuth>
              </Suspense>
            }
          />
        </Route>

        {/* <Route path="sandbox" element={<Sandbox />} /> */}
      </Routes>
    </AuthProvider>
  );
}
export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
