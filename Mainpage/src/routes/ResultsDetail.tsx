import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './config/config';

type ResultData = {
  title: string;
  author: string;
  description: string;
  pdfBase64: string;
  data: string;
};

function ResultDetail() {
  const { title } = useParams();
  const sanitizedTitle = title ? title.replace(/[^\w\s]/gi, '') : '';
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = `${BASE_URL}/api/v1/publications/view/${sanitizedTitle}`;
    console.log('Fetching from URL:', url);
    axios.get(url)
      .then(response => {
        console.log('Received data:', response.data);
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sanitizedTitle]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : result ? (
        <>
          <embed src={`data:application/pdf;base64,${result.pdfBase64}`} type="application/pdf" width="100%" height="600px" />
          <div>
            <h2>Title: {result.title}</h2>
            <h3>By: {result.author}</h3>
            <p> Description: {result.description}</p>
            {/* Display other details */}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default ResultDetail;