import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaParam = {
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
};

export const formHandler = (...keys: string[]) => {
  const param: any = {};
  const schemaParamEntries = Object.entries(schemaParam);
  keys.forEach((k, i) =>
    schemaParamEntries.forEach((el, i) =>
      el.includes(k) ? (param[k] = el[1]) : null
    )
  );

  const formSchema = Yup.object().shape(param);
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
