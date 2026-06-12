// nav.js - mobile menu toggle and active page highlight

let menuBtn = document.getElementById('navToggle');
let navMenu = document.getElementById('navLinks');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', function() {
    let isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      navMenu.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });
}

// mark the current page link as active
let thisPage = window.location.pathname.split('/').pop();
let allNavLinks = document.querySelectorAll('.nav-links a');

for (let i = 0; i < allNavLinks.length; i++) {
  let linkHref = allNavLinks[i].getAttribute('href');
  if (linkHref == thisPage) {
    allNavLinks[i].classList.add('active');
  } else if (thisPage == '' && linkHref == 'index.html') {
    allNavLinks[i].classList.add('active');
  }
}
