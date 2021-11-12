import React, { useState, useEffect, useContext } from "react";

import "./Similar.scss";
import { AppContext } from "../context";
import Card from "../Card/Card";
import Loading from "../Loading";

function Similar() {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, Id } = useContext(AppContext);

  const getSimilar = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/${type}/${Id}/similar?api_key=bef15a7f1783a7d9f49210d8b88ceea4&language=en-US&page=1`
      );
      const data = await result.json();
      setSimilar(data);
      setLoading(false);
    } catch (err) {
      alert("could not load data");
    }
  };

  useEffect(() => {
    getSimilar();
  }, [Id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <h2 className="similar-movies-heading">Similar Stuff</h2>
        <div className="similar-movies-container">
          <div className="similar-movies">
            {similar.results.map((item) => {
              return (
                <div className="similar-item" key={item.id}>
                  <Card
                    image={item.poster_path}
                    title={type === "movie" ? item.original_title : item.name}
                    userScore={item.vote_average}
                    releaseDate={
                      type === "movie" ? item.release_date : item.first_air_date
                    }
                    id={item.id}
                    type={item.first_air_date ? "tv" : "movie"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Similar;
