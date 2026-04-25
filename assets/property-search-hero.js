/* ================================================================
   Taathya — Property Search Page Hero Script
   ================================================================ */

(function () {
    let heroMap;
    let searched = false;
    let markers = [];

    // ---- Initialize Hero Map (Cinematic Revamp) ----
    function initHero() {
        if (!mapboxgl.accessToken) {
            // IMPORTANT: Replace the dummy key below with your actual Mapbox public token
            mapboxgl.accessToken = 'REPLACE_WITH_YOUR_MAPBOX_PUBLIC_TOKEN';
        }

        const mapContainer = document.getElementById('hero-map-bg');
        if (!mapContainer) return;

        heroMap = new mapboxgl.Map({
            container: 'hero-map-bg',
            style: 'mapbox://styles/mapbox/light-v11',
            center: [72.5279, 23.0325],
            zoom: 12.8,
            interactive: false,
            pitch: 62.5, // Deep dramatic pitch
            bearing: -15,
            antialias: true,
            attributionControl: false
        });

        heroMap.on('style.load', () => {
            // Add luxurious fog for depth
            heroMap.setFog({
                'range': [1, 10],
                'color': 'white',
                'horizon-blend': 0.1,
                'high-color': '#f2e8ec',
                'space-color': '#f8f2f4',
                'star-intensity': 0
            });
            
            renderHeroMarkers();
            startCinematicMotion();
        });
    }

    // ---- Luxury Price Markers (Injected staggered) ----
    function renderHeroMarkers() {
        // Pills removed directly per user request for a cleaner look
    }

    // ---- Buttery Smooth Cinematic Motion (requestAnimationFrame) ----
    function startCinematicMotion() {
        const rotate = () => {
            if (searched || document.body.classList.contains('searched')) return;
            
            const bearing = heroMap.getBearing();
            heroMap.setBearing(bearing + 0.04); // ultra slow rotation
            requestAnimationFrame(rotate);
        };
        rotate();
    }

    // ---- Event Bindings (Avoiding Inline JS) ----
    function bindHeroEvents() {
        // --- Custom Dropdown Logic ---
        const segments = document.querySelectorAll('.console-segment');
        segments.forEach(segment => {
            segment.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others
                segments.forEach(s => {
                    if (s !== segment) s.querySelector('.custom-dropdown-menu').classList.add('hidden');
                });
                segment.querySelector('.custom-dropdown-menu').classList.toggle('hidden');
            });
        });

        // Dropdown Item Selection
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const segment = item.closest('.console-segment');
                const selectedSpan = segment.querySelector('.selected-value');
                const val = item.dataset.value;
                const text = item.textContent;

                selectedSpan.textContent = text;
                segment.dataset.value = val;
                
                // Hide menu
                segment.querySelector('.custom-dropdown-menu').classList.add('hidden');
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        });

        // Hero Search Button
        const heroSearchBtn = document.querySelector('.search-trigger');
        if (heroSearchBtn) {
            heroSearchBtn.addEventListener('click', triggerSearch);
        }

        // Popular Shortcuts
        document.querySelectorAll('.popular-shortcut').forEach(btn => {
            btn.addEventListener('click', () => {
                const loc = btn.dataset.loc;
                const locValDisplay = document.getElementById('locValue');
                if (locValDisplay) locValDisplay.textContent = loc;
                
                const locSegment = document.getElementById('locDropdown');
                if (locSegment) locSegment.dataset.value = loc;

                triggerSearch();
            });
        });

        // Listings Filter Button
        const filtersBtn = document.getElementById('filtersBtn');
        if (filtersBtn && typeof openFiltersDrawer === 'function') {
            filtersBtn.addEventListener('click', openFiltersDrawer);
        }

        // Close Filter Drawer Buttons
        document.querySelectorAll('.close-drawer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof closeFiltersDrawer === 'function') closeFiltersDrawer();
            });
        });

        // Overlay Close
        const overlay = document.getElementById('filtersOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                if (typeof closeFiltersDrawer === 'function') closeFiltersDrawer();
            });
        }

        // Drawer Action Buttons
        const resetBtn = document.getElementById('resetFiltersBtn');
        if (resetBtn && typeof resetAdvancedFilters === 'function') {
            resetBtn.addEventListener('click', resetAdvancedFilters);
        }

        const applyBtn = document.getElementById('applyFiltersBtn');
        if (applyBtn && typeof applyAdvancedFilters === 'function') {
            applyBtn.addEventListener('click', applyAdvancedFilters);
        }
    }

    // ---- Search Transition Logic ----
    function triggerSearch() {
        if (searched) return;
        searched = true;
        
        // Locked hover for 3s to prevent accidental triggers during animation
        document.body.classList.add('searched', 'hover-locked');
        setTimeout(() => {
            document.body.classList.remove('hover-locked');
        }, 3000);

        const locValueElem = document.getElementById('locValue');
        const locVal = (locValueElem ? locValueElem.textContent : '') || '';
        
        const typeSegment = document.getElementById('typeDropdown');
        const typeVal = (typeSegment ? typeSegment.dataset.value : 'all') || 'all';

        // Interface with listings.js global state
        if (typeof searchQuery !== 'undefined') {
            searchQuery = locVal;
            const listingsSearchInput = document.getElementById('searchInput');
            if (listingsSearchInput) listingsSearchInput.value = locVal;
        }

        if (typeof activeTypeFilter !== 'undefined') {
            activeTypeFilter = typeVal;
            document.querySelectorAll('.filter-chip[data-filter]').forEach(chip => {
                chip.classList.toggle('active', chip.dataset.filter === typeVal);
            });
        }

        if (typeof renderAll === 'function') {
            renderAll();
        }

        setTimeout(() => {
            if (typeof map !== 'undefined') {
                map.resize();
                if (typeof fitMapToBounds === 'function') fitMapToBounds();
            }
        }, 800);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        initHero();
        bindHeroEvents();
    });

})();
