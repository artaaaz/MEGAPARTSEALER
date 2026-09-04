/**
 * MEGAPARTSEALER — MAIN GLOBAL JAVASCRIPT
 * Marketplace navigation, navbar search, mobile drawer, promo carousel, and product card rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNavbarSearch();
  initPromoCarousel();
});

/* ==========================================================================
   NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".navbar-nav");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-active");
      if (navMenu.classList.contains("mobile-active")) {
        hamburgerBtn.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>`;
      } else {
        hamburgerBtn.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      }
    });

    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-active");
      });
    });
  }

  // Highlight active link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ==========================================================================
   NAVBAR SEARCH BAR
   ========================================================================== */
function initNavbarSearch() {
  const searchForms = document.querySelectorAll(".navbar-search-form");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='text']");
      const query = input ? input.value.trim() : "";
      if (query) {
        window.location.href = `products.html?q=${encodeURIComponent(query)}`;
      } else {
        window.location.href = `products.html`;
      }
    });
  });
}

/* ==========================================================================
   HOMEPAGE PROMO BANNER CAROUSEL
   ========================================================================== */
class PromoCarousel {
  constructor(wrapperEl) {
    this.wrapper = wrapperEl;
    if (!this.wrapper) return;

    this.track = this.wrapper.querySelector(".promo-carousel-track");
    this.slides = this.wrapper.querySelectorAll(".promo-carousel-slide");
    this.prevBtn = this.wrapper.querySelector(".promo-carousel-arrow.prev");
    this.nextBtn = this.wrapper.querySelector(".promo-carousel-arrow.next");
    this.dotsContainer = this.wrapper.querySelector(".promo-carousel-dots");
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoplayTimer = null;
    this.autoplayDelay = 4500;
    this.isPaused = false;
    
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (this.totalSlides <= 0) return;
    
    this.renderDots();
    this.bindEvents();
    this.updateSlide(0);
    this.startAutoplay();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = Array.from({ length: this.totalSlides })
      .map((_, i) => `<button type="button" class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`)
      .join("");
    
    this.dots = this.dotsContainer.querySelectorAll(".carousel-dot");
    this.dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index, 10);
        this.goToSlide(index);
      });
    });
  }

  updateSlide(index) {
    this.currentIndex = (index + this.totalSlides) % this.totalSlides;
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
    this.slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === this.currentIndex);
    });
    if (this.dots) {
      this.dots.forEach((d, idx) => {
        d.classList.toggle("active", idx === this.currentIndex);
      });
    }
  }

  nextSlide() {
    this.updateSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.updateSlide(this.currentIndex - 1);
  }

  goToSlide(index) {
    this.updateSlide(index);
    this.restartAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    if (this.totalSlides <= 1) return;
    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  bindEvents() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.nextSlide();
        this.restartAutoplay();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.prevSlide();
        this.restartAutoplay();
      });
    }

    this.wrapper.addEventListener("mouseenter", () => {
      this.isPaused = true;
    });

    this.wrapper.addEventListener("mouseleave", () => {
      this.isPaused = false;
    });

    this.wrapper.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.isPaused = true;
    }, { passive: true });

    this.wrapper.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
      this.isPaused = false;
    }, { passive: true });
  }

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.restartAutoplay();
    }
  }
}

function initPromoCarousel() {
  const carouselEl = document.querySelector(".promo-carousel-wrapper");
  if (carouselEl) {
    window.homepageCarousel = new PromoCarousel(carouselEl);
  }
}

/* ==========================================================================
   MARKETPLACE PRODUCT CARD RENDERER
   ========================================================================== */
function createProductCardHTML(p) {
  const shopeeLink = p.shopeeUrl || SHOPEE_STORE_URL || "https://id.shp.ee/gt9T94Rx";
  const machineTag = p.machine ? `<span class="product-machine-tag">${p.machine}</span>` : "";
  return `
    <div class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="product-img-box">
        <a href="product-detail.html?id=${p.id}" aria-label="${p.name}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
      </div>
      <div class="product-card-body">
        <div class="product-card-meta-top">
          <span class="product-card-category">${p.category}</span>
          ${machineTag}
        </div>
        <h3 class="product-card-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        <span class="product-stock-tag">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; margin-right:4px;"><circle cx="12" cy="12" r="10"/></svg>
          Tersedia
        </span>
        <div class="product-card-price">${formatRupiah(p.price)}</div>
        <div class="product-card-actions">
          <a href="${shopeeLink}" target="_blank" rel="noopener noreferrer" class="btn-card-shopee">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.5 7.5h-2.25V6a5.25 5.25 0 00-10.5 0v1.5H4.5A1.5 1.5 0 003 9v11.25A2.25 2.25 0 005.25 22.5h13.5A2.25 2.25 0 0021 20.25V9a1.5 1.5 0 00-1.5-1.5zM8.25 6a3.75 3.75 0 017.5 0v1.5h-7.5V6zm11.25 14.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75h2.25V12a.75.75 0 001.5 0V9.75h7.5V12a.75.75 0 001.5 0V9.75h2.25v10.5z"/>
            </svg>
            <span>Kunjungi toko ini di Shopee</span>
          </a>
          <a href="product-detail.html?id=${p.id}" class="btn-card-detail">Lihat Detail &rarr;</a>
        </div>
      </div>
    </div>
  `;
}

