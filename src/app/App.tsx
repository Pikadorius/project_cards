import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./Header/Header";
import Pages from "./Pages/Pages";
import { authMeTC } from "../featuries/auth/authSlice";
import { useAppDispatch } from "../common/hooks/AppDispatch";
import SimpleSnackbar from "../common/components/SnackBar/Snackbar";
import { useAppSelector } from "../common/hooks/AppSelector";
import Loader from "../common/components/Loader/Loader";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  useEffect(() => {
    dispatch(authMeTC());
  }, []);

  if (!isInitialized) {
    return <Loader />;
  }
  return (
    <div className="app">
      <Header />
      <Pages />
      <SimpleSnackbar />
    </div>
  );
}

export default App;
