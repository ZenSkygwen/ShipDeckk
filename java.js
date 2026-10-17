/**
 * ShipDecKK - Interactive Experience & Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".navigation");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside or on a link
    document.querySelectorAll(".navigation a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. Header Glassmorphism on Scroll
  const header = document.querySelector(".header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Gallery Filtering and Search
  const filterBtns = document.querySelectorAll(".filter-btn");
  const shipCards = document.querySelectorAll(".soldyacht, .soldship");
  const searchInput = document.getElementById("gallerySearch");
  const noResults = document.getElementById("noResults");

  function applyFilters() {
    if (!shipCards.length) return;

    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeBtn ? activeBtn.getAttribute("data-category") : "all";
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let visibleCount = 0;

    shipCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category") || "all";
      const cardTitle = (card.querySelector(".yachtname, .shipname")?.textContent || "").toLowerCase();
      const cardDesc = (card.querySelector("p")?.textContent || "").toLowerCase();

      const matchesCategory = activeCategory === "all" || cardCategory === activeCategory;
      const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        card.classList.add("fade-in");
        visibleCount++;
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });

    // Also toggle section headers in gallery if all items under them are hidden
    document.querySelectorAll(".gallery-section").forEach((section) => {
      const visibleInSection = section.querySelectorAll(".soldyacht[style*='display: flex']").length;
      if (activeCategory === "all" && !searchQuery) {
        section.style.display = "block";
      } else {
        section.style.display = visibleInSection > 0 ? "block" : "none";
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});

// 5. Luxury Toast & Modal Notification System
function showToast(message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type} slide-in`;
  toast.innerHTML = `
    <div class="toast-icon">${type === "success" ? "✓" : "!"}</div>
    <div class="toast-content">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// 6. Subscription Form Validation with Modern UX
function validation(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const ageInput = document.getElementById("age");
  const male = document.getElementById("male")?.checked;
  const female = document.getElementById("female")?.checked;
  const agree = document.getElementById("agree")?.checked;

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";
  const age = ageInput ? parseInt(ageInput.value, 10) : 0;

  if (!name || !email || !password || !ageInput.value) {
    showToast("Please fill in all required fields.", "error");
    return false;
  }

  if (/\d/.test(name)) {
    showToast("Full name cannot contain numerical digits.", "error");
    nameInput?.focus();
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Please provide a valid email address.", "error");
    emailInput?.focus();
    return false;
  }

  if (isNaN(age) || age < 1 || age > 120) {
    showToast("Please enter a valid age between 1 and 120.", "error");
    ageInput?.focus();
    return false;
  }

  if (password.length <= 5) {
    showToast("Password must be at least 6 characters long.", "error");
    passwordInput?.focus();
    return false;
  }

  if (!male && !female) {
    showToast("Please select your gender.", "error");
    return false;
  }

  if (!agree) {
    showToast("You must agree to the terms and conditions to join.", "error");
    return false;
  }

  // Success Confirmation Modal
  const modal = document.createElement("div");
  modal.className = "luxury-modal-backdrop";
  modal.innerHTML = `
    <div class="luxury-modal">
      <div class="modal-gold-crest">⚓</div>
      <h3>Welcome to the ShipDecKK Family</h3>
      <p class="modal-subtitle">Dear <strong>${name}</strong>, your exclusive maritime subscription is now active.</p>
      <div class="modal-details">
        <p>A confirmation dossier has been dispatched to <strong>${email}</strong>.</p>
      </div>
      <button class="btn btn-primary" id="confirmModalBtn">Enter Home Fleet</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("confirmModalBtn").addEventListener("click", () => {
    modal.classList.add("modal-closing");
    setTimeout(() => {
      modal.remove();
      window.location.href = "index.html";
    }, 300);
  });

  return false;
}
