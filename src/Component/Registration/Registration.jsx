import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.comfig";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Registration = () => {
  const [success, setSuccess] = useState("");
  const [displayDetails, setDisplayDetails] = useState([]);
  const [error, setError] = useState("");
  const [passwordClass, setPasswordClass] = useState(false);

  const handleRegButton = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setDisplayDetails([]);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Please insert at least 6 length password or more!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Must one Uppercase letter");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setDisplayDetails(res.user);
        setSuccess("Login Successful!");
      })
      .catch((errorFirebase) => {
        console.log(errorFirebase.message);
        setError(errorFirebase.message);
      });
  };

  return (
    <div>
      <div className="bg-gray-200 my-8 max-w-2xl mx-auto text-center py-16 rounded-sm">
        <form onSubmit={handleRegButton}>
          <input
            className="w-2/3 py-2 px-3 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            id="1"
            required
          />
          <br></br>
          <br></br>
          <div className="relative">
            <input
              className="w-2/3 py-2 px-3 rounded-md"
              type={passwordClass ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="2"
              required
            />
            <span
              onClick={() => setPasswordClass(!passwordClass)}
              className="absolute m-3"
            >
              {passwordClass ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <br></br>
          <button className="btn w-2/3 bg-green-400 text-white">
            SignUp
          </button>
        </form>
      </div>
      <div className="text-center">
        {displayDetails && <p>{displayDetails.email}</p>}{" "}
        <p className="text-green-500">{success}</p>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Registration;
