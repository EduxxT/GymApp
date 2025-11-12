"use client";
import { useState, useEffect, JSX } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
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
import { FaDumbbell, FaRunning, FaQuestion } from "react-icons/fa";
import { BsPersonArmsUp } from "react-icons/bs";
import { PiPersonFill } from "react-icons/pi";

// Interfaz de ejercicio según API
interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  type?: string;
  difficulty?: string;
}

export default function Home() {
  const [bodyPart, setBodyPart] = useState<string>("chest");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const exercisesPerPage = 6;

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          headers: {
            "X-RapidAPI-Key": "4cd7af6e91msh2dd9fcacc8b4c2bp1b71b4jsn5ab10d970ec6",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        const response = await axios.request<Exercise[]>(options);
        if (Array.isArray(response.data)) {
          setExercises(response.data);
          setPage(1);
        } else {
          setExercises([]);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  // Paginación
  const startIndex = (page - 1) * exercisesPerPage;
  const endIndex = startIndex + exercisesPerPage;
  const currentExercises = exercises.slice(startIndex, endIndex);

  // Iconos según bodyPart (mismo que Sidebar)
  const iconMap: Record<string, JSX.Element> = {
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

  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar setBodyPart={setBodyPart} activePart={bodyPart} />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">List of Exercises</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading exercises...</p>
        ) : currentExercises.length === 0 ? (
          <p className="text-center text-gray-500">No exercises found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Icono del bodyPart */}
                  <div className="mb-4">
                    {iconMap[exercise.bodyPart] || <FaQuestion size={60} />}
                  </div>

                  {/* Nombre del ejercicio */}
                  <h2 className="text-xl font-bold mb-2 text-center text-gray-800 capitalize">
                    {exercise.name}
                  </h2>

                  {/* Información adicional */}
                  <div className="text-sm text-gray-700 space-y-1 text-center">
                    <p>
                      <strong>Body Part:</strong> {exercise.bodyPart}
                    </p>
                    <p>
                      <strong>Target:</strong> {exercise.target}
                    </p>
                    <p>
                      <strong>Equipment:</strong> {exercise.equipment}
                    </p>
                    {exercise.type && (
                      <p>
                        <strong>Type:</strong> {exercise.type}
                      </p>
                    )}
                    {exercise.difficulty && (
                      <p>
                        <strong>Difficulty:</strong> {exercise.difficulty}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Prev
              </button>
              <button
                disabled={endIndex >= exercises.length}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-lg ${
                  endIndex >= exercises.length
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
