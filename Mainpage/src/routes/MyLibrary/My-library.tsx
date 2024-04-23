import { useState, useEffect } from "react";
import Loading from "../Loading/Loading.tsx";
import MovieComponent from "./MovieComponent";
import { BASE_URL } from '../config/config.tsx';
import "./My-library.css";
interface CardData {
  title: string;
  description: string;
  language: string;
  author: string;
}
interface Publication {
  title: string;
  author: string;
  description: string;
}
const Home = () => {
  const [card, setCard] = useState<CardData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    setLoading(true);
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
    const data = await res.json();
    const publications = data.map((publication: Publication) => ({
      title: publication.title,
      author: publication.author,
      description: publication.description,
    }));
    setCard([...publications]);
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  

  return (
    <>
      <div className="center">
        
      </div>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;