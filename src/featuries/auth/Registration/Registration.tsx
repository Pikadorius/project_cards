import { Input } from "../../../common/components/Input/Input";
import eye from "../../../assets/eye.svg";
import { Button } from "../../../common/components/Button/Button";
import { PATH } from "../../../common/constans/path";
import { FormWrapper } from "../../../common/components/Form/FormWrapper/FormWrapper";
import s from "../../../common/components/Form/FormWrapper/FormWrapper.module.scss";
import { formHandler } from "../../../common/utils/FormHandler";

export const Registration = () => {
  const {
    errorEmail,
    errorPassword,
    errorConfirmPwd,
    handleSubmit,
    isValid,
    register,
    reset,
  } = formHandler();
  const onSubmit = (data: any) => {
    const { email, password } = data;
    console.log({ email, password });
  };

  return (
    <FormWrapper
      linkTitle={"Sign In"}
      linkPath={PATH.LOGIN}
      title={"Sign Up"}
      questionText={"Already have an account?"}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={"email"}
          label={"Email"}
          nameForValidate={"email"}
          placeholder={"example@gmail.com"}
          register={register}
          error={errorEmail}
        />

        <Input
          type={"password"}
          label={"Password"}
          nameForValidate={"password"}
          altForIcon={"show password"}
          placeholder={"example12"}
          icon={eye}
          register={register}
          error={errorPassword}
        />

        <Input
          type={"password"}
          label={"Confirm password"}
          nameForValidate={"confirmPwd"}
          altForIcon={"show password"}
          placeholder={"********"}
          icon={eye}
          register={register}
          error={errorConfirmPwd}
        />

        <Button isValid={isValid} type={"submit"} title={"Create account"} />
      </form>
    </FormWrapper>
  );
};
