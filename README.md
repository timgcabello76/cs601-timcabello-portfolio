# CS601 Term Project - Timothy Cabello

Boston University MET -- CS601 Frontend Web Application Development

Professor: Christian Hur

---

## What this is

A personal portfolio site built as the CS601 term project. Six weeks of coursework
covering HTML5, CSS3, JavaScript, TypeScript, and React. The site uses all of it
in a working context rather than in isolated assignments.

A grad student portfolio built by someone with 20 years in IT going through
modern front-end development formally for the first time.

## Pages

    index.html               home/landing page
    pages/about.html         bio and background
    pages/resume.html        work history, education, skills
    pages/interests.html     guitar, tech, classic TV and film
    pages/projects.html      six CS601 assignments with notes
    pages/contact.html       form with JS validation and geolocation

## File layout

    timcabello-portfolio/
    |
    ├── index.html
    ├── README.md
    |
    ├── css/
    |     style.css
    |     home.css
    |     about.css
    |     resume.css
    |     interests.css
    |     projects.css
    |     contact.css
    |
    ├── js/
    |     nav.js
    |     contact.js
    |
    ├── images/
    |     profile-photo.jpeg
    |
    ├── pages/
    |     about.html
    |     resume.html
    |     interests.html
    |     projects.html
    |     contact.html
    |
    └── react-projects/
          index.html
          vite.config.js
          package.json
          src/
            main.jsx
            App.jsx
            App.css
            projects.json
            components/
              ProjectCard.jsx
              ProjectList.jsx

---

## What I used

HTML5, CSS3, vanilla JavaScript, React 18, Vite, react-dom. Google Fonts for
typography (Syne, IBM Plex Sans, IBM Plex Mono). Contact form delivery via
EmailJS free tier. Geolocation uses the browser Geolocation API with reverse
geocoding through Nominatim (OpenStreetMap). No CSS frameworks, no UI libraries.

## Running the React section

The react-projects folder is a standalone Vite app.

    cd react-projects
    npm install
    npm run dev

Runs at http://localhost:5173 during development.

## Extra credit

Geolocation API on the contact page - detects visitor location via browser API
with a reverse geocode lookup to get the city name.

EmailJS integration on the contact form - actual form delivery through an
external API rather than just a fake success message.

---

## Validation

HTML checked at validator.w3.org
CSS checked at jigsaw.w3.org/css-validator

---

Professor: Christian Hur -- Boston University MET CS601
Timothy Cabello -- tcabello@bu.edu
