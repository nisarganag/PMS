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
  const { title, description, author } = myData;
  return (
    <div className="library-card">
      <div className="library-card-info">
        <div className="library-card-header">
          <h2 className="library-card-title">{title.substr(0, 20)}</h2>
          <h2 className="library-card-author">{author}</h2>
        </div>
        <p className="library-card-body">{description ? description.substr(0,150) : ''}</p>
      </div>
    </div>
  );
};

export default MovieCard;