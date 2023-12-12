import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import httpClient from "../../helpers/RequestInterceptor";

export default function CreateUserForm({ onClose, setMessage }) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    username: yup.string().required("Username Name is required"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    emailAddress: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid!")
      .required(),
    role: yup.string(),
    permission: yup.string().required("Permissions are required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters!")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required("Passwords Don't Match!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (payload) => {
    const { confirm_password, firstname, lastname, ...userData } = payload;
    const name = `${firstname} ${lastname}`;

    const userDataToSend = {
      ...userData,
      name,
    };

    const url = "users/onboarduser/single";
    httpClient
      .post(url, userDataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMessage("Terminal Created Successfully");
        // console.log("res", response);
        onClose();
      })
      .catch(function (error) {
        console.log("Error processing request", error);
        setMessage(error?.response?.data?.responseMessage);
        onClose();
      });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-center">Create A New User</h6>
      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="emailAddress">
            Email:
          </label>
          <input
            className={`form-control ${
              errors.emailAddress ? "is-invalid" : ""
            }`}
            type="email"
            id="email"
            {...register("emailAddress")}
          />
          {errors.emailAddress && (
            <small className="error-text">{errors.emailAddress.message}</small>
          )}
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            type="username"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <small className="error-text">{errors.username.message}</small>
          )}
        </div>

        <div className="col-6 mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            className={
              errors.phoneNumber ? "form-control error" : "form-control"
            }
            type="tel"
            id="phone"
            placeholder="+234 (XXXXXXXXXX)"
            // pattern="+234(XXXXXXXXXX)"
            {...register("phoneNumber")}
          />
          <div>
            <small>{errors.phoneNumber?.message}</small>
          </div>
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="firstname">
            First Name:
          </label>
          <input
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            type="text"
            id="firstname"
            {...register("firstname")}
          />
          {errors.firstname && (
            <small className="error-text">{errors.firstname.message}</small>
          )}
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="lastname">
            Last Name:
          </label>
          <input
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            type="text"
            id="lastname"
            {...register("lastname")}
          />
          {errors.lastname && (
            <small className="error-text">{errors.lastname.message}</small>
          )}
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <small className="error-text">{errors.password.message}</small>
          )}
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="confirm-password">
            Password:
          </label>
          <input
            className={`form-control ${
              errors.confirm_password ? "is-invalid" : ""
            }`}
            type="password"
            id="confirm-password"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <small className="error-text">
              {errors.confirm_password.message}
            </small>
          )}
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="role">
            Role:
          </label>
          <input
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
            type="text"
            id="role"
            {...register("role")}
          />
        </div>

        <div className="col-6 mb-3">
          <label className="form-label" htmlFor="permission">
            Permissions:
          </label>
          <input
            className={`form-control ${errors.permission ? "is-invalid" : ""}`}
            type="text"
            id="permission"
            {...register("permission")}
          />
          {errors.permission && (
            <small className="error-text">{errors.permission.message}</small>
          )}
        </div>
      </div>

      <div>
        <button className="btn mt-4" type="submit">
          Submit
        </button>
        <button className="btn btn--alt" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
