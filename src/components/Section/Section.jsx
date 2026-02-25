import React, { useState, useEffect } from "react";
import styles from "./Section.module.css";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Filters from "../Filters/Filters";
import { CircularProgress } from "@mui/material";

function Section({ title, endpoint, type }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (e) {
      console.log("Error fetching data: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  useEffect(() => {
    if (type === "song") {
      axios.get("https://qtify-backend.labs.crio.do/genres").then((res) => {
        setFilters([{ key: "all", label: "All" }, ...res.data.data]);
      });
    }
  }, [type]);

  const showData = data.filter((item) => {
    if (type !== "song" || selectedFilterIndex === 0) return true;
    return item.genre.key === filters[selectedFilterIndex].key;
  });

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {type !== "song" && (
          <h4
            className={styles.toggleText}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Show All" : "Collapse"}
          </h4>
        )}
      </div>
      {type === "song" && (
        <Filters
          filters={filters}
          selectedFilterIndex={selectedFilterIndex}
          setSelectedFilterIndex={setSelectedFilterIndex}
        />
      )}
      {data.length === 0 ? (
        <div className={styles.loading}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className={styles.cardsWrapper}>
          {isCollapsed || type === "song" ? (
            <Carousel
              data={showData}
              renderComponent={(item) => (
                <Card
                  key={item.id}
                  data={item}
                  type={type === "song" ? "song" : "album"}
                />
              )}
            />
          ) : (
            <div className={styles.grid}>
              {showData.map((item) => (
                <Card key={item.id} data={item} type="album" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Section;
