import {
  GiChestArmor,
  GiBiceps,
  GiShoulderArmor,
  GiLeg,
  GiBackPain,
  GiAbdominalArmor,
} from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";

export default function Sidebar({ setBodyPart, activePart }) {
  const parts = [
    { name: "chest", icon: <GiChestArmor size={22} /> },
    { name: "back", icon: <GiBackPain size={22} /> },
    { name: "shoulders", icon: <GiShoulderArmor size={22} /> },
    { name: "biceps", icon: <GiBiceps size={22} /> },
    { name: "triceps", icon: <FaDumbbell size={22} /> },
    { name: "legs", icon: <GiLeg size={22} /> },
    { name: "abdominals", icon: <GiAbdominalArmor size={22} /> },
  ];

  return (
    <aside className="bg-white shadow-md w-20 sm:w-56 p-4 flex flex-col items-center sm:items-start border-r border-gray-200">
      <h2 className="hidden sm:block text-lg font-semibold mb-6 text-blue-700">
        Menu :p
      </h2>

      <ul className="space-y-3 w-full">
        {parts.map((part) => (
          <li
            key={part.name}
            onClick={() => setBodyPart(part.name)}
            className={`flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-blue-100 transition ${
              activePart === part.name ? "bg-blue-200" : ""
            }`}
          >
            {part.icon}
            <span className="hidden sm:inline capitalize">{part.name}</span>
          </li>
        ))}
      </ul>
      <br />
    <h2 className="hidden sm:block text-lg font-semibold mb-6 text-blue-700">
        My exercises
      </h2>

    </aside>
  );
}
