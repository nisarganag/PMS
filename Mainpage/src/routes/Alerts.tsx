import { useState, useEffect } from 'react';

interface Publication {
  id: number;
  title: string;
  description: string;
  // Add other properties here based on the structure of your publications
}

function Alerts() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchPublications = async () => {
      const response = await fetch('YOUR_API_URL_HERE');
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

export default Alerts;