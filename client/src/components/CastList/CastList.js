import React, { useState, useEffect, useContext } from "react";

import "./CastList.scss";
import { AppContext } from "../context";
import CastCard from "../CastCard/CastCard";
import Loading from "../Loading";

function CastList() {
  const [castList, setCastList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, Id } = useContext(AppContext);

  const getCast = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/${type}/${Id}/credits?api_key=bef15a7f1783a7d9f49210d8b88ceea4&language=en-US`
      );
      const data = await result.json();
      setCastList(data);
      setLoading(false);
    } catch (err) {
      alert("could not load data");
    }
  };

  useEffect(() => {
    getCast();
  }, [Id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <h2 className="cast-heading">Cast</h2>
        <div className="castlist-container">
          <div className="castlist">
            {castList.cast.map((cast) => {
              return (
                <div key={cast.original_name}>
                  <CastCard
                    name={cast.original_name}
                    character={cast.character}
                    image={cast.profile_path}
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

export default CastList;
