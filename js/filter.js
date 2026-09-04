/**
 * MEGAPARTSEALER — PRODUCT SEARCH & CATEGORY FILTER ENGINE
 * Real-time filter by category pills & keyword search (supports FS-500, Kawat, Teflon, etc.)
 */

class MarketplaceFilterEngine {
  constructor() {
    this.allProducts = getAllProducts();
    this.currentCategory = "Semua";
    this.searchQuery = "";

    this.gridContainer = document.getElementById("productGridContainer");
    this.filterContainer = document.getElementById("categoryFilterNav");
    this.emptyState = document.getElementById("emptyStateContainer");
    this.searchInput = document.getElementById("catalogSearchInput");
    this.searchForm = document.getElementById("catalogSearchForm");
    this.resultCountEl = document.getElementById("catalogResultCount");

    this.init();
  }

  init() {
    this.parseURL();
    this.renderFilterPills();
    this.bindEvents();
    this.applyFilter();
  }

  parseURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has("cat")) {
      const catParam = urlParams.get("cat");
      const found = getCategories().find(c => c.name.toLowerCase() === catParam.toLowerCase());
      if (found) {
        this.currentCategory = found.name;
      }
    }

    if (urlParams.has("q")) {
      this.searchQuery = urlParams.get("q").trim();
      if (this.searchInput) {
        this.searchInput.value = this.searchQuery;
      }
    }
  }

  renderFilterPills() {
    if (!this.filterContainer) return;
    const cats = getCategories();

    this.filterContainer.innerHTML = cats.map(cat => {
      const isActive = cat.name.toLowerCase() === this.currentCategory.toLowerCase();
      return `
        <button type="button" class="filter-btn-pill ${isActive ? 'active' : ''}" data-category="${cat.name}">
          ${cat.name}
        </button>
      `;
    }).join("");

    this.filterContainer.querySelectorAll(".filter-btn-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentCategory = btn.dataset.category;
        this.filterContainer.querySelectorAll(".filter-btn-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.syncURL();
        this.applyFilter();
      });
    });
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        this.syncURL();
        this.applyFilter();
      });
    }

    if (this.searchForm) {
      this.searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.applyFilter();
      });
    }
  }

  syncURL() {
    const params = new URLSearchParams();
    if (this.currentCategory !== "Semua") {
      params.set("cat", this.currentCategory);
    }
    if (this.searchQuery) {
      params.set("q", this.searchQuery);
    }

    const queryStr = params.toString();
    const newUrl = queryStr ? `?${queryStr}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }

  applyFilter() {
    let result = [...this.allProducts];

    // 1. Category Filter
    if (this.currentCategory !== "Semua") {
      result = result.filter(p => p.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    // 2. Keyword Search (supports product name, machine e.g. FS-500, size, category, description)
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchMachine = p.machine && p.machine.toLowerCase().includes(q);
        const matchSize = p.size && p.size.toLowerCase().includes(q);
        const matchDesc = p.description && p.description.toLowerCase().includes(q);
        return matchName || matchCategory || matchMachine || matchSize || matchDesc;
      });
    }

    if (this.resultCountEl) {
      this.resultCountEl.textContent = `Menampilkan ${result.length} produk`;
    }

    if (!this.gridContainer) return;

    if (result.length === 0) {
      this.gridContainer.innerHTML = "";
      if (this.emptyState) this.emptyState.style.display = "block";
    } else {
      if (this.emptyState) this.emptyState.style.display = "none";
      this.gridContainer.innerHTML = result.map(p => createProductCardHTML(p)).join("");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("categoryFilterNav") || document.getElementById("productGridContainer")) {
    window.marketplaceFilter = new MarketplaceFilterEngine();
  }
});
