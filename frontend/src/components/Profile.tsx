import { useUser } from "./contexts/UserContext";

function Profile () {
    const {user} = useUser();
    
    if (user === undefined) {
        return <div>
            <h1>No such user</h1>
            <p>Awkward...</p>
        </div>
    }

    return <div>
        <h1>Profile...</h1>
        <p>{`User: ${user.id}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Created at: ${user.created_at}`}</p>
    </div>
}

export default Profile;