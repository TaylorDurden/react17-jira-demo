import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { calculate } from "entry";
import { ProjectListScreen } from "page/project";
import { LoginScreen } from "page/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "page/unauthenticated-app";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
