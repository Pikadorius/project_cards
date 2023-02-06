import React from "react";
import { CircularProgress } from "@mui/material";
import s from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
