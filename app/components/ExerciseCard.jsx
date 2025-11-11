

import {
  GiChestArmor,
  GiBiceps,
  GiShoulderArmor,
  GiLeg,
  GiBackPain,
  GiAbdominalArmor,
} from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";

export default function ExerciseCard({ exercise }) {
  const iconMap = {
    chest: <GiChestArmor size={40} className="text-blue-600" />,
    back: <GiBackPain size={40} className="text-green-600" />,
    shoulders: <GiShoulderArmor size={40} className="text-yellow-600" />,
    biceps: <GiBiceps size={40} className="text-red-500" />,
    triceps: <FaDumbbell size={40} className="text-gray-600" />,
    legs: <GiLeg size={40} className="text-purple-600" />,
    abdominals: <GiAbdominalArmor size={40} className="text-orange-500" />,
  };

  const icon = iconMap[exercise.muscle] || <FaDumbbell size={40} />;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100">
      <div className="flex justify-center mb-4">{icon}</div>

      <h2 className="text-lg font-semibold mb-2 text-center text-gray-800 capitalize">
        {exercise.name}
      </h2>

      <div className="text-sm text-gray-600 space-y-1 text-center">
        <p>
          <strong>Type:</strong> {exercise.type}
        </p>
        <p>
          <strong>Equipment:</strong> {exercise.equipment}
        </p>
        <p>
          <strong>Difficulty:</strong> {exercise.difficulty}
        </p>
      </div>
    </div>
  );
}
