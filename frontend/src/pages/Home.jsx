import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { URL } from "../App";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  //fetch workout api from backend
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`${URL}/api/workouts`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkout();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
