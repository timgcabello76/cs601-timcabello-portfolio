import React from "react"
import ProjectCard from "./ProjectCard"

// renders all the cards in a grid
function ProjectList(props) {
  let cardData = props.projects
  let openCardId = props.expandedId
  let toggleFn = props.onToggle

  return (
    <div className="rp-grid">
      {cardData.map(function(item) {
        return (
          <ProjectCard
            key={item.id}
            project={item}
            isExpanded={openCardId === item.id}
            onToggle={toggleFn}
          />
        )
      })}
    </div>
  )
}

export default ProjectList
