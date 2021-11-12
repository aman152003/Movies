import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

import { AppContext } from "../../components/context";
import SmallButton from "../../components/SmallButton/SmallButton";
import UserScore from "../../components/UserScore/UserScore";

function Watchlist() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const { state, setId, setType } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const getWatchlist = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await axios({
        method: "get",
        url: "https://moviesdb-react.herokuapp.com/watchlist",
        headers: {
          Authorization: token,
        },
      });
      setData(res.data.myWatchlist);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      alert("could not load data");
    }
  };

  const deleteItem = async (title, userId) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios({
        method: "delete",
        url: "https://moviesdb-react.herokuapp.com/watchlist",
        headers: {
          Authorization: token,
        },
        data: {
          title: title,
          userId: userId,
        },
      });
    } catch (err) {
      console.log("could not delete item");
    }
  };

  const filterList = (title) => {
    setData(
      data.filter((item) => {
        return item.title !== title;
      })
    );
  };

  useEffect(() => {
    if (!state) {
      history.push("/login");
    } else {
      getWatchlist();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  } else if (data.length === 0) {
    return <h2>Watchlist is empty</h2>;
  } else {
    return (
      <div className="list">
        {data.map((item) => {
          return (
            <div className="card" key={item.id}>
              <div
                className="image"
                onClick={() => {
                  setId(item.id);
                  setType(item.type);
                  history.push("/details");
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.image}`}
                  alt="card"
                />
              </div>
              <div className="card-user-score">
                <UserScore score={Math.round(item.userScore * 10)} />
              </div>
              <div className="card-buttons">
                <div
                  onClick={() => {
                    deleteItem(item.title, item.userId);
                    filterList(item.title);
                  }}
                  className="btn-delete"
                >
                  <SmallButton icon={<i className="fas fa-trash"></i>} />
                </div>
              </div>
              <div className="title-and-date">
                <p className="bold">{item.title}</p>
                <p className="light">{item.releaseDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Watchlist;
