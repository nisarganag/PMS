import { useState, useEffect } from "react";
import Loading from "./Loading";
import MovieComponent from "./MovieComponent";
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
  // include other properties as needed
}
const Home = () => {
  const [card, setCard] = useState<CardData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    setLoading(true);
    const userEmail = localStorage.getItem("emailId");
    let res = await fetch(`http://localhost:8080/api/v1/auth/view?email=${userEmail}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const userData = await res.json();
  const userId = userData.id;
    res = await fetch(
      `http://localhost:8080/api/v1/publications/all/${userId}`,
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
    }));
    setCard([...publications]);
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;