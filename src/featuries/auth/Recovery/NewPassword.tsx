import React from "react";
import { useAppDispatch } from "../../../common/hooks/AppDispatch";
import { formHandler } from "../../../common/utils/formHandler";
import { FormWrapper } from "../../../common/components/Form/FormWrapper/FormWrapper";
import { PATH } from "../../../common/constans/path";
import s from "../../../common/components/Form/FormWrapper/FormWrapper.module.scss";
import { Input } from "../../../common/components/Input/Input";
import { Button } from "../../../common/components/Button/Button";
import eye from "../../../assets/eye.svg";

export const NewPassword = () => {
  const discriptionText =
    "Create new password and we will send you further instructions to email";

  const dispatch = useAppDispatch();

  const { errorPassword, handleSubmit, isValid, register } =
    formHandler("password");
  const onSubmit = (data: any) => {
    const { newPassword } = data;
    console.log(data, newPassword);
  };

  return (
    <FormWrapper title={"Create new password"} recoveryPath={PATH.NEW_PASSWORD}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
        {discriptionText}
        <Button isValid={isValid} title={"New password"} type={"submit"} />
      </form>
    </FormWrapper>
  );
};
