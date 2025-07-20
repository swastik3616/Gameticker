import React, { useState, useEffect } from "react";
import CricketScore from "./component/CricketScore";
import Navbar from "./component/Navbar";
import "./App.css";

const leagueNames = {
  896100: "Super Lig (Turkey)",
  896785: "Primera Nacional (Argentina)",
  896821: "Primera Nacional (Argentina)",
  901468: "Torneo Federal A (Argentina)",
  901469: "Torneo Federal A (Argentina)",
  901472: "Torneo Federal A (Argentina)",
  266: "Belgian Pro League",
  9464: "Campeonato Brasileiro Série C",
  899959: "Danish Superliga",
  897443: "Chilean Primera División",
  897694: "Chilean Primera B",
  900416: "Czech First League",
  899582: "Uruguayan Segunda División",
  900238: "Moldovan National Division",
  182: "Serbian SuperLiga",
  // ...add more as needed
};

// Basic mapping for demo; expand as needed
const teamToCountry = {
  "Galatasaray": "Turkey",
  "Admira Wacker": "Austria",
  "Barracas Central": "Argentina",
  "Independiente Rivadavia": "Argentina",
  "Chacarita Juniors": "Argentina",
  "CA Talleres Remedios de Escalada": "Argentina",
  "Gimnasia Mendoza": "Argentina",
  "Temperley": "Argentina",
  "Costa Brava": "Argentina",
  "Villa Mitre": "Argentina",
  "Independiente Chivilcoy": "Argentina",
  "9 de Julio Rafaela": "Argentina",
  "Circulo Deportivo": "Argentina",
  "Sportivo Estudiantes": "Argentina",
  "Guillermo Brown": "Argentina",
  "Sol de Mayo": "Argentina",
  "Union St.Gilloise": "Belgium",
  "Club Brugge": "Belgium",
  // ...add more as needed
};

const getFlagUrl = (teamName) => {
  const country = teamToCountry[teamName];
  return country
    ? `https://countryflagsapi.com/png/${encodeURIComponent(country)}`
    : require('./component/default-flag.png');
};

function App() {
  const [selected, setSelected] = useState("cricket");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [footballData, setFootballData] = useState(null);
  const [footballLoading, setFootballLoading] = useState(false);
  const [footballError, setFootballError] = useState(null);
  const [footballNews, setFootballNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState(null);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignOut = () => setIsAuthenticated(false);

  useEffect(() => {
    if (selected === "football") {
      setFootballLoading(true);
      setFootballError(null);
      fetch("https://free-api-live-football-data.p.rapidapi.com/football-current-live", {
        method: "GET",
        headers: {
          "X-Rapidapi-Key": "cc321eaf91msh4c9108b19bbbe73p16df44jsne192bf8ecb56",
          "X-Rapidapi-Host": "free-api-live-football-data.p.rapidapi.com"
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("API error: " + res.status);
          return res.json();
        })
        .then((data) => {
          setFootballData(data);
          setFootballLoading(false);
        })
        .catch((err) => {
          setFootballError(err.message);
          setFootballLoading(false);
        });

      setNewsLoading(true);
      setNewsError(null);
      fetch("https://football-news11.p.rapidapi.com/api/news-by-date?date=2025-05-01&lang=en&page=1", {
        method: "GET",
        headers: {
          "X-Rapidapi-Key": "cc321eaf91msh4c9108b19bbbe73p16df44jsne192bf8ecb56",
          "X-Rapidapi-Host": "football-news11.p.rapidapi.com"
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("API error: " + res.status);
          return res.json();
        })
        .then((data) => {
          setFootballNews(data.result || []);
          setNewsLoading(false);
        })
        .catch((err) => {
          setNewsError(err.message);
          setNewsLoading(false);
        });
    }
  }, [selected]);

  return (
    <div>
      <Navbar
        selected={selected}
        onSelect={setSelected}
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      {selected === "cricket" && <CricketScore />}
      {selected === "football" && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>Football (Live Data)</h2>
          {footballLoading && <p>Loading live football data...</p>}
          {footballError && <p style={{ color: "red" }}>Error: {footballError}</p>}
          {footballData && footballData.response && Array.isArray(footballData.response.live) && footballData.response.live.length > 0 && (
            <div className="cards-container-horizontal">
              {footballData.response.live.map((match, idx) => (
                <div className="nfl-card" key={match.id || idx}>
                  <h3>{leagueNames[match.leagueId] || `League ID: ${match.leagueId}`}</h3>
                  <p>
                    <img src={getFlagUrl(match.home?.name)} alt="" style={{width: 24, verticalAlign: 'middle', marginRight: 6}} />
                    <strong>{match.home?.name}</strong>
                    {" vs "}
                    <img src={getFlagUrl(match.away?.name)} alt="" style={{width: 24, verticalAlign: 'middle', marginRight: 6}} />
                    <strong>{match.away?.name}</strong>
                  </p>
                  <p>Score: {match.status?.scoreStr || `${match.home?.score ?? 0} - ${match.away?.score ?? 0}`}</p>
                  <p>Time: {match.time}</p>
                  <p>
                    Live: {match.status?.liveTime?.short || match.status?.liveTime?.long || "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
          {footballData && footballData.response && Array.isArray(footballData.response.live) && footballData.response.live.length === 0 && (
            <p>No live football matches found.</p>
          )}

          {/* News Section - only for authenticated users */}
          {isAuthenticated ? (
            <>
              <h2 style={{ marginTop: "3rem" }}>Football News</h2>
              {newsLoading && <p>Loading news...</p>}
              {newsError && <p style={{ color: "red" }}>Error: {newsError}</p>}
              {footballNews && footballNews.length > 0 && (
                <div className="cards-container-horizontal">
                  {footballNews.map((news, idx) => (
                    <div className="nfl-card" key={news.id || idx}>
                      {news.image && (
                        <img
                          src={news.image}
                          alt={news.title}
                          style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8, marginBottom: 12 }}
                        />
                      )}
                      <h4>{news.title}</h4>
                      <p style={{ fontSize: 12, color: '#888', margin: '0.5rem 0' }}>
                        {news.published_at}
                      </p>
                      {news.original_url && (
                        <a href={news.original_url} target="_blank" rel="noopener noreferrer">
                          Read more
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {footballNews && footballNews.length === 0 && !newsLoading && <p>No news found.</p>}
            </>
          ) : (
            <p style={{ marginTop: "3rem", color: '#888' }}>
              Please sign in to view the latest football news.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;