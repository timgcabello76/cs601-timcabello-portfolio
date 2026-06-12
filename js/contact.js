// contact.js - geolocation (extra credit), form validation, emailjs delivery

let locBtn = document.getElementById("geoBtn");
let locDisplay = document.getElementById("geoResult");

// geolocation only runs on button click - optional extra credit feature
if (locBtn) {
  locDisplay.textContent = "--";
  locBtn.style.display = "inline-block";

  locBtn.addEventListener("click", function () {
    locDisplay.textContent = "checking...";
    locBtn.style.display = "none";
    runGeoLookup();
  });
}

function runGeoLookup() {
  if (!navigator.geolocation) {
    locDisplay.textContent = "not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;

      let url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lng + "&format=json";

      fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.address) {
            locDisplay.textContent = "unknown location";
            return;
          }

          let addr = data.address;
          let city = "";

          if (addr.city) {
            city = addr.city;
          } else if (addr.town) {
            city = addr.town;
          } else if (addr.village) {
            city = addr.village;
          } else if (addr.county) {
            city = addr.county;
          } else {
            city = "somewhere";
          }

          locDisplay.textContent = addr.state ? city + ", " + addr.state : city;
        })
        .catch(function () {
          locDisplay.textContent = "lookup failed";
          if (locBtn) locBtn.style.display = "inline-block";
        });
    },
    function () {
      locDisplay.textContent = "not available";
      if (locBtn) locBtn.style.display = "inline-block";
    },
    { timeout: 8000 }
  );
}


// form setup
let contactForm = document.getElementById("contactForm");
let formSection = document.getElementById("formWrap");
let successBox = document.getElementById("successMsg");
let successText = document.getElementById("successText");

// clear field error when user types
let formFields = document.querySelectorAll("#contactForm input, #contactForm textarea");
for (let i = 0; i < formFields.length; i++) {
  formFields[i].addEventListener("input", function () {
    clearError(this.id);
  });
}

function markError(fieldId, msg) {
  let errEl = document.getElementById(fieldId + "Err");
  let fldEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = msg;
  if (fldEl) fldEl.classList.add("field-invalid");
}

function clearError(fieldId) {
  let errEl = document.getElementById(fieldId + "Err");
  let fldEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = "";
  if (fldEl) fldEl.classList.remove("field-invalid");
}

function checkEmail(val) {
  let parts = val.split("@");
  if (parts.length != 2) return false;
  if (parts[0].length == 0) return false;
  if (parts[1].indexOf(".") == -1) return false;
  if (parts[1].length < 3) return false;
  return true;
}

function buildMsgData(fname, lname, email, subject, msg) {
  return {
    from_name: fname + " " + lname,
    from_email: email,
    subject: subject,
    message: msg
  };
}

function showSuccess(fname) {
  formSection.style.display = "none";
  successBox.style.display = "block";
  successText.textContent = "Got it, " + fname + ". I will get back to you.";
}

function showSendError(btn) {
  btn.textContent = "Send Message";
  btn.disabled = false;
  formSection.style.display = "none";
  successBox.style.display = "block";
  successBox.classList.add("success-box--error");
  let headEl = document.getElementById("successHead");
  if (headEl) headEl.textContent = "Could not send.";
  successText.textContent = "The form could not send right now. Please email me directly at tim@timcabello.com";
}

function sendContactEmail(msgData, fname, btn) {
  let svcId = "service_2bje4r8";
  let tplId = "template_pi3q50s";
  let pubKey = "ZET0G3JRPOlLs6ho0";

  emailjs.init(pubKey);
  emailjs.send(svcId, tplId, msgData)
    .then(function () {
      showSuccess(fname);
    })
    .catch(function () {
      showSendError(btn);
    });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let msg = document.getElementById("message").value.trim();
    let consent = document.getElementById("consent").checked;

    let valid = true;

    let fields = ["fname", "lname", "email", "message", "consent"];
    for (let j = 0; j < fields.length; j++) {
      clearError(fields[j]);
    }

    if (fname.length < 2) {
      markError("fname", "First name needs at least 2 characters.");
      valid = false;
    }

    if (lname.length < 2) {
      markError("lname", "Last name needs at least 2 characters.");
      valid = false;
    }

    if (email.length == 0) {
      markError("email", "Email address is required.");
      valid = false;
    } else if (!checkEmail(email)) {
      markError("email", "That email address does not look right.");
      valid = false;
    }

    if (msg.length < 10) {
      markError("message", "Message is too short, needs at least 10 characters.");
      valid = false;
    }

    if (consent == false) {
      markError("consent", "Please check the box to continue.");
      valid = false;
    }

    if (valid == false) return;

    let btn = document.getElementById("submitBtn");
    btn.textContent = "Sending...";
    btn.disabled = true;

    let msgData = buildMsgData(fname, lname, email, subject, msg);
    sendContactEmail(msgData, fname, btn);
  });
}
