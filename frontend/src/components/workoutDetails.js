import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useWorkoutsContext from '../hooks/useWorkoutsContext'
import useAuthContext from '../hooks/useAuthContext'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }
    return (
        <div className="workout">
            <h3>Title: {workout.title}</h3>
            <p><strong>Load (Kg): {workout.load}</strong></p>
            <p><strong>Reps: {workout.reps}</strong></p>
            <p><strong>CreatedAt: {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</strong></p>
            <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
        </div>
    );
}

export default WorkoutDetails;