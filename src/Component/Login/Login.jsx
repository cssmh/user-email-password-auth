import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.comfig";
import { useState } from "react";
const Login = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [error, setError] = useState("");

  const handleFormButton = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setLoggedUser(null)
    setError("")

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setLoggedUser(result.user);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleFormButton} className="card-body pb-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center my-3">
            {loggedUser && (
              <div>
                <p>{loggedUser.email}</p>
                <p className="text-green-500">Login Successful</p>
              </div>
            )}
            {
              error && <p className="text-red-500">{error}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
