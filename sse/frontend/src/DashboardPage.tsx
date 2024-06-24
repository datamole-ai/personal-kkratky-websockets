import toast from "react-hot-toast";
import { useEffect } from "react";
import { ENDPOINT } from "./const";

const DashboardPage = () => {
  useEffect(() => {
    const sse = new EventSource(ENDPOINT + "/notifications");

    sse.onmessage = (e) => {
      toast.success(JSON.parse(e.data).description);
    };
    sse.onerror = () => {
      toast.error("An error occurred");

      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events React example</h1>
      <h1>Dashboard</h1>
      <p>
        This is a simple example of using Server-Sent Events with React. You
        should see notification when a new user is registered.
      </p>
      <a href="/register" target="_blank">
        Create new user
      </a>
    </div>
  );
};

export { DashboardPage };
