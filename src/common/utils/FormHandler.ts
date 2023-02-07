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
  Object.entries(schemaParam).forEach((el, i) =>
    el.includes(keys[i]) ? (param[el[0]] = el[1]) : null
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
    keys,
  };
};

// export const formHandlerRec = () => {
//   const formSchema = Yup.object().shape({
//     email: Yup.string()
//       .required("No email provided")
//       .email("Incorrect email")
//       .min(6, "Incorrect email"),
//   });
//
//   const {
//     register,
//     formState: { errors, isValid },
//     handleSubmit,
//     reset,
//   } = useForm({ resolver: yupResolver(formSchema), mode: "onTouched" });
//
//   const errorEmail = errors.email ? String(errors.email.message) : undefined;
//
//   return {
//     register,
//     handleSubmit,
//     reset,
//     isValid,
//     errorEmail,
//   };
// };
//
// export const formHandlerPass = () => {
//   const formSchema = Yup.object().shape({
//     password: Yup.string()
//       .required("No password provided")
//       .matches(/(?=.*\d)(?=.*[a-z]).{8,}/, "Incorrect password"),
//   });
//
//   const {
//     register,
//     formState: { errors, isValid },
//     handleSubmit,
//     reset,
//   } = useForm({ resolver: yupResolver(formSchema), mode: "onTouched" });
//
//   const errorPassword = errors.password
//     ? String(errors.password.message)
//     : undefined;
//
//   return {
//     register,
//     handleSubmit,
//     reset,
//     isValid,
//     errorPassword,
//   };
// };
