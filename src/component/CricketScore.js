import React, { useEffect, useState } from "react";
import circle from "./circle.png";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState();
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=5c9a90f7-a099-4ba8-9137-df32f6561a43&offset=0"
      );
      const data = await response.json();
      console.log(data);
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value);
    setInputData(e.target.value);
  };
  const handleBtn = () => {
    setSearch(inputData);
    getData();
  };

  const renderMatch = (curVal) => {
    const matchesSearch =
      (curVal.series?.toLowerCase() || "").includes(search?.toLowerCase() || "") ||
      (curVal.t1?.toLowerCase() || "").includes(search?.toLowerCase() || "") ||
      (curVal.t2?.toLowerCase() || "").includes(search?.toLowerCase() || "");
    if (!matchesSearch && search) return null;
    return (
      <div className="card">
        <h3>{curVal.series}</h3>
        <h3>{curVal.matchType}</h3>
        <div className="img">
          <div>
            <img src={curVal.t1img} alt={curVal.t1 || ""} />
            <p>{curVal.t1}</p>
            <p>{curVal.t1s}</p>
          </div>
          <div>
            <img src={curVal.t2img} alt={curVal.t2 || ""} />
            <p>{curVal.t2}</p>
            <p>{curVal.t2s}</p>
          </div>
        </div>
        <p className="status">Status : {curVal.status}</p>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Match, series"
          onChange={handleInput}
        />
        <button onClick={handleBtn}>Search</button>
      </div>
      <div className="heading">
        <img src={circle} alt="App logo" />
        <p>Live Cricket Score App</p>
      </div>

      <div className="container">
        {data ? (
          data.map((curVal) => {
            console.log(curVal);
            if (curVal.status !== "Match not started") {
              if (renderMatch(curVal, 'nfl-card')) {
                return renderMatch(curVal, 'nfl-card');
              }

              if(search === ""){
                return (
                  <div className="card">
                    <h3>{curVal.series}</h3>
                    <h3>{curVal.matchType}</h3>
                    <div className="img">
                      <div>
                        <img src={curVal.t1img} alt={curVal.t1 || ""} />
                        <p>{curVal.t1}</p>
                        <p>{curVal.t1s}</p>
                      </div>
                      <div>
                        <img src={curVal.t2img} alt={curVal.t2 || ""} />
                        <p>{curVal.t2}</p>
                        <p>{curVal.t2s}</p>
                      </div>
                    </div>
                    <p className="status">Status : {curVal.status}</p>
                  </div>
                );
              }
            }
            return null; // Ensure a value is always returned
          })
        ) : (
          <p>Data Not Found !</p>
        )}
      </div>
    </div>
  );
};

export default CricketScore;