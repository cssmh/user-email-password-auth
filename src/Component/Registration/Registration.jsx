const Registration = () => {
  return (
    <div className="bg-gray-200 my-8 max-w-2xl mx-auto text-center py-16 rounded-sm">
      <form>
        <input className="w-2/3 py-2 px-3 rounded-md" type="email" name="email" placeholder="Email" id="" />
        <br></br>
        <br></br>
        <input className="w-2/3 py-2 px-3 rounded-md" type="password" name="password" placeholder="Password" id="" />
        <br></br>
        <button className="btn mt-5 w-2/3 bg-green-400 text-white">SignUp</button>
      </form>
    </div>
  );
};

export default Registration;
