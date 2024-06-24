import { useState } from "react";
import toast from "react-hot-toast";
import { ENDPOINT } from "./const";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      await fetch(ENDPOINT + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });

      toast.success("Registered successfully");
    } catch (e) {
      toast.error((e as { message?: string })?.message || "An error occurred");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        gap: "0.5rem",
      }}
    >
      <h1>Registration</h1>

      <label>Username</label>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button onClick={onSubmit}>Register</button>
    </div>
  );
};

export { RegistrationPage };
