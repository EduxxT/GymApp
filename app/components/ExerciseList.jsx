// ExerciseList.js
import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({ exercises }) {
  if (!exercises || exercises.length === 0)
    return <p className="text-center text-gray-500">No exercises found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id || exercise.name} // usar id si existe, sino name
          exercise={{
            name: exercise.name || "Unknown Exercise",
            bodyPart: exercise.bodyPart || "Unknown",
            target: exercise.target || "Unknown",
            equipment: exercise.equipment || "None",
            gifUrl: exercise.gifUrl || "/placeholder.png", // imagen por defecto si no hay
          }}
        />
      ))}
    </div>
  );
}
