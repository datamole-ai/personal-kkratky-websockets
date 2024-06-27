import ArrowPointer from "./arrow-pointer.svg";

type Props = {
  x: number;
  y: number;
  username: string;
  color: string;
};

export const Pointer = (props: Props) => {
  const { x, y, username, color } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
      }}
    >
      <img
        src={ArrowPointer}
        alt="Pointer"
        style={{
          width: "20px",
          height: "20px",
        }}
      />
      <div
        style={{
          marginLeft: "10px",
          color: "white",
          backgroundColor: color,
          padding: "5px 10px",
          borderRadius: "50px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {username}
      </div>
    </div>
  );
};
