import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/albums/1/photos"
        );
        setImagesData(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
     {/* Loading spinner displayed while data is being fetched */}
      {loading && (
        <div className="flex justify-center items-center ">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mt-5"></div>
        </div>
      )}
       {/* Error message displayed if there's an error while fetching data */}
      {error && (
        <div className="flex justify-center items-center">
          <p className="mt-5 text-center text-red-500 text-sm font-bold ">
            Error loading data. Please try again later.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 h-screen items-center justify-center">
        {!loading &&
          !error &&
          imagesData.map((image) => (
            <div
              className="card flex flex-col items-center p-4 bg-white rounded-lg shadow-lg"
              key={image.id}
            >
              <img
                src={image.thumbnailUrl}
                alt={image.title}
                className="card-image mb-2"
              />
              <details className="text-center">
                <summary className="p-2 rounded-md cursor-pointer list-none">
                  {image.title.slice(0, 20)}...
                </summary>
                <p className="">{image.title}</p>
              </details>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
