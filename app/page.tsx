
// IMPORTAR TODAS LAS BIBLIOTECAS NECESARIAS

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import ExerciseList from "./components/ExerciseList";


// Se crea la funcion home que es una funcion para llamar a la vista (mejor rendimiento)

// Se declaran las constantes
export default function Home() {
  const [bodyPart, setBodyPart] = useState("chest");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const exercisesPerPage = 6;

  // CONEXION CON LA API LOOOOOL
  const API_KEY = "Kh+4xlCkrrm3PsLdmpzOBA==Rl9NhgYWgE9wEoLM";
  const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}?muscle=${bodyPart}`, {
          headers: { "X-Api-Key": API_KEY },
        });
        setExercises(response.data);
        setPage(1); // Resetear página al cambiar de músculo
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [bodyPart]);

  // Calcular los ejercicios visibles
  const startIndex = (page - 1) * exercisesPerPage;
  const endIndex = startIndex + exercisesPerPage;
  const currentExercises = exercises.slice(startIndex, endIndex);

  // Regresa la vista uwu
  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar setBodyPart={setBodyPart} activePart={bodyPart} />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6"> List of Exercises</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading exercises...</p>
        ) : (
          <>
            <ExerciseList exercises={currentExercises} />

            {/* Paginación */}
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
