import React, { useState, useEffect } from "react";
import SocketConnection from "./SocketConnection";

export default function Dashboard({
    username,
    authToken,
}){
    const [loadClient, setLoadClient] = useState(true);

    return (
        <div>
            Welcome {username}<br></br>
            <button onClick={() => setLoadClient(prevState => !prevState)}>
                {loadClient ? "Disconnect from server" : "Connect to server"}
            </button>
            {loadClient ? <SocketConnection authToken={authToken} /> : null}
        </div>
    )
}


