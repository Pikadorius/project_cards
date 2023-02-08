import React, { useState } from "react";
import s from "./EditableSpan.module.scss";
import pen from "../../../assets/pen.svg";
import submit from "../../../assets/submit.svg";
import { formHandler } from "../../utils/formHandler";
import { useAppDispatch } from "../../hooks/AppDispatch";
import { FieldValues } from "react-hook-form";
import { updateNameTC } from "../../../featuries/auth/authSlice";

type EditableSpanType = {
  value: string;
  onChange?: (newValue: string) => void;
};

const EditableSpan: React.FC<EditableSpanType> = ({ value }) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const { errorName, register, reset, isValid, handleSubmit } =
    formHandler("name");
  const onSubmit = (data: FieldValues) => {
    dispatch(updateNameTC(data.name));
    setEditMode(false);
    reset();
  };

  return isEditMode ? (
    <div className={s.inputWrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.labelInput}>
          Nickname
          <input
            {...register("name")}
            className={errorName ? `${s.input} ${s.errorInput}` : s.input}
          />
          <button disabled={!isValid} type={"submit"} className={s.confirmName}>
            <img className={s.updateIcon} src={submit} alt="submit icon" />
          </button>
        </label>
      </form>
      {errorName && <div className={s.errorName}>{errorName}</div>}
    </div>
  ) : (
    <div className={s.userNameContainer}>
      <h3 className={s.userName}>{value}</h3>
      <img
        onClick={() => setEditMode(true)}
        className={s.iconPen}
        src={pen}
        alt="icon pen for redaction name"
      />
    </div>
  );
};

export default EditableSpan;
