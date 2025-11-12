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

export default function ExerciseCard({ exercise }) {
  // Mismo map de iconos que en Sidebar
  const iconMap = {
    chest: <GiChestArmor size={60} className="text-blue-600" />,
    cardio: <FaRunning size={60} className="text-red-500" />,
    back: <GiBackPain size={60} className="text-green-600" />,
    "lower arms": <GiArm size={60} className="text-yellow-600" />,
    "lower legs": <GiHieroglyphLegs size={60} className="text-purple-600" />,
    "upper arms": <BsPersonArmsUp size={60} className="text-red-500" />,
    "upper legs": <GiRobotLeg size={60} className="text-purple-700" />,
    waist: <PiPersonFill size={60} className="text-gray-600" />,
    neck: <GiIntricateNecklace size={60} className="text-pink-600" />,
    shoulders: <GiShoulderArmor size={60} className="text-yellow-500" />,
    biceps: <GiBiceps size={60} className="text-red-500" />,
    triceps: <FaDumbbell size={60} className="text-gray-600" />,
    legs: <GiLeg size={60} className="text-purple-500" />,
    abdominals: <GiAbdominalArmor size={60} className="text-orange-500" />,
  };

  const icon = iconMap[exercise.bodyPart] || <FaQuestion size={60} />;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center">
      {/* Icono grande de la parte del cuerpo */}
      <div className="mb-4">{icon}</div>

      {/* Nombre del ejercicio */}
      <h2 className="text-xl font-bold mb-2 text-center text-gray-800 capitalize">
        {exercise.name}
      </h2>

      {/* Información principal */}
      <div className="text-sm text-gray-700 space-y-1 text-center">
        <p>
          <strong>Body Part:</strong> {exercise.bodyPart}
        </p>
        <p>
          <strong>Target Muscle:</strong> {exercise.target}
        </p>
        <p>
          <strong>Equipment:</strong> {exercise.equipment}
        </p>
        <p>
          <strong>Type:</strong> {exercise.type || "Strength"}
        </p>
        <p>
          <strong>Difficulty:</strong> {exercise.difficulty || "Medium"}
        </p>
      </div>

      {/* Opcional: consejos o placeholder de repeticiones */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Recommended: 3 sets x 12 reps</p>
      </div>
    </div>
  );
}
