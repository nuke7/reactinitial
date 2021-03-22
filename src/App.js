import "./App.css";
import { useState, useEffect } from "react";
import { LoadingMask } from "./components/LoadingMask";
import { Hotel } from "./components/Hotel";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch("/api/hotels");
    setData(await response.json());
    if (data) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h1>Hotels</h1>
      <div>
        {loading ? (
          <LoadingMask />
        ) : (
          data.map((data, index) => {
            return <Hotel data={data} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default App;
