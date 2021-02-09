import { useState } from "react";
import axios from "axios";
import Button from '../button';
import clsx from 'clsx';

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
    <div className="flex flex-col items-center w-full p-8 border-gray-500 border-solid border rounded-sm mt-8">
      <h2 className="text-3xl font-bold text-center">
        E-bültenime abone ol!
      </h2>
      <p className="mt-2 font-light w-4/5 text-center leading-relaxed">
        En son yazdığım blog yazılarından haberdar olmak için e-postanızı girin.
      </p>
      <div className="flex w-1/2 lg:w-2/3 justify-center mt-5 flex-col lg:flex-row">
        <input
          className="appearance-none mb-2 lg:mb-0 w-full lg:w-2/3 border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-600"
          type="text"
          placeholder="E-posta Girin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className={clsx( "lg:ml-2 p-3	 font-bold",
            state === "LOADING" ? "" : ""
          )}
          disabled={state === "LOADING"}
          onClick={subscribe}
        >
          Abone ol {state === "LOADING" && <svg className="animate-spin text-blue-500 h-5 w-5 mr-3" viewBox="0 0 24 24"/>}
        </Button>
      </div>
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