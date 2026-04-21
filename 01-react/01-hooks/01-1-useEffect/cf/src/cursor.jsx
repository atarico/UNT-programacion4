import { useEffect, useState } from "react";

export default function Cursor() {
  const [border, setBorder] = useState("border-green-600");
  useEffect(() => {
    setTimeout(() => setBorder("border-blue-600"), 200);
  }, []);

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    document.addEventListener("mousemove", handler);

    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, []);

  return (
    <div
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`${border} z-[-1] -top-10 -left-10 bg-gray-800 absolute w-20 h-20 border-2 rounded-full transition-[border] duration-200`}
    ></div>
  );
}
