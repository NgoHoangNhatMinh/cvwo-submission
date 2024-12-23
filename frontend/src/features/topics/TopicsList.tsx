import React, { useState, useEffect } from "react";
import { API_URL } from "../../constant";

function TopicsList() {
    const [topics, setTopics] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    // Fetch topics from API
    useEffect(() => {
        async function loadTopics() {
            try {
                const response = await fetch(API_URL);
                if (response.ok) {
                    const json = await response.json();
                    setTopics(json);
                } else {
                    throw response;
                }
            } catch (e) {
                // setError("An error occured. Awkward...");
                console.log("An error occured:", e);
            } finally {
                setLoading(false);
            }
        }
        loadTopics();
    })

    // Display all topics
    return <div>
        {topics.map((topic) => (
            <div key={topic.id} className="topic-container">
                <h2>{topic.title}</h2>
                <p>
                    {topic.description}
                </p>
            </div>
        ))}
    </div>;
}

export default TopicsList;