import React, { ChangeEvent, KeyboardEvent, useState } from "react";

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
    <>
      <input value={title} onChange={changeTitle} onKeyDown={onEnter} />
      <button onClick={updateName}>Save</button>
    </>
  ) : (
    <span onDoubleClick={() => setEditMode(true)}>{props.value}</span>
  );
};

export default EditableSpan;
