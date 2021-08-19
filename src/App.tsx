import "./App.css";
import { useAuth } from "context/auth-context";
// import AuthenticatedApp from "authenticated-app";
// import UnauthenticatedApp from "unauthenticated-app";
import ErrorBoundary from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React from "react";
const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/* 代码分割，按需加载 */}
        <React.Suspense fallback={FullPageLoading}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
