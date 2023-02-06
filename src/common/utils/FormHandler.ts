import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const formHandler = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("No email provided")
      .email("Incorrect email")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Incorrect email"
      ),
    password: Yup.string()
      .required("No password provided")
      .matches(/(?=.*\d)(?=.*[a-z]).{8,}/, "Incorrect password"),
    confirmPwd: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords does not match"
    ),
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(formSchema), mode: "onTouched" });

  const errorEmail = errors.email ? String(errors.email.message) : undefined;
  const errorPassword = errors.password
    ? String(errors.password.message)
    : undefined;
  const errorConfirmPwd = errors.confirmPwd
    ? String(errors.confirmPwd.message)
    : undefined;

  return {
    register,
    handleSubmit,
    reset,
    isValid,
    errorEmail,
    errorPassword,
    errorConfirmPwd,
  };
};

export const formHandlerRec = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("No email provided")
      .email("Incorrect email")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Incorrect email"
      ),
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(formSchema), mode: "onTouched" });

  const errorEmail = errors.email ? String(errors.email.message) : undefined;

  return {
    register,
    handleSubmit,
    reset,
    isValid,
    errorEmail,
  };
};
