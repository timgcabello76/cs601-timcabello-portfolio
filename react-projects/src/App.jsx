import React from "react";
import { useState } from "react";
import ProjectList from "./components/ProjectList";
import allProjects from "./projects.json";
import "./App.css";

function App() {
  // keeps track of which card is currently open
  // only one at a time, null means none are open
  let [openCard, setOpenCard] = useState(null);

  function handleCardToggle(cardId) {
    if (openCard == cardId) {
      setOpenCard(null);
    } else {
      setOpenCard(cardId);
    }
  }

  return (
    <div className="rp-app">
      <div className="rp-header">
        <p className="rp-header-note">
          Built with React. Click "Show notes" on any card to see notes from
          that assignment. Only one card opens at a time.
        </p>
      </div>
      <ProjectList
        projects={allProjects}
        expandedId={openCard}
        onToggle={handleCardToggle}
      />
    </div>
  );
}

export default App;
