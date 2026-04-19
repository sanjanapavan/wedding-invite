// =========================
// EDIT ONLY THIS SECTION
// =========================
const inviteData = {
  brideName: "Sanjana",
  groomName: "Pavan",
  weddingDate: "2026-08-24T08:00:00-05:00",
  displayDate: "August 24, 2026 • 8:00 AM CST",
  coverDate: "Monday, August 24, 2026",
  mainVenue: "Wedding Ceremony Venue to be Updated",
  weddingLine: "Together with their families, invite you to celebrate their wedding festivities",
  storyText: "With the blessings of our parents and joy in our hearts, we warmly invite you to celebrate our wedding and the beautiful moments leading up to it.",
  brideParents: "Yogananda & Sireesha",
  groomParents: "Rajendra Reddy & Ratna",
  footerText: "We would be delighted to celebrate this special occasion with you.",
  whatsappNumber: "16608699593",
  mapLink: "https://maps.google.com/?q=Grandion",
  videoLink: "#",
  liveLink: "#",
  galleryImages: [
    "assets/image3.jpeg",
    "assets/image4.jpeg",
    "assets/image5.jpeg",
    "assets/image6.jpeg"
  ],
  groomImage: "assets/image1.jpeg",
  brideImage: "assets/image2.jpeg",
  events: [
    {
      title: "Sangeet",
      date: "August 21, 2026",
      time: "6:30 PM CST",
      venue: "Grandion",
      map: "https://maps.google.com/?q=Grandion"
    },
    {
      title: "Haldi",
      date: "August 22, 2026",
      time: "10:00 AM CST",
      venue: "Venue details to be updated"
    },
    {
      title: "Mehendi",
      date: "August 22, 2026",
      time: "7:00 PM CST",
      venue: "Venue details to be updated"
    },
    {
      title: "Pellikuthuru / Pellikoduku",
      date: "August 23, 2026",
      time: "4:00 PM CST",
      venue: "Venue details to be updated"
    },
    {
      title: "Wedding",
      date: "August 24, 2026",
      time: "8:00 AM CST",
      venue: "Wedding venue to be updated"
    }
  ]
};
// =========================
// STOP EDITING HERE
// =========================

const $ = (id) => document.getElementById(id);
let currentGalleryIndex = 0;
let galleryTimer;

function safeText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function fillText() {
  const couple = `${inviteData.groomName} & ${inviteData.brideName}`;
  $("coverCoupleNames").innerHTML = `${inviteData.groomName} <span>&</span> ${inviteData.brideName}`;
  $("coupleNames").innerHTML = `${inviteData.groomName} <span>&</span> ${inviteData.brideName}`;
  safeText("coverWeddingDate", inviteData.coverDate);
  safeText("coverVenueText", inviteData.mainVenue);
  safeText("weddingDateTime", inviteData.displayDate);
  safeText("mainVenue", inviteData.mainVenue);
  safeText("weddingLine", inviteData.weddingLine);
  safeText("footerText", inviteData.footerText);
  safeText("groomNameCard", inviteData.groomName);
  safeText("brideNameCard", inviteData.brideName);
  safeText("groomParents", inviteData.groomParents);
  safeText("brideParents", inviteData.brideParents);
  $("groomImage").src = inviteData.groomImage || inviteData.galleryImages[0];
  $("brideImage").src = inviteData.brideImage || inviteData.galleryImages[1] || inviteData.galleryImages[0];
  document.title = `${couple} Wedding Invite`;
}

function renderEvents() {
  const container = $("eventsContainer");
  container.innerHTML = inviteData.events.map((event, index) => `
    <article class="event-card royal-frame slim-frame">
      <div class="event-count">${String(index + 1).padStart(2, "0")}</div>
      <h3>${event.title}</h3>
      <p>${event.date}</p>
      <p>${event.time}</p>
      <p>${event.venue}</p>
      <div class="event-actions">
        ${event.map ? `<a class="mini-btn" href="${event.map}" target="_blank" rel="noopener">Get Directions</a>` : ``}
      </div>
    </article>
  `).join("");
}

function buildSlideshowMarkup() {
  return inviteData.galleryImages.map((src, index) => `
    <div class="slide ${index === 0 ? "active" : ""}" style="background-image:url('${src}')"></div>
  `).join("");
}

function renderGallery() {
  const showcase = $("galleryShowcase");
  const thumbs = $("galleryThumbs");
  const first = inviteData.galleryImages[0] || "assets/image1.jpg";

  showcase.innerHTML = `
    <div class="showcase-card royal-frame">
      <img id="showcaseImage" src="${first}" alt="Wedding photo" />
      <div class="showcase-caption">
        <p class="eyebrow">Beautiful moments</p>
        <h3>${inviteData.groomName} & ${inviteData.brideName}</h3>
      </div>
    </div>
  `;

  thumbs.innerHTML = inviteData.galleryImages.map((src, index) => `
    <button class="thumb-btn ${index === 0 ? "active" : ""}" data-index="${index}" type="button">
      <img src="${src}" alt="Gallery image ${index + 1}" />
    </button>
  `).join("");

  thumbs.querySelectorAll(".thumb-btn").forEach(button => {
    button.addEventListener("click", () => setGalleryImage(Number(button.dataset.index)));
  });
}

function setGalleryImage(index) {
  currentGalleryIndex = index;
  const image = $("showcaseImage");
  if (image) image.src = inviteData.galleryImages[index];
  document.querySelectorAll(".thumb-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}

function startGalleryAutoplay() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => {
    if (!inviteData.galleryImages.length) return;
    const nextIndex = (currentGalleryIndex + 1) % inviteData.galleryImages.length;
    setGalleryImage(nextIndex);
  }, 3200);
}

function setupSlideshows() {
  $("coverSlideshow").innerHTML = buildSlideshowMarkup();
  $("heroSlideshow").innerHTML = buildSlideshowMarkup();

  let index = 0;
  const coverSlides = Array.from(document.querySelectorAll("#coverSlideshow .slide"));
  const heroSlides = Array.from(document.querySelectorAll("#heroSlideshow .slide"));
  setInterval(() => {
    if (!inviteData.galleryImages.length) return;
    index = (index + 1) % inviteData.galleryImages.length;
    [...coverSlides, ...heroSlides].forEach((slide, slideIndex) => {
      const realIndex = slideIndex % inviteData.galleryImages.length;
      slide.classList.toggle("active", realIndex === index);
    });
  }, 4000);
}

function setupLinks() {
  $("videoButton").href = inviteData.videoLink || '#';
  $("liveButton").href = inviteData.liveLink || '#';
  const couple = `${inviteData.groomName} & ${inviteData.brideName}`;
  const msg = encodeURIComponent(`Hello! I would love to RSVP for the wedding of ${couple}.`);
  $("rsvpButton").href = `https://wa.me/${inviteData.whatsappNumber}?text=${msg}`;
}

function startCountdown() {
  const target = new Date(inviteData.weddingDate).getTime();
  const container = $("countdown");

  function update() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      container.innerHTML = `<div class="time-box" style="grid-column: 1/-1;"><div class="value">It's Celebration Time!</div></div>`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    container.innerHTML = [[days, 'Days'], [hours, 'Hours'], [minutes, 'Minutes'], [seconds, 'Seconds']].map(([value, label]) => `
      <div class="time-box">
        <div class="value">${value}</div>
        <div class="label">${label}</div>
      </div>
    `).join('');
  }

  update();
  setInterval(update, 1000);
}

function burstGlitter(count = 50) {
  const layer = $("glitterLayer");
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'glitter';
    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.animationDuration = `${3 + Math.random() * 3}s`;
    dot.style.animationDelay = `${Math.random() * 0.4}s`;
    dot.style.opacity = String(.5 + Math.random() * .5);
    dot.style.transform = `scale(${.6 + Math.random()})`;
    layer.appendChild(dot);
    setTimeout(() => dot.remove(), 7000);
  }
}

function setupMusic() {
  const music = $("bgMusic");
  const button = $("musicToggle");
  const status = $("musicStatus");

  music.addEventListener('error', () => {
    if (status) status.textContent = 'Music file missing. Add assets/music.mp3';
  });

  button.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        button.textContent = "Pause Music";
        if (status) status.textContent = 'Music is playing';
      } else {
        music.pause();
        button.textContent = "Play Music";
        if (status) status.textContent = 'Music is paused';
      }
    } catch (e) {
      if (status) status.textContent = 'Unable to play music. Add assets/music.mp3';
      console.warn("Music playback failed:", e);
    }
  });
}

function setupOpenInvite() {
  $("openInviteBtn").addEventListener("click", async () => {
    burstGlitter(70);
    $("cover").classList.add("fade-out");
    setTimeout(() => {
      $("cover").style.display = "none";
      $("mainContent").classList.remove("hidden");
    }, 650);

    const music = $("bgMusic");
    const status = $("musicStatus");
    try {
      await music.play();
      $("musicToggle").textContent = "Pause Music";
      if (status) status.textContent = 'Music is playing';
    } catch (e) {
      $("musicToggle").textContent = "Play Music";
      if (status) status.textContent = 'Add your song as assets/music.mp3';
    }
  });
}

fillText();
renderEvents();
renderGallery();
setupSlideshows();
setupLinks();
startCountdown();
setupMusic();
setupOpenInvite();
startGalleryAutoplay();
