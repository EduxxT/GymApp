import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({ exercises }) {
  if (!exercises.length)
    return <p className="text-center text-gray-500">No exercises found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.name} exercise={exercise} />
      ))}
    </div>
  );
}
