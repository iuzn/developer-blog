import { useState } from "react";
import axios from "axios";

const Newsletter = () =>  {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/newsletter", { email });
      setState("SUCCESS");
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("ERROR");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 m-10 bg-color-secondary rounded-large">
      <h2 className="text-3xl font-bold text-center color-secondary">
        E-bültenime abone ol!
      </h2>
      <p className="mt-2 w-4/5 text-center leading-relaxed color-secondary">
        En son yazdığım blog yazılarından haberdar olmak için e-postanızı girin.
      </p>
      <form className="flex border-secondary bg-color-primary  sm:block mt-6 rounded-full ">
        <input
          className="py-3 px-3 border-none bg-transparent w-48 sm:w-64 focus:ring-0 focus:outline-none"
          type="text"
          placeholder="E-posta Girin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><input type="button" value="Abone ol"
          onClick={subscribe} className="button-primary rounded text-white py-3 px-6 cursor-pointer"/>
      </form>
      {state === "ERROR" && (
        <p className="w-1/2 mt-2 text-red-600">{errorMessage}</p>
      )}
      {state === "SUCCESS" && (
        <p className="w-1/2 mt-2 text-green-600">Başarılı!</p>
      )}
    </div>
  );
};

export default Newsletter