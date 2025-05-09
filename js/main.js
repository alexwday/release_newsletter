document.addEventListener('DOMContentLoaded', function() {
  // Tab navigation functionality
  const tabs = document.querySelectorAll('.tab-nav button');
  const newsTiles = document.querySelectorAll('.news-tile');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      const bankFilter = this.getAttribute('data-bank');
      
      // Filter news tiles based on selected bank
      newsTiles.forEach(tile => {
        if (bankFilter === 'all' || tile.getAttribute('data-bank') === bankFilter) {
          tile.style.display = 'block';
        } else {
          tile.style.display = 'none';
        }
      });
      
      // Update visible date headers
      updateDateHeaders();
    });
  });
  
  // Filter chips functionality
  const filterChips = document.querySelectorAll('.filter-chip');
  
  filterChips.forEach(chip => {
    chip.addEventListener('click', function() {
      this.classList.toggle('active');
      applyFilters();
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    newsTiles.forEach(tile => {
      const tileText = tile.textContent.toLowerCase();
      if (tileText.includes(searchTerm)) {
        if (tile.style.display !== 'none') {
          tile.style.display = 'block';
        }
      } else {
        tile.style.display = 'none';
      }
    });
    
    updateDateHeaders();
  }
  
  searchButton.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
  
  function applyFilters() {
    const activeFilters = Array.from(document.querySelectorAll('.filter-chip.active'))
      .map(chip => chip.getAttribute('data-category'));
    
    const activeBankTab = document.querySelector('.tab-nav button.active')
      .getAttribute('data-bank');
    
    newsTiles.forEach(tile => {
      const tileBank = tile.getAttribute('data-bank');
      const tileCategory = tile.getAttribute('data-category');
      
      let bankMatch = activeBankTab === 'all' || tileBank === activeBankTab;
      let categoryMatch = activeFilters.length === 0 || activeFilters.includes(tileCategory);
      
      if (bankMatch && categoryMatch) {
        tile.style.display = 'block';
      } else {
        tile.style.display = 'none';
      }
    });
    
    updateDateHeaders();
  }
  
  function updateDateHeaders() {
    // Get all date headers
    const dateHeaders = document.querySelectorAll('.date-header');
    
    dateHeaders.forEach(header => {
      const dateGroup = header.nextElementSibling;
      const visibleTiles = dateGroup.querySelectorAll('.news-tile[style="display: block"]');
      
      if (visibleTiles.length > 0) {
        header.style.display = 'block';
      } else {
        header.style.display = 'none';
      }
    });
  }
});