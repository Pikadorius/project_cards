import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./Header/Header";
import Pages from "./Pages/Pages";
import { authMeTC } from "../featuries/auth/authSlice";
import { useAppDispatch } from "../common/hooks/AppDispatch";
import { useAppSelector } from "../common/hooks/AppSelector";

function App() {
    // sddsfsdf
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authMeTC());
  }, []);
  return (
    <div className="app">
      <Header />
      <Pages />
    </div>
  );
}

export default App;
