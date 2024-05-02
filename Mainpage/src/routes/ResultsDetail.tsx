import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './config/config';

type ResultData = {
  title: string;
  author: string;
  description: string;
  pdfBase64: string;
};

function ResultDetail() {
  const { title } = useParams();
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const url = `${BASE_URL}/api/v1/publications/view/${title}`;
    console.log('Fetching from URL:', url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        setResult(data);
      });
  }, [title]);

  return (
    <div>
      {result && (
        <>
          <embed src={`data:application/pdf;base64,${result.pdfBase64}`} type="application/pdf" width="100%" height="600px" />
          <div>
            <h2>{result.title}</h2>
            <h3>By {result.author}</h3>
            <p>{result.description}</p>
            {/* Display other details */}
          </div>
        </>
      )}
    </div>
  );
}

export default ResultDetail;