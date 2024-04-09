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
          onClick={() => setIsClicked(!isClicked)}>

          <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg>
          <span>Upload</span>
        </button>
        

        {isClicked && (
          <form id="upload-form" action="/upload" method="post" encType="multipart/form-data" className="file-upload-form" onSubmit={onFormSubmit}>
            <div className="file-upload-info">
              <div className="upload-detail-left">
                <label htmlFor="title">Title:</label>
                <label htmlFor="author">Author's Name:</label>
                <label style={{
                  height: "10vh",
                }} htmlFor="description">Description:</label>
              </div>
              <div className="upload-detail-right">
                <input id="title" type="text" name="title" required />
                <input id="author" type="text" name="author" required />
                <textarea id="description" name="description" required></textarea>
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
            </label>
            <input type="submit" value="Upload" />
          </form>

          // <form id="upload-form" action="/upload" method="post" encType="multipart/form-data">
          //   <input type="file" name="pdf" accept="application/pdf" required />
          //   <input type="submit" value="Upload" />
          // </form>
        )}
        
      </div>
    </div>
  );
};

export default MovieComponent;