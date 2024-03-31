import { Key } from "react";
import MovieCard from "./MovieCard";

interface MovieData {
  title: string;
  description: string;
  language: string;
  author: string;
}
interface MovieComponentProps {
  movieInfo: MovieData[];
}
const MovieComponent = ({ movieInfo }: MovieComponentProps) => {
  return (
    <div className="wrapper-library">
      <div className="container-library">
        <h1 className="library-title">My Library</h1>
        <div className="grid grid-three-column">
          {movieInfo.map((curVal:MovieData, id: Key | null | undefined) => {
            return <MovieCard key={id} myData={curVal} />;
          })}
        </div>
        
      </div>
    </div>
  );
};

export default MovieComponent;