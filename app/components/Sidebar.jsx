import { useState, useEffect } from "react";
import axios from "axios";
import {
  GiChestArmor,
  GiBiceps,
  GiShoulderArmor,
  GiLeg,
  GiBackPain,
  GiAbdominalArmor,
  GiArm,
  GiHieroglyphLegs,
  GiIntricateNecklace,
  GiRobotLeg,
} from "react-icons/gi";
import { FaDumbbell, FaQuestion, FaRunning } from "react-icons/fa";
import { BsPersonArmsUp } from "react-icons/bs";
import { PiPersonFill } from "react-icons/pi";


export default function Sidebar({ setBodyPart, activePart }) {
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          headers: {
            "X-RapidAPI-Key": "4cd7af6e91msh2dd9fcacc8b4c2bp1b71b4jsn5ab10d970ec6",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        if (Array.isArray(response.data)) {
          setBodyParts(response.data);
        }
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };

    fetchBodyParts();
  }, []);

  // Map de iconos por bodyPart
  const icons = {
    chest: <GiChestArmor size={22} />,
    cardio: <FaRunning size={22}/>,
    back: <GiBackPain size={22} />,
    "lower arms": <GiArm size={22}/>,
    "lower legs": <GiHieroglyphLegs size={22}/>,
    "upper arms": <BsPersonArmsUp size={22}/>,
    "upper legs": <GiRobotLeg size={22}/>,
    waist: <PiPersonFill size={22}/>,
    neck: <GiIntricateNecklace size={22} />,
    shoulders: <GiShoulderArmor size={22} />,
    biceps: <GiBiceps size={22} />,
    triceps: <FaDumbbell size={22} />,
    legs: <GiLeg size={22} />,
    abdominals: <GiAbdominalArmor size={22} />,
  };

  return (
    <aside className="bg-white shadow-md w-20 sm:w-56 p-4 flex flex-col items-center sm:items-start border-r border-gray-200 sticky top-0 h-screen">
      <h2 className="hidden sm:block text-lg font-bold mb-6 text-blue-700 flex items-center gap-2">
        <FaDumbbell /> Menu
      </h2>

      <ul className="space-y-2 w-full">
        {bodyParts.map((part) => (
          <li
            key={part}
            onClick={() => setBodyPart(part)}
            className={`flex items-center gap-3 cursor-pointer rounded-lg p-2 transition-colors duration-200 ${
              activePart === part
                ? "bg-blue-200 text-blue-800 font-semibold"
                : "hover:bg-blue-100"
            }`}
          >
            {icons[part] || <FaQuestion size={22} />} {/* icono por defecto */}
            <span className="hidden sm:inline capitalize">{part}</span>
          </li>
        ))}
      </ul>

      <hr className="my-6 w-full border-gray-300" />

      <h2 className="hidden sm:block text-lg font-bold mb-4 text-blue-700 flex items-center gap-2">
        <GiBiceps /> My Exercises
      </h2>
      <p className="hidden sm:block text-gray-500 text-sm">
        Aquí aparecerán tus ejercicios guardados
      </p>
    </aside>
  );
}
