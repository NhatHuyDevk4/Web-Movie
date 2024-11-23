import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieSearch = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setTrailerKey(data.results[0].key);
        setModalIsOpen(true);
      } else {
        console.log("No trailer found");
      }
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };

  return (
    <div className="p-10 mb-10 text-white">
      <h2 className="mb-4 text-xl font-bold uppercase">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md lg:grid-cols-4">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className="w-[200px] h-[300px] relative group"
              onClick={() => handleTrailer(item.id)}
            >
              <div className="w-full h-full transition-transform duration-500 ease-in-out cursor-pointer  group-hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-2">
                  <p className="uppercase text-md">
                    {item.title || item.original_title}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: "99999",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>
    </div>
  );
};

MovieSearch.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default MovieSearch;
