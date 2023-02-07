import React from "react";
import { FormWrapper } from "../../../common/components/Form/FormWrapper/FormWrapper";
import { useAppSelector } from "../../../common/hooks/AppSelector";
import s from "../../../app/Header/HeaderSignIn/HeaderSignIn.module.scss";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../common/constans/path";

export const CheckInfoRecovery = () => {
  const navigate = useNavigate();

  const email = useAppSelector((state) => state.auth.emailInRecovery);
  const discriptionText = `We’ve sent an Email with instructions to ${email}`;

  const onClickInInfoHandler = () => {
    // dispatch(isMessageSend({ isMessageSend: false }));
    navigate(PATH.LOGIN);
  };

  return (
    <FormWrapper title={"Check Email"}>
      <h2>IMG</h2>
      {discriptionText}
      <button className={s.btn} onClick={onClickInInfoHandler}>
        Back to login
      </button>
    </FormWrapper>
  );
};
