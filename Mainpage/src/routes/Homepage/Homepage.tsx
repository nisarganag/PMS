import './Home.css';
import Searchbar from './Searchbar';
import SearchResults from './SearchResults';
import logo from './Screenshot_2024-03-20_202235.png';
import darkLogo from './Screenshot_2024-03-20_202252.png'; // Replace with the path to your dark mode logo
import { useCallback, useEffect, useState } from 'react';
import { BASE_URL } from '../config/config';
import { Link } from 'react-router-dom';
interface HomeProps {
  isDarkMode: boolean;
}
function Home({ isDarkMode }: HomeProps) {
  const [data, setData] = useState<string | null>(null);
  const currentLogo = isDarkMode ? darkLogo : logo;

  const recommendation = useCallback(async () => {
    const userEmail = localStorage.getItem("emailId");
    let res = await fetch(`${BASE_URL}/api/v1/auth/view?email=${userEmail}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const userData = await res.json();
    const userId = userData.id;
    res = await fetch(`${BASE_URL}/api/v1/publications/preprocessPublications/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const publicationData = await res.text();
    setData(publicationData);
  }, []);

  useEffect(() => {
    recommendation();
  }, [recommendation]);
  const publications = data ? data.split('ID: ') : [];
  return (
    <div className='homePage'>
      <div className='search_bar'>
        <div > 
          <img className='page-logo' src={currentLogo} alt='Page Logo' height={78} />
        </div>
        <Searchbar />
        <SearchResults />
        {publications.map((publication, index) => {
        // Ignore the first empty string from the split
        if (index === 0) return null;

        // Extract the title from the publication string
        const title = publication.split(', Title: ')[1];

        return (
            <div key={index} style={{display:'flex'}}>
              <Link to={`/ResultsDetail/${encodeURIComponent(title)}`} key={index} className="recommendation" style={{display:'flex'}}>
                <p>{title}</p>
              </Link>
            </div>
        );
      })}
      </div>
    </div>
  );
}

export default Home;