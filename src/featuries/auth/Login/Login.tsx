import { PATH } from "../../../common/constans/path";
import { Input } from "../../../common/components/Input/Input";
import eye from "../../../assets/eye.svg";
import { CheckBox } from "../../../common/components/CheckBox/CheckBox";
import { Button } from "../../../common/components/Button/Button";
import { FormWrapper } from "../../../common/components/Form/FormWrapper/FormWrapper";
import s from "../../../common/components/Form/FormWrapper/FormWrapper.module.scss";
import { formHandler } from "../../../common/utils/FormHandler";
import { useAppDispatch } from "../../../common/hooks/AppDispatch";
import { loginTC } from "../authSlice";
import { useAppSelector } from "../../../common/hooks/AppSelector";
import { Navigate } from "react-router-dom";
import { isAllOf } from "@reduxjs/toolkit";

export type FormLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { errorEmail, errorPassword, handleSubmit, isValid, register, reset } =
    formHandler("email", "password");
  const onSubmit = (data: any) => {
    dispatch(loginTC(data));
    reset();
  };

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <FormWrapper
      title={"Sign In"}
      forgot={true}
      recoveryPath={PATH.RECOVERY}
      questionText={"Do not have an account?"}
      linkPath={PATH.REGISTER}
      linkTitle={"Sign Up"}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={"email"}
          label={"Email"}
          placeholder={"example@gmail.com"}
          register={register}
          error={errorEmail}
          nameForValidate={"email"}
        />

        <Input
          type={"password"}
          label={"Password"}
          altForIcon={"show password"}
          placeholder={"example12"}
          icon={eye}
          register={register}
          error={errorPassword}
          nameForValidate={"password"}
        />
        <CheckBox
          label={"Remember Me"}
          nameForValidate={"rememberMe"}
          register={register}
        />
        <Button isValid={isValid} title={"Sign In"} type={"submit"}></Button>
      </form>
    </FormWrapper>
  );
};
