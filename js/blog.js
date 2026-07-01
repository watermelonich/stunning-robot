/* =========================================================
   worr4bl33hwder — blog.js
   Client-side search + tag filtering for the blog index.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
});

function initBlogFilter() {
  const searchInput = document.getElementById('blog-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-post]');
  const noResults = document.getElementById('no-results');

  if (!cards.length) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const haystack = card.getAttribute('data-search') || '';

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = haystack.toLowerCase().includes(searchTerm.toLowerCase());

      const visible = matchesCategory && matchesSearch;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle('visible', visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      applyFilters();
    });
  }

  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter');
        applyFilters();
      });
    });
  }

  applyFilters();
}
