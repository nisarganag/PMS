import { useEffect, useState } from "react";

interface MovieData {
  title: string;
  description: string;
  language: string;
  author: string;
}
interface MovieCardProps {
  myData: MovieData;
}
const MovieCard = ({myData}: MovieCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { title, description, author } = myData;
  return (
    <div className="library-card">
      <div className="library-card-info">
        <div className="library-card-header">
          <h2 className="library-card-title">{title.substr(0, 20)}</h2>
          <div className="book">
            <div className="back"></div>
            <div className="page6"></div>
            <div className="page5"></div>
            <div className="page4"></div>
            <div className="page3"></div>
            <div className="page2"></div>
            <div className="page1"></div>
            <div className="front"></div>
          </div>

          <h2 className="library-card-author">{author}</h2>
        </div>
        {/* <div>
          {isVisible && <p className="library-card-body">{description ? description.substr(0,150) : ''}</p>}
        </div> */}
        <p className="bodyL">{description ? description.substr(0,150) : ''}</p>
      </div>
    </div>
  );
};

export default MovieCard;