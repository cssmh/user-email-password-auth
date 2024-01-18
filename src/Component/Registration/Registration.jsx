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
    const acceptTerms = e.target.terms.checked;
    console.log(email, password, acceptTerms);
    setDisplayDetails([]);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Please insert at least 6 length password or more!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Must one Uppercase letter");
      return;
    } else if (!acceptTerms) {
      setError("Please accept our terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setDisplayDetails(res.user);
        setSuccess("User created Successfully!");
      })
      .catch((errorFirebase) => {
        console.log(errorFirebase.message);
        setError(errorFirebase.message);
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gray-200 my-8 text-center pb-12 pt-[55px] rounded-sm">
        <div className="mx-12">
          <form onSubmit={handleRegButton}>
            <input
              className="w-full py-3 px-3 rounded-md outline-none"
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
                className="w-full py-3 px-3 rounded-md outline-none"
                type={passwordClass ? "text" : "password"}
                name="password"
                placeholder="Password"
                id="2"
                required
              />
              <span
                onClick={() => setPasswordClass(!passwordClass)}
                className="absolute top-4 right-3"
              >
                {passwordClass ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            <div className="my-3 text-left ml-1">
              <input type="checkbox" name="terms" id="" />
              <label className="ml-1" htmlFor="terms">
                Accept our <a href="/">Terms & conditions!</a>
              </label>
            </div>
            <button className="btn w-full bg-green-400 text-white">
              SignUp
            </button>
          </form>
        </div>
      </div>
      <div>
        {displayDetails && <p>{displayDetails.email}</p>}{" "}
        <p className="text-green-500">{success}</p>
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Registration;
