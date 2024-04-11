import { Key } from "react";
import MovieCard from "./MovieCard";
import React, { useState } from "react";
import { BASE_URL } from "../config/config.tsx";

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
  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const publication = {
      title,
      author,
      coAuthor,
      volumeNo,
      chapterNo,
      isbn,
      country,
      publisher,
      publishedDate,
      issueNo,
      pageNo,
      language,
      description,
      category,
    };

    const formData = new FormData();
    formData.append("publication", JSON.stringify(publication));

    const fileField = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileField && fileField.files) {
      formData.append("data", fileField.files[0]);
    }
    try {
      const response = await fetch(`${BASE_URL}/api/v1/publications/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Replace `token` with your actual token
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log(
          await response.text()
        );
      }
      handleResetClick();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const resetFormData = () => {
    setTitle("");
    setAuthor("");
    setCoAuthor("");
    setVolumeNo("");
    setChapterNo("");
    setIsbn("");
    setCountry("");
    setPublisher("");
    setPublishedDate("");
    setIssueNo("");
    setPageNo("");
    setLanguage("");
    setDescription("");
    setCategory("");
    setFile(null);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleUploadClick = () => {
    setDropdownOpen(!isDropdownOpen);
    resetFormData();
    setCurrentPage(1);
  };

  const handleOptionClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setCategory(event.target.value);
    setDropdownOpen(false);
  };

  const handleResetClick = () => {
    setSelectedOption("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coAuthor, setCoAuthor] = useState("");
  const [volumeNo, setVolumeNo] = useState("");
  const [, setFile] = useState<File | null>(null);
  const [chapterNo, setChapterNo] = useState("");
  const [isbn, setIsbn] = useState("");
  const [country, setCountry] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [issueNo, setIssueNo] = useState("");
  const [pageNo, setPageNo] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBackClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };
  const token = localStorage.getItem("token");

  return (
    <div className="wrapper-library">
      <div className="container-library">
        <h1 className="library-title">My Library</h1>
        <div className="grid grid-three-column">
          {movieInfo.map((curVal: MovieData, id: Key | null | undefined) => {
            return <MovieCard key={id} myData={curVal} />;
          })}
        </div>
        <button
          className="cssbuttons-io-button"
          id="upload-button"
          onClick={handleUploadClick}
        >
          <svg
            viewBox="0 0 640 512"
            fill="white"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="upload-custom-select">
            <select onChange={handleOptionClick}>
              <option value="" selected disabled>
                Select an option
              </option>
              <option value="journals">Journals</option>
              <option value="conferences">Conferences</option>
              <option value="books">Books</option>
              <option value="book chapters">Book Chapters</option>
              <option value="publications">Publications</option>
            </select>
          </div>
        )}

        {selectedOption === "publications" && (
          <form
            id="upload-form"
            encType="multipart/form-data"
            className="file-upload-form"
            onSubmit={onFormSubmit}
          >
            {currentPage === 1 && (
              <div>
                <div className="upload-form-container">
                  <div className="modal">
                    <div className="modal__header">
                      <span className="modal__title">New Upload</span>
                      <button className="upload-form-button upload-form-button--icon">
                        <svg
                          width="24"
                          viewBox="0 0 24 24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={handleResetClick}
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="modal__body">
                      <div className="upload-form-input1">
                        <div>
                          <label className="input__label">Title</label>
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="input__label">
                            Corresponding Author
                          </label>
                          <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="upload-form-input1">
                        <div>
                          <label className="input__label">Co-Authors</label>
                          <input
                            value={coAuthor}
                            onChange={(e) => setCoAuthor(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="input__label">Volume Number</label>
                          <input
                            value={volumeNo}
                            onChange={(e) => setVolumeNo(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="upload-form-input1">
                        <div>
                          <label className="input__label">Issue Number</label>
                          <input
                            value={issueNo}
                            onChange={(e) => setIssueNo(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="input__label">Chapter Number</label>
                          <input
                            value={chapterNo}
                            onChange={(e) => setChapterNo(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="upload-form-input1">
                        <div>
                          <label className="input__label">ISBN Number</label>
                          <input
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="input__label">Location</label>
                          <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="upload-form-input1">
                        <div>
                          <label className="input__label">Publisher</label>
                          <input
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="input__label">
                            Date(YYYY-MM-DD)
                          </label>
                          <input
                            value={publishedDate}
                            onChange={(e) => setPublishedDate(e.target.value)}
                            className="input__field"
                            type="text"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="input__label">Language</label>
                        <input
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>

                      <div className="upload-form-input2">
                        <label className="input__label">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="input__field--textarea"
                        ></textarea>
                        <p className="input__description">
                          Give your file a good description so everyone know
                          what's it for
                        </p>
                      </div>
                    </div>
                    {/* <div className="modal__footer">
                        <button className="upload-button upload-button--primary">Create project</button>
                      </div> */}
                  </div>
                  <button onClick={handleNextClick} className="upload-next-Btn">
                    Next
                    <svg viewBox="0 0 320 512" className="upload-next-svg">
                      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div>
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                  </div>
                  <input id="file" type="file" onChange={handleFileChange} />
                  <div className="upload-form-btns">
                    <button
                      onClick={handleBackClick}
                      className="upload-prev-Btn"
                    >
                      Prev
                      <svg
                        viewBox="0 0 320 512"
                        className="upload-prev-svg"
                        style={{ transform: "scaleX(-1)" }}
                      >
                        <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                      </svg>
                    </button>

                    <button type="submit" className="upload-submit-Btn">
                      Submit
                      <svg viewBox="0 0 512 512" className="upload-submit-svg">
                        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-10.002 9.997-26.212 9.997-36.204-.001z"></path>
                      </svg>
                    </button>
                  </div>
                </label>
              </div>
            )}
          </form>
        )}

        {selectedOption === "journals" && (
          <form
            id="upload-form"
            action="/upload"
            method="post"
            encType="multipart/form-data"
            className="file-upload-form"
            onSubmit={onFormSubmit}
          >
            {currentPage === 1 && (
              <div className="upload-form-container">
                <div className="modal">
                  <div className="modal__header">
                    <span className="modal__title">New Upload</span>
                    <button className="upload-form-button upload-form-button--icon">
                      <svg
                        width="24"
                        viewBox="0 0 24 24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleResetClick}
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="modal__body">
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Corresponding Author
                        </label>
                        <input
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Co-authors</label>
                        <input
                          value={coAuthor}
                          onChange={(e) => setCoAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">Page Number</label>
                        <input
                          value={pageNo}
                          onChange={(e) => setPageNo(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Volume NUmber</label>
                        <input
                          value={volumeNo}
                          onChange={(e) => setVolumeNo(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>

                      <div>
                        <label className="input__label">
                          Date (YYYY-MM-DD)
                        </label>
                        <input
                          value={publishedDate}
                          onChange={(e) => setPublishedDate(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Issue Number</label>
                        <input
                          value={issueNo}
                          onChange={(e) => setIssueNo(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">Language</label>
                        <input
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input2">
                      <label className="input__label">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input__field--textarea"
                      ></textarea>
                      <p className="input__description">
                        Give your file a good description so everyone know
                        what's it for
                      </p>
                    </div>
                  </div>
                </div>
                <button onClick={handleNextClick} className="upload-next-Btn">
                  Next
                  <svg viewBox="0 0 320 512" className="upload-next-svg">
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                  </svg>
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
                <div className="upload-form-btns">
                  <button onClick={handleBackClick} className="upload-prev-Btn">
                    Prev
                    <svg
                      viewBox="0 0 320 512"
                      className="upload-prev-svg"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                    </svg>
                  </button>

                  <button type="submit" className="upload-submit-Btn">
                    Submit
                    <svg viewBox="0 0 512 512" className="upload-submit-svg">
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-10.002 9.997-26.212 9.997-36.204-.001z"></path>
                    </svg>
                  </button>
                </div>
              </label>
            )}
          </form>
        )}

        {selectedOption === "conferences" && (
          <form
            id="upload-form"
            action="/upload"
            method="post"
            encType="multipart/form-data"
            className="file-upload-form"
            onSubmit={onFormSubmit}
          >
            {currentPage === 1 && (
              <div className="upload-form-container">
                <div className="modal">
                  <div className="modal__header">
                    <span className="modal__title">New Upload</span>
                    <button className="upload-form-button upload-form-button--icon">
                      <svg
                        width="24"
                        viewBox="0 0 24 24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleResetClick}
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="modal__body">
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Corresponding Author
                        </label>
                        <input
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Co-authors</label>
                        <input
                          value={coAuthor}
                          onChange={(e) => setCoAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">Page Number</label>
                        <input
                          value={pageNo}
                          onChange={(e) => setPageNo(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Location</label>
                        <input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Date (YYYY-MM-DD)
                        </label>
                        <input
                          value={publishedDate}
                          onChange={(e) => setPublishedDate(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="input__label">Language</label>
                      <input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="input__field"
                        type="text"
                      />
                    </div>

                    <div className="upload-form-input2">
                      <label className="input__label">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input__field--textarea"
                      ></textarea>
                      <p className="input__description">
                        Give your file a good description so everyone know
                        what's it for
                      </p>
                    </div>
                  </div>
                </div>
                <button onClick={handleNextClick} className="upload-next-Btn">
                  Next
                  <svg viewBox="0 0 320 512" className="upload-next-svg">
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                  </svg>
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
                <div className="upload-form-btns">
                  <button onClick={handleBackClick} className="upload-prev-Btn">
                    Prev
                    <svg
                      viewBox="0 0 320 512"
                      className="upload-prev-svg"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                    </svg>
                  </button>

                  <button type="submit" className="upload-submit-Btn">
                    Submit
                    <svg viewBox="0 0 512 512" className="upload-submit-svg">
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-10.002 9.997-26.212 9.997-36.204-.001z"></path>
                    </svg>
                  </button>
                </div>
              </label>
            )}
          </form>
        )}

        {selectedOption === "books" && (
          <form
            id="upload-form"
            action="/upload"
            method="post"
            encType="multipart/form-data"
            className="file-upload-form"
            onSubmit={onFormSubmit}
          >
            {currentPage === 1 && (
              <div className="upload-form-container">
                <div className="modal">
                  <div className="modal__header">
                    <span className="modal__title">New Upload</span>
                    <button className="upload-form-button upload-form-button--icon">
                      <svg
                        width="24"
                        viewBox="0 0 24 24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleResetClick}
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="modal__body">
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Corresponding Author
                        </label>
                        <input
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Co-authors</label>
                        <input
                          value={coAuthor}
                          onChange={(e) => setCoAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">ISBN Number</label>
                        <input
                          value={isbn}
                          onChange={(e) => setIsbn(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Publisher</label>
                        <input
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Date (YYYY-MM-DD)
                        </label>
                        <input
                          value={publishedDate}
                          onChange={(e) => setPublishedDate(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="input__label">Language</label>
                      <input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="input__field"
                        type="text"
                      />
                    </div>

                    <div className="upload-form-input2">
                      <label className="input__label">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input__field--textarea"
                      ></textarea>
                      <p className="input__description">
                        Give your file a good description so everyone know
                        what's it for
                      </p>
                    </div>
                  </div>
                </div>
                <button onClick={handleNextClick} className="upload-next-Btn">
                  Next
                  <svg viewBox="0 0 320 512" className="upload-next-svg">
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                  </svg>
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
                <div className="upload-form-btns">
                  <button onClick={handleBackClick} className="upload-prev-Btn">
                    Prev
                    <svg
                      viewBox="0 0 320 512"
                      className="upload-prev-svg"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                    </svg>
                  </button>

                  <button type="submit" className="upload-submit-Btn">
                    Submit
                    <svg viewBox="0 0 512 512" className="upload-submit-svg">
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-10.002 9.997-26.212 9.997-36.204-.001z"></path>
                    </svg>
                  </button>
                </div>
              </label>
            )}
          </form>
        )}

        {selectedOption === "book chapters" && (
          <form
            id="upload-form"
            action="/upload"
            method="post"
            encType="multipart/form-data"
            className="file-upload-form"
            onSubmit={onFormSubmit}
          >
            {currentPage === 1 && (
              <div className="upload-form-container">
                <div className="modal">
                  <div className="modal__header">
                    <span className="modal__title">New Upload</span>
                    <button className="upload-form-button upload-form-button--icon">
                      <svg
                        width="24"
                        viewBox="0 0 24 24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleResetClick}
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="modal__body">
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Corresponding Author
                        </label>
                        <input
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Co-authors</label>
                        <input
                          value={coAuthor}
                          onChange={(e) => setCoAuthor(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">
                          Page Number (From-To)
                        </label>
                        <input
                          value={pageNo}
                          onChange={(e) => setPageNo(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">Chapter Number</label>
                        <input
                          value={chapterNo}
                          onChange={(e) => setChapterNo(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="input__label">ISBN Number</label>
                        <input
                          value={isbn}
                          onChange={(e) => setIsbn(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="upload-form-input1">
                      <div>
                        <label className="input__label">
                          Date (YYYY-MM-DD)
                        </label>
                        <input
                          value={publishedDate}
                          onChange={(e) => setPublishedDate(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>

                      <div>
                        <label className="input__label">Language</label>
                        <input
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="input__field"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="upload-form-input2">
                      <label className="input__label">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input__field--textarea"
                      ></textarea>
                      <p className="input__description">
                        Give your file a good description so everyone know
                        what's it for
                      </p>
                    </div>
                  </div>
                </div>
                <button onClick={handleNextClick} className="upload-next-Btn">
                  Next
                  <svg viewBox="0 0 320 512" className="upload-next-svg">
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                  </svg>
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
                <div className="upload-form-btns">
                  <button onClick={handleBackClick} className="upload-prev-Btn">
                    Prev
                    <svg
                      viewBox="0 0 320 512"
                      className="upload-prev-svg"
                      style={{ transform: "scaleX(-1)" }}
                    >
                      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"></path>
                    </svg>
                  </button>

                  <button type="submit" className="upload-submit-Btn">
                    Submit
                    <svg viewBox="0 0 512 512" className="upload-submit-svg">
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-10.002 9.997-26.212 9.997-36.204-.001z"></path>
                    </svg>
                  </button>
                </div>
              </label>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MovieComponent;
