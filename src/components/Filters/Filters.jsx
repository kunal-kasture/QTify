import React from "react";
import { Tabs, Tab } from "@mui/material";
import styles from "./Filters.module.css";

function Filters({ filters, selectedFilterIndex, setSelectedFilterIndex }) {
  const handleChange = (event, newValue) => {
    setSelectedFilterIndex(newValue);
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        value={selectedFilterIndex}
        onChange={handleChange}
        indicatorColor="primary"
        TabIndicatorProps={{
          style: { backgroundColor: "var(--color-primary)" },
        }}
        className={styles.tabs}
      >
        {filters.map((item, index) => (
          <Tab key={item.key} label={item.label} className={styles.tab} />
        ))}
      </Tabs>
    </div>
  );
}

export default Filters;
