import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './config/config';

type ResultData = Array<{
  id: string;
  title: string;
  author: string;
  description: string;
  data: string;
  category: string;
  country: string;
  language: string;

}>;

function ResultDetail() {
  const { title } = useParams();
  // const sanitizedTitle = title ? title.replace(/[^\w\s]/gi, '') : '';
  const [result, setResult] = useState<ResultData | null>(null);
  const [, setError] = useState<string | null>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const [, setImage] = useState<string | null>(null);
  console.log(title);
  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}/api/v1/publications/view/${title}`;
      console.log('Fetching from URL:', url);
      try {
        const response = await axios.get(url);
        console.log('Received data:', response.data);
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [title]);
  
  // Second useEffect to fetch the image
  useEffect(() => {
    const fetchImage = async () => {
      if (result && result[0] && result[0].id) {
        const url = `${BASE_URL}/api/v1/publications/view/image/${result[0].id}`;
        console.log('Fetching image from URL:', url);
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImage(imageUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };
  
    fetchImage();
  }, [result]);
  return (
    <div>
      {result && result[0] && (
        <div>
          <h1>{result[0].title}</h1>
          <h2>{result[0].author}</h2>
          {Object.entries(result[0]).map(([key, value]) => {
            if (key !== 'data' && key !== 'id' && key !== 'title' && key !== 'author' && value !== null) {
              return (
                <p key={key}><strong>{key}:</strong> {value}</p>
              );
            }
            return null;
          })}
          {result[0].data && (
            <object
              data={`data:application/pdf;base64,${result[0].data}`}
              type="application/pdf"
              style={{ height: '500px', width: '100%' }}
            >
              <embed
                src={`data:application/pdf;base64,${result[0].data}`}
                type="application/pdf"
              />
            </object>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultDetail;