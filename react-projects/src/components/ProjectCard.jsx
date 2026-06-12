import React from "react"

// one project card - receives the project data and toggle state as props
function ProjectCard(props) {
  let proj = props.project
  let isOpen = props.isExpanded
  let toggleFn = props.onToggle

  return (
    <article className="rp-card">

      <div className="rp-card-top">
        <span className="rp-label">{proj.label}</span>
        <span className="rp-module">{proj.module}</span>
      </div>

      <h2 className="rp-title">{proj.title}</h2>

      <div className="rp-tags">
        {proj.tech.map(function(techItem, idx) {
          return (
            <span className="rp-tag" key={idx}>{techItem}</span>
          )
        })}
      </div>

      <p className="rp-desc">{proj.desc}</p>

      <button
        className="rp-toggle-btn"
        onClick={function() { toggleFn(proj.id) }}
        aria-expanded={isOpen}
      >
        {isOpen ? "Hide notes ▲" : "Show notes ▼"}
      </button>

      {isOpen && (
        <div className="rp-notes">
          <span className="rp-notes-label">Notes</span>
          <p>{proj.notes}</p>
        </div>
      )}

    </article>
  )
}

export default ProjectCard
