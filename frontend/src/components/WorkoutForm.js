import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must login')
            return
        }
        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify(workout)
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setEmptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }
    return (
        <form className="new-workout" onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>
            <label>Title:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''} />
            <label>Load (Kg):</label>
            <input type="number" value={load} onChange={e => setLoad(e.target.value)} className={emptyFields.includes('load') ? 'error' : ''} />
            <label>Reps:</label>
            <input type="number" value={reps} onChange={e => setReps(e.target.value)} className={emptyFields.includes('reps') ? 'error' : ''} />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default WorkoutForm;