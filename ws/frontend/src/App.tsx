import { useEffect, useState } from "react";
import { useMousePosition } from "./hooks/useMousePosition";
import { socket } from "./utils/socket";
import { getRandomName } from "./utils/name";
import { Pointer } from "./components/Pointer";

const COLORS = [
  "#2D3047",
  "#419D78",
  "#E0A458",
  "#FFDBB5",
  "#C04ABC",
  "#E2C044",
];

type EventPayload = {
  id: string;
  username: string;
  x: number;
  y: number;
};

const App = () => {
  const mousePosition = useMousePosition();
  const [currentUser, setCurrentUser] = useState(getRandomName());
  const [userCursors, setUserCursors] = useState<{
    [user: string]: {
      username: string;
      date: number;
      x: number;
      y: number;
    };
  }>({});

  useEffect(() => {
    const onReceiveEvent = (eventPayload: EventPayload) => {
      if (eventPayload.id === socket.id) return;

      setUserCursors((prev) => {
        const filteredPrev = Object.fromEntries(
          Object.entries(prev).filter(([key, value]) => {
            const isSameUser = key === eventPayload.id;
            const isOutdated = value.date < Date.now() - 5_000;
            return !isSameUser && !isOutdated;
          })
        );

        return {
          ...filteredPrev,
          [eventPayload.id]: {
            date: Date.now(),
            username: eventPayload.username,
            x: eventPayload.x,
            y: eventPayload.y,
          },
        };
      });
    };

    socket.on("msgToClient", onReceiveEvent);

    return () => {
      socket.off("msgToClient", onReceiveEvent);
    };
  }, []);

  useEffect(() => {
    socket.emit("msgToServer", {
      id: socket.id!,
      username: currentUser,
      x: mousePosition.x,
      y: mousePosition.y,
    } satisfies EventPayload);
  }, [mousePosition, currentUser]);

  return (
    <>
      Socket ID: {socket.id}
      <br />
      <input
        type="text"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />
      {Object.entries(userCursors).map(([userID, position], index) => (
        <Pointer
          key={userID}
          x={position.x}
          y={position.y}
          username={position.username}
          color={COLORS[index % COLORS.length]}
        />
      ))}
    </>
  );
};

export default App;
