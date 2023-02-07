import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./EditableSpan.module.scss";
import pen from "../../../assets/pen.svg";
import submit from "../../../assets/submit.svg";

type EditableSpanType = {
  value: string;
  onChange: (newValue: string) => void;
};

const EditableSpan: React.FC<EditableSpanType> = (props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const updateName = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && props.onChange(title);
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return isEditMode ? (
    <div className={s.inputWrapper}>
      <label className={s.labelInput}>
        Nickname
        <input
          className={s.input}
          value={title}
          onChange={changeTitle}
          onKeyDown={onEnter}
        />
      </label>
      <img
        onClick={updateName}
        className={s.confirmName}
        src={submit}
        alt="confirm Name button"
      />
    </div>
  ) : (
    <div className={s.userNameContainer}>
      <h3 className={s.userName}>{props.value}</h3>
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
