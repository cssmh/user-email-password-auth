import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [error, setError] = useState("");
  const emailRef = useRef(null)

  const handleFormButton = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setLoggedUser(null);
    setError("");

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

  const handleForgotPassword = () => {
    const getEmail = emailRef.current.value;
    if(!getEmail){
      alert("insert your email first")
      return;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getEmail)){
      alert("insert a valid email")
      return;
    }

    // send validation email, forgot email
    sendPasswordResetEmail(auth, getEmail)
    .then(()=> {
      console.log("Password reset email sent!");
    })
    .catch(err => {
      console.log(err.message);
    })
  }

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
                ref={emailRef}
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
                <a
                  onClick={handleForgotPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center mt-1">
            New Here?{" "}
            <span className="text-green-600">
              <Link to={"/reg"}>Sign up</Link>
            </span>
          </p>
          <div className="text-center my-3">
            {loggedUser && (
              <div>
                <p>{loggedUser.email}</p>
                <p className="text-green-500">Login Successful</p>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
