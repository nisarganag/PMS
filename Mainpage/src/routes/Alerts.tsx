import { useState, useEffect } from 'react';
import { BASE_URL } from './config/config';

interface Publication {
  id: number;
  title: string;
  description: string;
  // Add other properties here based on the structure of your publications
}

function Alerts() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const getCardData = async () => {
    const userEmail = localStorage.getItem("emailId");
    let res = await fetch(`${BASE_URL}/api/v1/auth/view?email=${userEmail}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const userData = await res.json();
  const userId = userData.id;
    res = await fetch(
      `${BASE_URL}/api/v1/publications/all/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
    );

    useEffect(() => {
      const fetchPublications = async () => {
        const response = await fetch('{BASE_URL}/api/v1/notifications/all/660fa2a06464f1683714cbf3');
        const data = await response.json();
        setPublications(data);
      };

      fetchPublications();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Alerts</h1>
      {publications.map((publication) => (
        <div key={publication.id}>
          <h2>{publication.title}</h2>
          <p>{publication.description}</p>
        </div>
      ))}
    </div>
  );
}
}

export default Alerts;