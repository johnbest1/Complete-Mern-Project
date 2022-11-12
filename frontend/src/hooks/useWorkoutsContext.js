import { useContext } from "react";
import { WorkoutContext } from "../context/workoutContext";

const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)
    if (!context) {
        throw Error('useWorkoutContext must be used inside WorkoutsContextProvider')
    }
    return context;
}

export default useWorkoutsContext;