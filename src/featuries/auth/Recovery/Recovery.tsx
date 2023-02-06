import React from "react";
import { useAppDispatch } from "../../../common/hooks/AppDispatch";
import { formHandler } from "../../../common/utils/FormHandler";
import { loginTC } from "../authSlice";
import { PATH } from "../../../common/constans/path";
import { FormWrapper } from "../../../common/components/Form/FormWrapper/FormWrapper";
import s from "../../../common/components/Form/FormWrapper/FormWrapper.module.scss";
import { Input } from "../../../common/components/Input/Input";
import { Button } from "../../../common/components/Button/Button";

export const Recovery = () => {
  const discriptionText =
    "Enter your email address and we will send you further instructions";

  const dispatch = useAppDispatch();

  const { errorEmail, handleSubmit, isValid, register, reset } = formHandler();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormWrapper
      title={"Forgot your password?"}
      recoveryPath={PATH.RECOVERY}
      questionText={"Did you remember your password??"}
      linkPath={PATH.LOGIN}
      linkTitle={"Try logging in"}
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
        {discriptionText}
        <Button
          isValid={isValid}
          title={"Send Instructions"}
          type={"submit"}
        ></Button>
      </form>
    </FormWrapper>
  );
};
