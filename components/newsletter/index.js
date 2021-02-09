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
    <div className="flex flex-col items-center mt-8">
      <h2 className="title-primary">
        E-bültenime abone ol!
      </h2>
      <p className="text-primary">
        En son yazdığım blog yazılarından haberdar olmak için e-postanızı girin.
      </p>
      <form className="border-primary form-primary">
        <input
          className="input-primary"
          type="text"
          placeholder="E-posta Girin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><input type="button" value="Abone ol"
          onClick={subscribe} className="button-primary form-button"/>
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