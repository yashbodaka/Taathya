/* ================================================================
   Taathya — Listings Page Script
   ================================================================ */

// ---- Mapbox Token ----
mapboxgl.accessToken = 'REPLACE_WITH_YOUR_MAPBOX_TOKEN';

// ---- Dummy Property Data (18 properties across Ahmedabad) ----
const PROPERTIES = [
    {
        id: 1,
        name: "Shivalik Harmony",
        location: "Ambli Road, Ahmedabad",
        price: "₹4.50 Cr",
        priceNum: 4.5,
        type: "Villa",
        status: "Ready to Move",
        bhk: 4,
        area: "4200 sq.ft",
        facing: "East",
        badge: "Premium",
        lat: 23.0258,
        lng: 72.5065,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Parking", "Security"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate",
        configs: [
            { bhk: 3, price: "3.25 Cr", priceNum: 3.25, area: "2800 sq.ft", facing: "East" },
            { bhk: 4, price: "4.50 Cr", priceNum: 4.5, area: "4200 sq.ft", facing: "East" }
        ]
    },
    {
        id: 2,
        name: "Gala Aria",
        location: "SG Highway, Ahmedabad",
        price: "₹1.85 Cr",
        priceNum: 1.85,
        type: "Apartment",
        status: "Ready to Move",
        bhk: 3,
        area: "1850 sq.ft",
        facing: "West",
        badge: "Hot",
        lat: 23.0350,
        lng: 72.5110,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Power Backup"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate",
        configs: [
            { bhk: 2, price: "1.25 Cr", priceNum: 1.25, area: "1350 sq.ft", facing: "West" },
            { bhk: 3, price: "1.85 Cr", priceNum: 1.85, area: "1850 sq.ft", facing: "West" }
        ]
    },
    {
        id: 3,
        name: "Sun South Park",
        location: "Bopal, Ahmedabad",
        price: "₹95 L",
        priceNum: 0.95,
        type: "Apartment",
        status: "Ready to Move",
        bhk: 2,
        area: "1150 sq.ft",
        facing: "North",
        badge: "New",
        lat: 23.0120,
        lng: 72.4720,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        amenities: ["Garden", "Parking", "Security", "Children Play Area"],
        verified: false,
        tag: "Ready to Move",
        possession: "immediate",
        configs: [
            { bhk: 2, price: "95 L", priceNum: 0.95, area: "1150 sq.ft", facing: "North" },
            { bhk: 3, price: "1.35 Cr", priceNum: 1.35, area: "1550 sq.ft", facing: "North" }
        ]
    },
    {
        id: 4,
        name: "Savvy Swaraaj",
        location: "Prahlad Nagar, Ahmedabad",
        price: "₹2.10 Cr",
        priceNum: 2.10,
        type: "Apartment",
        status: "Ready to Move",
        bhk: 3,
        area: "2100 sq.ft",
        facing: "South",
        badge: "Premium",
        lat: 23.0145,
        lng: 72.5230,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Parking", "Security", "Power Backup"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate",
        configs: [
            { bhk: 3, price: "2.10 Cr", priceNum: 2.10, area: "2100 sq.ft", facing: "South" },
            { bhk: 4, price: "2.75 Cr", priceNum: 2.75, area: "2650 sq.ft", facing: "South" }
        ]
    },
    {
        id: 5,
        name: "The Address",
        location: "Vastrapur, Ahmedabad",
        price: "₹3.75 Cr",
        priceNum: 3.75,
        type: "Penthouse",
        status: "Ready to Move",
        bhk: 4,
        area: "3800 sq.ft",
        facing: "East",
        badge: "Premium",
        lat: 23.0380,
        lng: 72.5260,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Parking", "Security", "Power Backup"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate"
    },
    {
        id: 6,
        name: "Ratna Paradise",
        location: "Bodakdev, Ahmedabad",
        price: "₹1.45 Cr",
        priceNum: 1.45,
        type: "Apartment",
        status: "Upcoming",
        bhk: 3,
        area: "1600 sq.ft",
        facing: "West",
        badge: "Upcoming",
        lat: 23.0430,
        lng: 72.5120,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        amenities: ["Gym", "Parking", "Security", "Children Play Area"],
        verified: false,
        tag: "Upcoming",
        possession: "1year"
    },
    {
        id: 7,
        name: "Rajhans Elanza",
        location: "Satellite, Ahmedabad",
        price: "₹2.80 Cr",
        priceNum: 2.80,
        type: "Villa",
        status: "Pre-launch",
        bhk: 4,
        area: "3200 sq.ft",
        facing: "North-East",
        badge: "New",
        lat: 23.0175,
        lng: 72.5310,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Club House", "Garden", "Parking", "Security"],
        verified: true,
        tag: "Pre-launch",
        possession: "2years"
    },
    {
        id: 8,
        name: "Siddhi Skyline",
        location: "Thaltej, Ahmedabad",
        price: "₹1.20 Cr",
        priceNum: 1.20,
        type: "Apartment",
        status: "Ready to Move",
        bhk: 2,
        area: "1300 sq.ft",
        facing: "South-West",
        badge: "Hot",
        lat: 23.0490,
        lng: 72.5000,
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=300&fit=crop",
        amenities: ["Gym", "Parking", "Power Backup", "Security"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate"
    },
    {
        id: 9,
        name: "Saubhagya Elite",
        location: "Ambli Road, Ahmedabad",
        price: "₹6.20 Cr",
        priceNum: 6.20,
        type: "Penthouse",
        status: "Pre-launch",
        bhk: 5,
        area: "5500 sq.ft",
        facing: "North",
        badge: "Premium",
        lat: 23.0285,
        lng: 72.5045,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Parking", "Security", "Power Backup", "Children Play Area"],
        verified: true,
        tag: "Pre-launch",
        possession: "2years"
    },
    {
        id: 10,
        name: "Goyal Riviera",
        location: "SG Highway, Ahmedabad",
        price: "₹72 L",
        priceNum: 0.72,
        type: "Apartment",
        status: "Ready to Move",
        bhk: 1,
        area: "750 sq.ft",
        facing: "East",
        badge: "Hot",
        lat: 23.0315,
        lng: 72.5185,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
        amenities: ["Parking", "Security"],
        verified: false,
        tag: "Ready to Move",
        possession: "immediate"
    },
    {
        id: 11,
        name: "Saanvi Skies",
        location: "Bopal, Ahmedabad",
        price: "₹1.65 Cr",
        priceNum: 1.65,
        type: "Apartment",
        status: "Upcoming",
        bhk: 3,
        area: "1750 sq.ft",
        facing: "West",
        badge: "Upcoming",
        lat: 23.0085,
        lng: 72.4695,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Garden", "Parking", "Security", "Power Backup"],
        verified: true,
        tag: "Upcoming",
        possession: "6months"
    },
    {
        id: 12,
        name: "Green Acres",
        location: "Prahlad Nagar, Ahmedabad",
        price: "₹5.50 Cr",
        priceNum: 5.50,
        type: "Villa",
        status: "Ready to Move",
        bhk: 5,
        area: "4800 sq.ft",
        facing: "North-East",
        badge: "Premium",
        lat: 23.0160,
        lng: 72.5180,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Parking", "Security", "Power Backup"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate"
    },
    {
        id: 13,
        name: "Sun Skypark",
        location: "Bodakdev, Ahmedabad",
        price: "₹88 L",
        priceNum: 0.88,
        type: "Apartment",
        status: "Upcoming",
        bhk: 2,
        area: "1050 sq.ft",
        facing: "South",
        badge: "New",
        lat: 23.0455,
        lng: 72.5075,
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop",
        amenities: ["Gym", "Parking", "Security", "Children Play Area"],
        verified: false,
        tag: "Upcoming",
        possession: "1year"
    },
    {
        id: 14,
        name: "Amrapali Terrace",
        location: "Vastrapur, Ahmedabad",
        price: "₹2.45 Cr",
        priceNum: 2.45,
        type: "Penthouse",
        status: "Ready to Move",
        bhk: 3,
        area: "2800 sq.ft",
        facing: "East",
        badge: "Hot",
        lat: 23.0360,
        lng: 72.5315,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Club House", "Parking", "Security", "Power Backup"],
        verified: true,
        tag: "Ready to Move",
        possession: "immediate"
    },
    {
        id: 15,
        name: "Shilaj Meadows",
        location: "Thaltej, Ahmedabad",
        price: "₹45 L",
        priceNum: 0.45,
        type: "Plot",
        status: "Ready to Move",
        bhk: 0,
        area: "2400 sq.ft",
        facing: "North",
        badge: "New",
        lat: 23.0520,
        lng: 72.4945,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
        amenities: ["Garden", "Security"],
        verified: false,
        tag: "Ready to Move",
        possession: "immediate"
    },
    {
        id: 16,
        name: "Parshwa Luxuria",
        location: "Satellite, Ahmedabad",
        price: "₹3.25 Cr",
        priceNum: 3.25,
        type: "Villa",
        status: "Pre-launch",
        bhk: 4,
        area: "3500 sq.ft",
        facing: "West",
        badge: "Upcoming",
        lat: 23.0200,
        lng: 72.5360,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Parking", "Security", "Power Backup", "Children Play Area"],
        verified: true,
        tag: "Pre-launch",
        possession: "2years"
    },
    {
        id: 17,
        name: "Satyam Skyview",
        location: "SG Highway, Ahmedabad",
        price: "₹1.10 Cr",
        priceNum: 1.10,
        type: "Apartment",
        status: "Upcoming",
        bhk: 2,
        area: "1200 sq.ft",
        facing: "South-East",
        badge: "New",
        lat: 23.0380,
        lng: 72.5150,
        image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=400&h=300&fit=crop",
        amenities: ["Gym", "Parking", "Security", "Power Backup"],
        verified: false,
        tag: "Upcoming",
        possession: "6months"
    },
    {
        id: 18,
        name: "Arista Living",
        location: "Ambli Road, Ahmedabad",
        price: "₹7.80 Cr",
        priceNum: 7.80,
        type: "Villa",
        status: "Pre-launch",
        bhk: 5,
        area: "6200 sq.ft",
        facing: "North-West",
        badge: "Premium",
        lat: 23.0240,
        lng: 72.5020,
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
        amenities: ["Swimming Pool", "Gym", "Club House", "Garden", "Parking", "Security", "Power Backup", "Children Play Area"],
        verified: true,
        tag: "Pre-launch",
        possession: "2years"
    }
];

// ---- State ----
let filteredProperties = [...PROPERTIES];
let activeTypeFilter = 'all';
let activeStatusFilter = null;
let searchQuery = '';
let sortOrder = null; // null | 'asc' | 'desc'
let markers = [];
let activePopup = null;
let highlightedCardId = null;
let wishlist = new Set();
let map;

// Config state for BHK switcher
let activeConfigs = {}; // { propertyId: configIndex }

// Hover-intent debounce — prevents accidental micro-hovers from firing
let hoverIntentTimer = null;
let isZoomedOut = false; // kept in sync with map zoom events
let hasClickZoomed = false; // true while map is zoomed in from a pill/card click

// Advanced filter state
let advBudgetMin = 0;
let advBudgetMax = 50;
let advBHK = 'any';
let advPossession = 'any';
let advAmenities = [];

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    bindEvents();
    renderAll();
});

function switchConfig(e, propertyId, configIndex) {
    if (e) e.stopPropagation();
    activeConfigs[propertyId] = configIndex;
    
    const prop = PROPERTIES.find(p => p.id === propertyId);
    const config = prop.configs[configIndex];
    
    const card = document.querySelector(`.property-card[data-id="${propertyId}"]`);
    if (card) {
        // Price
        const priceEl = card.querySelector('.card-price');
        if (priceEl) priceEl.textContent = config.price;

        // Area
        const areaEl = card.querySelector('.stat-chip[data-stat="area"] span:last-child');
        if (areaEl) areaEl.textContent = config.area;

        // Facing
        const facingEl = card.querySelector('.stat-chip[data-stat="facing"] span:last-child');
        if (facingEl) facingEl.textContent = config.facing;

        // Cashback
        const cashbackEl = card.querySelector('.cashback-amount');
        if (cashbackEl) {
            const cashback = Math.round(config.priceNum * 10000000 * 0.005);
            cashbackEl.textContent = `₹${cashback.toLocaleString('en-IN')}`;
        }

        // Toggle UI
        const pills = card.querySelectorAll('.bhk-pill');
        pills.forEach((p, idx) => {
            p.classList.toggle('active', idx === configIndex);
        });
    }
}

// ================================================================
// MAP
// ================================================================
function initMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [72.512, 23.030],
        zoom: 12.5,
        pitch: 0,
        attributionControl: false
    });

    // Normal Mapbox controls
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
        renderMarkers();
        fitMapToBounds();
        
        // Ensure map layout is recalculated after our padding/styling application
        setTimeout(() => map.resize(), 300);
    });

    // Zoom-Responsive Markers — also keeps the module-level flag in sync
    map.on('zoom', () => {
        isZoomedOut = map.getZoom() < 13;
        const container = document.getElementById('map');
        if (container) {
            container.classList.toggle('is-zoomed-out', isZoomedOut);
        }
    });
}

// ================================================================
// HOVER INTENT HELPERS
// ================================================================

/**
 * Schedule fn() to fire after a delay that scales with state.
 * If a card is already zoomed in/open: 500ms (intentional pause to avoid accidental exits)
 * Normal browsing: 0ms (instant feedback like standard pins)
 * Any new triggerHoverIntent() call cancels the previous pending one.
 */
function triggerHoverIntent(fn) {
    clearTimeout(hoverIntentTimer);
    // If we're currently zoomed in on a property from a click, use the long delay.
    // Otherwise (standard mode), make it instant (0ms).
    const delay = hasClickZoomed ? 500 : 0;
    hoverIntentTimer = setTimeout(fn, delay);
}

/** Cancel any pending hover-intent timer (called on mouseleave). */
function cancelHoverIntent() {
    clearTimeout(hoverIntentTimer);
    hoverIntentTimer = null;
}

// ================================================================

function fitMapToBounds() {
    if (filteredProperties.length === 0) return;
    
    // Create bounding box representing all visible markers
    const bounds = new mapboxgl.LngLatBounds();
    filteredProperties.forEach(p => {
        bounds.extend([p.lng, p.lat]);
    });

    // Fit map to bounds with comfortable padding
    map.fitBounds(bounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        maxZoom: 14.5,
        duration: 1000
    });
}

function renderMarkers() {
    // Clear old markers
    markers.forEach(m => m.marker.remove());
    markers = [];

    filteredProperties.forEach(prop => {
        // Zero-footprint wrapper to prevent Mapbox dimension recalculation leaps
        const wrapper = document.createElement('div');
        wrapper.className = 'marker-wrapper';

        // Visual pill element
        const pill = document.createElement('div');
        pill.className = 'price-marker';
        pill.dataset.id = prop.id;
        pill.innerHTML = `<span>${prop.price}</span>`; // Wrap text in span so we can hide it without breaking the dot container

        wrapper.appendChild(pill);

        // Hover: scale up — gated by hover-intent delay to ignore accidental grazes
        pill.addEventListener('mouseenter', () => {
            triggerHoverIntent(() => {
                pill.classList.add('active');
                wrapper.classList.add('top');
                highlightCard(prop.id, true);
            });
        });
        pill.addEventListener('mouseleave', () => {
            cancelHoverIntent(); // abort if still pending
            pill.classList.remove('active');
            wrapper.classList.remove('top');
            unhighlightCard(prop.id);
        });

        // Click: open popup
        pill.addEventListener('click', (e) => {
            e.stopPropagation();
            openMapPopup(prop);
            highlightCard(prop.id, true);
        });

        // Anchor is irrelevant because wrapper is 0x0
        const marker = new mapboxgl.Marker({ element: wrapper })
            .setLngLat([prop.lng, prop.lat])
            .addTo(map);

        markers.push({ id: prop.id, marker, element: pill, wrapper: wrapper });
    });
}

function openMapPopup(prop) {
    hasClickZoomed = false; // suppress zoom-out inside closeActivePopup so two quick clicks don't fight
    closeActivePopup();

    const html = `
        <img class="popup-image" src="${prop.image}" alt="${prop.name}" loading="lazy" />
        <div class="popup-body">
            <div class="popup-price">${prop.price}</div>
            <div class="popup-name">${prop.name}</div>
            <div class="popup-location">
                <span class="material-icons-outlined" style="font-size:12px;color:#8C274C">location_on</span>
                ${prop.location}
            </div>
            <div class="popup-stats">
                ${prop.bhk ? `<span class="popup-stat">${prop.bhk} BHK</span>` : ''}
                <span class="popup-stat">${prop.area}</span>
                <span class="popup-stat">${prop.facing}</span>
            </div>
            <button class="popup-view-btn" onclick="scrollToCard(${prop.id})">View Details</button>
        </div>
    `;

    activePopup = new mapboxgl.Popup({ offset: [0, -10], maxWidth: '280px', closeOnClick: true })
        .setLngLat([prop.lng, prop.lat])
        .setHTML(html)
        .addTo(map);

    // Pan map to center the popup. Apply an offset so the popup fits comfortably on screen without being clipped by the top bar.
    map.flyTo({ 
        center: [prop.lng, prop.lat], 
        zoom: 14.5, 
        duration: 800,
        offset: [0, 120] // Pivot origin down so the top-heavy popup is centered
    });
    hasClickZoomed = true; // mark that we're now zoomed in from a click

    // Highlight marker
    markers.forEach(m => {
        const isActive = m.id === prop.id;
        m.element.classList.toggle('active', isActive);
        m.wrapper.classList.toggle('top', isActive);
    });
}

function closeActivePopup() {
    if (activePopup) {
        activePopup.remove();
        activePopup = null;
        // If closed via the native × button, zoom back out to overview
        if (hasClickZoomed) {
            fitMapToBounds();
            hasClickZoomed = false;
        }
    }
    markers.forEach(m => {
        m.element.classList.remove('active');
        m.wrapper.classList.remove('top');
    });
}

function panToProperty(prop) {
    // If the map is zoomed in FROM A CLICK on a DIFFERENT property, reset the view.
    // If we are hovering the property that is ALREADY zoomed in/open, do nothing (keep the zoom).
    if (hasClickZoomed) {
        const isCurrentPropOpen = activePopup && activePopup.getLngLat().lng === prop.lng && activePopup.getLngLat().lat === prop.lat;
        
        if (!isCurrentPropOpen) {
            hasClickZoomed = false;      // clear flag
            closeActivePopup();           // remove UI state of previous property
            unhighlightAllCards();        // remove card highlight
            fitMapToBounds();             // zoom out
            
            // Highlight the NEW hovered marker after standardizing view
            markers.forEach(m => {
                const isActive = m.id === prop.id;
                m.element.classList.toggle('active', isActive);
                m.wrapper.classList.toggle('top', isActive);
            });
        }
        return;
    }

    // Normal hover: check if property is already visible within current viewport bounds
    const bounds = map.getBounds();
    const isVisible = bounds.contains([prop.lng, prop.lat]);

    // Only pan if off-screen (Airbnb style)
    if (!isVisible) {
        map.panTo([prop.lng, prop.lat], { duration: 600 });
    }

    // Highlight marker
    markers.forEach(m => {
        const isActive = m.id === prop.id;
        m.element.classList.toggle('active', isActive);
        m.wrapper.classList.toggle('top', isActive);
    });
}

function scrollToCard(propId) {
    closeActivePopup();
    const card = document.querySelector(`.property-card[data-id="${propId}"]`);
    if (card) {
        // Show list panel on mobile
        const isMobile = window.innerWidth <= 860;
        if (isMobile) {
            showListPanel();
        }
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('highlighted');
        setTimeout(() => card.classList.remove('highlighted'), 2500);
    }
}

function unhighlightAllCards() {
    document.querySelectorAll('.property-card.highlighted').forEach(card => {
        card.classList.remove('highlighted');
    });
}

function highlightCard(id, autoScroll = false) {
    const card = document.querySelector(`.property-card[data-id="${id}"]`);
    if (card) {
        card.classList.add('highlighted');
        if (autoScroll) {
            // Scroll the cards container smoothly so the card is visible without massive jumps
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function unhighlightCard(id) {
    const card = document.querySelector(`.property-card[data-id="${id}"]`);
    if (card) card.classList.remove('highlighted');
}

// ================================================================
// RENDER CARDS
// ================================================================
function renderCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;

    if (filteredProperties.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-outlined">search_off</span>
                <p class="font-ui font-semibold text-text-sub text-sm">No properties match your filters</p>
                <p class="text-xs text-text-sub/60 mt-1">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredProperties.map(prop => {
        const badgeClass = prop.badge === 'Premium' ? 'badge-premium'
            : prop.badge === 'Hot' ? 'badge-hot'
            : prop.badge === 'Upcoming' ? 'badge-upcoming'
            : 'badge-new';

        const tagClass = prop.tag === 'Ready to Move' ? 'tag-ready'
            : prop.tag === 'Pre-launch' ? 'tag-prelaunch'
            : prop.tag === 'Upcoming' ? 'tag-upcoming'
            : 'tag-underconstruction';

        const isWished = wishlist.has(prop.id);
        
        // Handle BHK configs
        const configIdx = activeConfigs[prop.id] || 0;
        const hasConfigs = prop.configs && prop.configs.length > 0;
        const activeConfig = hasConfigs ? prop.configs[configIdx] : null;
        
        const displayPrice = activeConfig ? activeConfig.price : prop.price;
        const displayBHK = activeConfig ? activeConfig.bhk : prop.bhk;
        const displayArea = activeConfig ? activeConfig.area : prop.area;
        const displayFacing = activeConfig ? activeConfig.facing : prop.facing;
        const cashbackVal = Math.round((activeConfig ? activeConfig.priceNum : prop.priceNum) * 10000000 * 0.005);

        const configToggles = hasConfigs ? `
            <div class="bhk-switcher">
                ${prop.configs.map((c, idx) => `
                    <button class="bhk-pill ${idx === configIdx ? 'active' : ''}" 
                        onclick="switchConfig(event, ${prop.id}, ${idx})">${c.bhk} BHK</button>
                `).join('')}
            </div>
        ` : '';

        return `
        <div class="property-card" data-id="${prop.id}"
            onmouseenter="onCardHover(${prop.id})"
            onmouseleave="onCardLeave(${prop.id})"
            onclick="onCardClick(${prop.id})">
            
            <div class="card-image-wrap">
                <img src="${prop.image}" alt="${prop.name}" loading="lazy" />
                <span class="card-img-badge ${badgeClass}">${prop.badge}</span>
                
                <div class="cashback-chip">
                    <span class="material-icons-outlined">savings</span>
                    <span class="cashback-amount">₹${cashbackVal.toLocaleString('en-IN')}</span>
                    <span class="cashback-label">Cashback</span>
                </div>

                <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(event, ${prop.id})">
                    <svg viewBox="0 0 24 24" fill="${isWished ? '#E53E3E' : 'none'}" stroke="${isWished ? '#E53E3E' : '#6B7280'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>

            <div class="card-details">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div class="card-price">${displayPrice}</div>
                        ${configToggles}
                    </div>
                    <div class="card-name" title="${prop.name}">${prop.name}</div>
                    <div class="card-location">
                        <span class="material-icons-outlined" style="font-size: 16px;">location_on</span>
                        ${prop.location}
                    </div>
                </div>

                <div class="card-body">
                    <div class="stat-chips">
                        ${displayBHK ? `<span class="stat-chip" data-stat="bhk">
                            <span class="material-icons-outlined" style="font-size: 14px;">king_bed</span>
                            <span>${displayBHK} BHK</span>
                        </span>` : ''}
                        
                        <span class="stat-chip" data-stat="area">
                            <span class="material-icons-outlined" style="font-size: 14px;">square_foot</span>
                            <span>${displayArea}</span>
                        </span>

                        <span class="stat-chip" data-stat="facing">
                            <span class="material-icons-outlined" style="font-size: 14px;">explore</span>
                            <span>${displayFacing}</span>
                        </span>
                    </div>

                    <div class="flex items-center gap-2 mt-2">
                        <span class="status-tag ${tagClass}">${prop.tag}</span>
                        ${prop.verified ? '<span class="verified-badge"><span class="material-icons-outlined" style="font-size:14px;">verified</span> Verified Match</span>' : ''}
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// ================================================================
// CARD INTERACTIONS
// ================================================================
function onCardHover(id) {
    const prop = PROPERTIES.find(p => p.id === id);
    if (!prop) return;
    triggerHoverIntent(() => panToProperty(prop));
}

function onCardLeave(id) {
    cancelHoverIntent(); // abort pan if mouse left before delay fired
    const m = markers.find(mk => mk.id === id);
    if (m) {
        m.element.classList.remove('active');
        m.wrapper.classList.remove('top');
    }
}

function onCardClick(id) {
    const prop = PROPERTIES.find(p => p.id === id);
    if (!prop) return;
    openMapPopup(prop);
}

function toggleWishlist(e, id) {
    e.stopPropagation();
    if (wishlist.has(id)) {
        wishlist.delete(id);
    } else {
        wishlist.add(id);
    }
    renderCards(); // re-render to update heart state
}

// ================================================================
// FILTERING
// ================================================================
function applyFilters() {
    let results = [...PROPERTIES];

    // Type filter
    if (activeTypeFilter !== 'all') {
        results = results.filter(p => p.type === activeTypeFilter);
    }

    // Status filter
    if (activeStatusFilter) {
        results = results.filter(p => p.status === activeStatusFilter);
    }

    // Search query
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        results = results.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            (p.bhk && `${p.bhk} bhk`.includes(q)) ||
            (p.bhk && `${p.bhk}bhk`.includes(q))
        );
    }

    // Advanced: Budget
    results = results.filter(p => p.priceNum >= advBudgetMin && p.priceNum <= advBudgetMax);

    // Advanced: BHK
    if (advBHK !== 'any') {
        const bhkNum = parseInt(advBHK);
        if (bhkNum === 5) {
            results = results.filter(p => p.bhk >= 5);
        } else {
            results = results.filter(p => p.bhk === bhkNum);
        }
    }

    // Advanced: Possession
    if (advPossession !== 'any') {
        results = results.filter(p => p.possession === advPossession);
    }

    // Advanced: Amenities
    if (advAmenities.length > 0) {
        results = results.filter(p => advAmenities.every(a => p.amenities.includes(a)));
    }

    // Sort
    if (sortOrder === 'asc') {
        results.sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortOrder === 'desc') {
        results.sort((a, b) => b.priceNum - a.priceNum);
    }

    filteredProperties = results;
}

function renderAll() {
    applyFilters();
    renderCards();
    renderMarkers();
    fitMapToBounds(); // Refit map when filters change
    updateCounts();
}

function updateCounts() {
    const rc = document.getElementById('resultCount');
    const mb = document.getElementById('mapBadgeCount');
    if (rc) rc.textContent = filteredProperties.length;
    if (mb) mb.textContent = `${filteredProperties.length} properties on map`;
}

// ================================================================
// EVENT BINDINGS
// ================================================================
function bindEvents() {
    // Filter chips — type
    document.querySelectorAll('.filter-chip[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip[data-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTypeFilter = btn.dataset.filter;
            // Deactivate status filters when "all" type is selected (optional UX)
            renderAll();
        });
    });

    // Filter chips — status
    document.querySelectorAll('.filter-chip[data-status]').forEach(btn => {
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            document.querySelectorAll('.filter-chip[data-status]').forEach(b => b.classList.remove('active'));
            if (!wasActive) {
                btn.classList.add('active');
                activeStatusFilter = btn.dataset.status;
            } else {
                activeStatusFilter = null;
            }
            renderAll();
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let debounce;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                searchQuery = searchInput.value;
                renderAll();
            }, 250);
        });
    }

    // Sort
    const sortBtn = document.getElementById('sortBtn');
    const sortBtnMobile = document.getElementById('sortBtnMobile');
    const handleSort = () => {
        if (!sortOrder) sortOrder = 'asc';
        else if (sortOrder === 'asc') sortOrder = 'desc';
        else sortOrder = null;

        const label = document.getElementById('sortLabel');
        if (label) {
            label.textContent = sortOrder === 'asc' ? 'Price ↑' : sortOrder === 'desc' ? 'Price ↓' : 'Sort';
        }
        renderAll();
    };
    if (sortBtn) sortBtn.addEventListener('click', handleSort);
    if (sortBtnMobile) sortBtnMobile.addEventListener('click', handleSort);

    // More Filters
    const mfBtnNav = document.getElementById('moreFiltersBtnNav');
    if (mfBtnNav) mfBtnNav.addEventListener('click', openFiltersDrawer);

    // Bedroom buttons
    document.querySelectorAll('.bedroom-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.bedroom-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Possession buttons
    document.querySelectorAll('.possession-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.possession-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Mobile toggle
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileView);
}

// ================================================================
// FILTERS DRAWER
// ================================================================
function openFiltersDrawer() {
    document.getElementById('filtersOverlay').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('filtersDrawer').classList.add('open');
    }, 10);
}

function closeFiltersDrawer() {
    document.getElementById('filtersDrawer').classList.remove('open');
    setTimeout(() => {
        document.getElementById('filtersOverlay').classList.add('hidden');
    }, 350);
}

function applyAdvancedFilters() {
    const minEl = document.getElementById('budgetMin');
    const maxEl = document.getElementById('budgetMax');
    advBudgetMin = parseFloat(minEl.value) || 0;
    advBudgetMax = parseFloat(maxEl.value) || 50;

    const activeBHK = document.querySelector('.bedroom-btn.active');
    advBHK = activeBHK ? activeBHK.dataset.bhk : 'any';

    const activePoss = document.querySelector('.possession-btn.active');
    advPossession = activePoss ? activePoss.dataset.poss : 'any';

    advAmenities = [];
    document.querySelectorAll('#amenityToggles input[type="checkbox"]:checked').forEach(cb => {
        advAmenities.push(cb.value);
    });

    closeFiltersDrawer();
    renderAll();
}

function resetAdvancedFilters() {
    document.getElementById('budgetMin').value = 0;
    document.getElementById('budgetMax').value = 50;

    document.querySelectorAll('.bedroom-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.bedroom-btn[data-bhk="any"]').classList.add('active');

    document.querySelectorAll('.possession-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.possession-btn[data-poss="any"]').classList.add('active');

    document.querySelectorAll('#amenityToggles input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    advBudgetMin = 0;
    advBudgetMax = 50;
    advBHK = 'any';
    advPossession = 'any';
    advAmenities = [];

    renderAll();
}

// ================================================================
// MOBILE
// ================================================================
let showingMap = false;

function toggleMobileView() {
    showingMap = !showingMap;
    const listPanel = document.getElementById('listPanel');
    const mapPanel = document.getElementById('mapPanel');
    const toggleLabel = document.getElementById('mobileToggleLabel');
    const toggleIcon = document.querySelector('#mobileToggle .material-icons-outlined');

    if (showingMap) {
        listPanel.classList.add('mobile-hidden');
        mapPanel.classList.add('mobile-visible');
        toggleLabel.textContent = 'Show List';
        toggleIcon.textContent = 'view_list';
        // Resize map after it becomes visible
        setTimeout(() => map.resize(), 100);
    } else {
        showListPanel();
    }
}

function showListPanel() {
    showingMap = false;
    const listPanel = document.getElementById('listPanel');
    const mapPanel = document.getElementById('mapPanel');
    const toggleLabel = document.getElementById('mobileToggleLabel');
    const toggleIcon = document.querySelector('#mobileToggle .material-icons-outlined');

    listPanel.classList.remove('mobile-hidden');
    mapPanel.classList.remove('mobile-visible');
    toggleLabel.textContent = 'Show Map';
    toggleIcon.textContent = 'map';
}
