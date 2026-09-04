/**
 * MEGAPARTSEALER — MAIN GLOBAL JAVASCRIPT
 * Marketplace navigation, navbar search, mobile drawer, and product card rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNavbarSearch();
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
   MARKETPLACE PRODUCT CARD RENDERER
   ========================================================================== */
function createProductCardHTML(p) {
  const shopeeLink = p.shopeeUrl || SHOPEE_STORE_URL || "https://id.shp.ee/gt9T94Rx";
  return `
    <div class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="product-img-box">
        <a href="product-detail.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${p.category}</span>
        <h3 class="product-card-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        <span class="product-stock-tag">Tersedia</span>
        <div class="product-card-price">${formatRupiah(p.price)}</div>
        <div class="product-card-actions">
          <a href="${shopeeLink}" target="_blank" rel="noopener noreferrer" class="btn-card-shopee">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display:inline-block; vertical-align:-2px; margin-right:4px;">
              <path d="M19.5 7.5h-2.25V6a5.25 5.25 0 00-10.5 0v1.5H4.5A1.5 1.5 0 003 9v11.25A2.25 2.25 0 005.25 22.5h13.5A2.25 2.25 0 0021 20.25V9a1.5 1.5 0 00-1.5-1.5zM8.25 6a3.75 3.75 0 017.5 0v1.5h-7.5V6zm11.25 14.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75h2.25V12a.75.75 0 001.5 0V9.75h7.5V12a.75.75 0 001.5 0V9.75h2.25v10.5z"/>
            </svg>
            Kunjungi toko ini di Shopee
          </a>
          <a href="product-detail.html?id=${p.id}" class="btn-card-detail">Lihat Detail &rarr;</a>
        </div>
      </div>
    </div>
  `;
}
