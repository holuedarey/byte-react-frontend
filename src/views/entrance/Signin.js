import React from "react";
import PostData from "../../components/handleApi/PostData";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  // const [isLoading, setLoading] = useState(false);

  const url = "auth/signin";
  const data = { username: email, password: password };
  const navigate = useNavigate();


  const Login = (e) => {
    e.preventDefault();
    PostData(url, data).then((result) => {
      const { error, message } = result;
      if (error) {
        setErr(true);
        setMsg(message[0]);
        return;
      }
      navigate("/transactions");
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-white mt-5 p-4 w-50">
        <form onSubmit={Login}>
          <h1 className="text-center">Sign In</h1>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
