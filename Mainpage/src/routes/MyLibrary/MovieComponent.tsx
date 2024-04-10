import { Key } from "react";
import MovieCard from "./MovieCard";
import React, { useState } from 'react';

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
  const [isClicked, setIsClicked] = useState(false);
  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileField && fileField.files) {
      formData.append('file', fileField.files[0]);
  
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');


  const handleUploadClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleResetClick = () => {
    setSelectedOption('');
  };

  return (
    <div className="wrapper-library">
      
      <div className="container-library">
        
        <h1 className="library-title">My Library</h1>
        <div className="grid grid-three-column">
          {movieInfo.map((curVal:MovieData, id: Key | null | undefined) => {
            return <MovieCard key={id} myData={curVal} />;
          })}
        </div>
        <button 
        className="cssbuttons-io-button"
        id="upload-button" 
        onClick={handleUploadClick}
        >
          <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg>
          
        </button>
        
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => handleOptionClick('publications')}>Publications</button>
            <button onClick={() => handleOptionClick('journals')}>Journals</button>
            <button onClick={() => handleOptionClick('conferences')}>Conferences</button>
            <button onClick={() => handleOptionClick('books')}>Books</button>
            <button onClick={() => handleOptionClick('book chapters')}>Book Chapters</button>
          </div>
        )}

        {selectedOption === 'publications' && (
          <form id="upload-form" action="/upload" method="post" encType="multipart/form-data" className="file-upload-form" onSubmit={onFormSubmit}>
            <div className="upload-form-container">
              <div className="modal">
                <div className="modal__header">
                  <span className="modal__title">New Upload</span>
                  <button className="upload-form-button upload-form-button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg" onClick={handleResetClick}>
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
                  </button>
                </div>
                <div className="modal__body">
                  <div className="upload-form-input1">
                    <div>
                      <label className="input__label">File title</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">Corrospondins Author</label>
                      <input className="input__field" type="text"/>
                    </div>
                  </div>
                  <div className="upload-form-input1">
                    <div>
                      <label className="input__label">Co-Authors</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">Volume Number</label>
                      <input className="input__field" type="text"/>
                    </div>
                  </div>
                  <div className="upload-form-input1">
                    <div>
                      <label className="input__label">Issue Number</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">Chapter Number</label>                                                       
                      <input className="input__field" type="text"/>
                    </div>
                  </div>
                  <div className="upload-form-input1">
                    <div>
                      <label className="input__label">ISBN Number</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">Location</label>
                      <input className="input__field" type="text"/>
                    </div>
                  </div>
                  <div className="upload-form-input1">
                    <div>
                      <label className="input__label">Publisher</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">Date(YYYY-MM-DD)</label>
                      <input className="input__field" type="text"/>
                    </div>
                  </div>

                  <div className="upload-form-input2">
                    <label className="input__label">Description</label>
                    <input className="input__field "></input>
                    <p className="input__description">Give your file a good description so everyone know what's it for</p>
                  </div>
                </div>
                  {/* <div className="modal__footer">
                    <button className="upload-button upload-button--primary">Create project</button>
                  </div> */}
              </div>
            </div>
            
            
            
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 640 512" height="1em">
                  <path
                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                  ></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input id="file" type="file" />
              <button className="upload-button">
                <span>Submit</span>
                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
              </button>
            </label>
            {/* <input type="submit" value="Upload" /> */}
          </form>
        )}

        {selectedOption === 'journals' && (
          <form id="upload-form" action="/upload" method="post" encType="multipart/form-data" className="file-upload-form" onSubmit={onFormSubmit}>
            <div className="upload-form-container">
              <div className="modal">
                <div className="modal__header">
                  <span className="modal__title">New Upload</span>
                  <button className="upload-form-button upload-form-button--icon"><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg" onClick={handleResetClick}>
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
                  </button>
                </div>
                <div className="modal__body">
                  <div className="upload-form-input1">
                    <div>
                      <label className="input__label">File title</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">Author's Name</label>
                      <input className="input__field" type="text"/>
                    </div>
                    <div>
                      <label className="input__label">File title</label>
                      <input className="input__field" type="text"/> 
                    </div>
                    <div>
                      <label className="input__label">File title</label>
                      <input className="input__field" type="text"/> 
                    </div>
                  </div>
                  <div className="upload-form-input2">
                    <label className="input__label">Description</label>
                    <input className="input__field input__field--textarea"></input>
                    <p className="input__description">Give your file a good description so everyone know what's it for</p>
                  </div>
                </div>
                  {/* <div className="modal__footer">
                    <button className="upload-button upload-button--primary">Create project</button>
                  </div> */}
              </div>
            </div>
            
            
            
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 640 512" height="1em">
                  <path
                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                  ></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input id="file" type="file" />
              <button className="upload-button">
                <span>Submit</span>
                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
              </button>
            </label>
            {/* <input type="submit" value="Upload" /> */}
          </form>
        )}
        
      </div>
    </div>
  );
};

export default MovieComponent;