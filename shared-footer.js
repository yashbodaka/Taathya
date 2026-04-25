(function renderSharedFooter() {
    const mounts = document.querySelectorAll("[data-shared-footer]");
    const legacyFooters = Array.from(document.querySelectorAll("footer")).filter(
        (footer) => !footer.classList.contains("shared-site-footer")
    );

    legacyFooters.forEach((footer) => {
        const previous = footer.previousElementSibling;
        footer.style.display = "none";
        if (previous && previous.classList && previous.classList.contains("layered-waves")) {
            previous.style.display = "none";
        }
    });

    const year = new Date().getFullYear();
    const markup = `
        <footer class="shared-site-footer">
            <div class="shared-site-footer__inner">
                <div class="shared-site-footer__main">
                    <div class="shared-site-footer__brand">
                        <div class="shared-site-footer__logo">
                            <img src="assets/logo.png" alt="Taathya Logo" class="shared-site-footer__logo-img">
                        </div>
                        <p class="shared-site-footer__tagline">
                            Trusted guidance for finance decisions and premium properties in Ahmedabad.
                        </p>
                        <div class="shared-site-footer__contact-primary">
                            <a href="tel:+919825217736" class="shared-site-footer__phone-link">
                                <span class="material-icons-outlined">call</span>
                                +91 98252 17736
                            </a>
                        </div>
                    </div>

                    <div class="shared-site-footer__nav-col">
                        <h3 class="shared-site-footer__title">Explore</h3>
                        <ul class="shared-site-footer__links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="property-search.html">Properties</a></li>
                            <li><a href="finance.html">Finance</a></li>
                            <li><a href="property-detail.html">Featured</a></li>
                        </ul>
                    </div>

                    <div class="shared-site-footer__nav-col">
                        <h3 class="shared-site-footer__title">Services</h3>
                        <ul class="shared-site-footer__links">
                            <li><a href="property-search.html">Property Search</a></li>
                            <li><a href="finance.html">Home Loans</a></li>
                            <li><a href="finance.html">Mortgage Support</a></li>
                            <li><a href="finance.html">Expert Advisory</a></li>
                        </ul>
                    </div>

                    <div class="shared-site-footer__nav-col">
                        <h3 class="shared-site-footer__title">Visit</h3>
                        <div class="shared-site-footer__info">
                            <address>Ahmedabad, Gujarat</address>
                            <p>Mon - Sat: 10AM - 7PM</p>
                            <button @click="window.dispatchEvent(new CustomEvent('open-advisor-form'))" class="shared-site-footer__cta-link bg-transparent border-none p-0 cursor-pointer">
                                Talk to an Advisor
                                <span class="material-icons-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="shared-site-footer__bottom">
                    <div class="shared-site-footer__copyright">
                        &copy; ${year} Taathya. All rights reserved.
                    </div>
                    <div class="shared-site-footer__legal-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Global Booking Modal (Alpine-driven) -->
        <div id="booking-root" x-data="bookingForm()" x-cloak>
            <!-- Backdrop -->
            <div class="booking-modal-backdrop" x-show="showForm" @click.self="close()" @wheel.prevent @touchmove.prevent
                x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-200"
                x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">

                <!-- Sheet -->
                <div class="booking-modal-sheet !overflow-hidden !p-6 md:!p-8"
                    x-transition:enter="transition ease-out duration-350" x-transition:enter-start="opacity-0 translate-y-8"
                    x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-200"
                    x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-8">

                    <!-- Close + Header -->
                    <div class="flex items-start justify-between mb-4" x-show="!isBooked">
                        <div>
                            <p class="font-ui text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                Partner Meeting Scheduler
                            </p>
                            <h2 class="font-display font-bold text-3xl text-on-surface tracking-tight">Reserve Your Consultation</h2>
                        </div>
                        <button @click="close()"
                            class="ml-6 w-11 h-11 flex items-center justify-center rounded-full bg-surface-low hover:bg-surface-container transition-colors shrink-0 mt-1">
                            <span class="material-icons-outlined text-on-surface-variant text-xl">close</span>
                        </button>
                    </div>

                    <!-- SUCCESS STATE -->
                    <div x-show="isBooked" x-transition:enter="transition ease-out duration-500"
                        x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100"
                        class="py-20 flex flex-col items-center text-center">
                        <div class="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-10 relative">
                            <div class="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
                                style="animation-duration: 3s;"></div>
                            <span class="material-icons-outlined text-primary text-5xl">event_available</span>
                        </div>
                        <h2 class="font-display font-bold text-4xl text-on-surface mb-4 tracking-tight">Meeting Reserved.</h2>
                        <p class="font-body text-on-surface-variant font-light mb-10 max-w-sm leading-relaxed">
                            Your request has been prioritized. Our channel partner will call you to finalize the fine
                            details within the hour.
                        </p>
                        <button @click="close()" class="primary-pill-btn px-12">Close & Continue</button>
                    </div>

                    <!-- SINGLE FORM VIEW -->
                    <div x-show="!isBooked" x-transition:enter="transition ease-out duration-500"
                        x-transition:enter-start="opacity-0 translate-y-4"
                        x-transition:enter-end="opacity-100 translate-y-0" class="flex flex-col">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                            <!-- Location -->
                            <div class="col-span-1 md:col-span-2">
                                <h3 class="font-ui text-[11px] font-bold text-primary uppercase tracking-[0.15em] border-b border-primary/10 pb-2 mb-2">1. Location</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="relative w-full" @click.away="if(activeDropdown === 'city') activeDropdown = null">
                                        <button type="button" @click="toggleDropdown('city')" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white w-full text-left flex justify-between items-center focus:border-primary/50 transition-colors">
                                            <span x-text="city === 'ahmedabad' ? 'Ahmedabad' : (city === 'gandhinagar' ? 'Gandhinagar' : 'Select City')" :class="city ? 'text-on-surface' : 'text-on-surface-variant'"></span>
                                            <span class="material-icons-outlined text-[20px] text-on-surface-variant transition-transform duration-300" :class="activeDropdown === 'city' ? 'rotate-180 text-primary' : ''">expand_more</span>
                                        </button>
                                        <div x-show="activeDropdown === 'city'" x-collapse class="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-[14px] shadow-lg shadow-black/5 border border-outline-variant py-2 max-h-[220px] overflow-y-auto scrollbar-hide">
                                            <button type="button" @click="city = 'ahmedabad'; activeDropdown = null; area = ''" class="w-full text-left px-4 py-2.5 text-[13px] hover:bg-primary/5 hover:text-primary transition-colors text-on-surface">Ahmedabad</button>
                                            <button type="button" @click="city = 'gandhinagar'; activeDropdown = null; area = ''" class="w-full text-left px-4 py-2.5 text-[13px] hover:bg-primary/5 hover:text-primary transition-colors text-on-surface">Gandhinagar</button>
                                        </div>
                                    </div>
                                    <div class="relative w-full" @click.away="if(activeDropdown === 'area') activeDropdown = null">
                                        <button type="button" @click="city ? toggleDropdown('area') : null" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white w-full text-left flex justify-between items-center transition-colors" :class="!city ? 'opacity-60 cursor-not-allowed bg-surface-low border-transparent' : 'focus:border-primary/50'">
                                            <span x-text="area || 'Select Area'" :class="area ? 'text-on-surface' : 'text-on-surface-variant'"></span>
                                            <span class="material-icons-outlined text-[20px] text-on-surface-variant transition-transform duration-300" :class="activeDropdown === 'area' ? 'rotate-180 text-primary' : ''">expand_more</span>
                                        </button>
                                        <div x-show="activeDropdown === 'area'" x-collapse class="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-[14px] shadow-lg shadow-black/5 border border-outline-variant py-2 max-h-[220px] overflow-y-auto scrollbar-hide">
                                            <template x-if="city === 'ahmedabad'">
                                                <div>
                                                    <template x-for="a in ['SG Highway', 'Ambli Road', 'Science City', 'Bopal']">
                                                        <button type="button" @click="area = a; activeDropdown = null" class="w-full text-left px-4 py-2.5 text-[13px] hover:bg-primary/5 hover:text-primary transition-colors text-on-surface" x-text="a"></button>
                                                    </template>
                                                </div>
                                            </template>
                                            <template x-if="city === 'gandhinagar'">
                                                <div>
                                                    <template x-for="a in ['Infocity', 'Sector 7', 'Kudasan', 'Sargasan']">
                                                        <button type="button" @click="area = a; activeDropdown = null" class="w-full text-left px-4 py-2.5 text-[13px] hover:bg-primary/5 hover:text-primary transition-colors text-on-surface" x-text="a"></button>
                                                    </template>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Schedule -->
                            <div class="col-span-1 md:col-span-2 mt-1">
                                <h3 class="font-ui text-[11px] font-bold text-primary uppercase tracking-[0.15em] border-b border-primary/10 pb-2 mb-2">2. Schedule Time</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <input type="date" :min="minDate" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white font-ui text-on-surface-variant cursor-pointer relative z-10" x-model="date" onclick="this.showPicker()">
                                    <div class="relative w-full" @click.away="if(activeDropdown === 'time') activeDropdown = null">
                                        <button type="button" @click="date ? toggleDropdown('time') : null" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white w-full text-left flex justify-between items-center transition-colors" :class="!date || availableTimes.length === 0 ? 'opacity-60 cursor-not-allowed bg-surface-low border-transparent' : 'focus:border-primary/50 text-on-surface'">
                                            <span x-text="time || (date && availableTimes.length === 0 ? 'No slots left' : 'Select Time')" :class="time ? 'text-on-surface font-ui' : 'text-on-surface-variant'"></span>
                                            <span class="material-icons-outlined text-[20px] text-on-surface-variant transition-transform duration-300" :class="activeDropdown === 'time' ? 'rotate-180 text-primary' : ''">expand_more</span>
                                        </button>
                                        <div x-show="activeDropdown === 'time'" x-collapse class="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-[14px] shadow-lg shadow-black/5 border border-outline-variant py-2 max-h-[220px] overflow-y-auto scrollbar-hide">
                                            <template x-if="availableTimes.length > 0">
                                                <div>
                                                    <template x-for="t in availableTimes">
                                                        <button type="button" @click="time = t; activeDropdown = null" class="w-full text-left px-4 py-2 text-[13px] hover:bg-primary/5 hover:text-primary transition-colors font-ui text-on-surface" x-text="t"></button>
                                                    </template>
                                                </div>
                                            </template>
                                            <template x-if="availableTimes.length === 0 && date">
                                                <div class="px-4 py-3 text-[11px] text-on-surface-variant leading-relaxed">No slots left for today.</div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Product -->
                            <div class="col-span-1 md:col-span-2 mt-1">
                                <h3 class="font-ui text-[11px] font-bold text-primary uppercase tracking-[0.15em] border-b border-primary/10 pb-2 mb-2">3. Product Details</h3>
                                <div class="grid gap-4" :class="loanType === 'Other' ? 'grid-cols-2' : 'grid-cols-1'">
                                    <div class="relative w-full" @click.away="if(activeDropdown === 'loanType') activeDropdown = null">
                                        <button type="button" @click="toggleDropdown('loanType')" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white w-full text-left flex justify-between items-center focus:border-primary/50 transition-colors">
                                            <span x-text="loanType || 'Select Requirement'" :class="loanType ? 'text-on-surface' : 'text-on-surface-variant'"></span>
                                            <span class="material-icons-outlined text-[20px] text-on-surface-variant transition-transform duration-300" :class="activeDropdown === 'loanType' ? 'rotate-180 text-primary' : ''">expand_more</span>
                                        </button>
                                        <div x-show="activeDropdown === 'loanType'" x-collapse class="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-[14px] shadow-lg shadow-black/5 border border-outline-variant py-2 max-h-[220px] overflow-y-auto scrollbar-hide">
                                            <template x-for="type in ['Home Loan', 'Mortgage Loan', 'Top up Loan', 'Bank Transfer', 'Other']">
                                                <button type="button" @click="loanType = type; activeDropdown = null" class="w-full text-left px-4 py-2.5 text-[13px] hover:bg-primary/5 hover:text-primary transition-colors text-on-surface" x-text="type"></button>
                                            </template>
                                        </div>
                                    </div>
                                    <input x-show="loanType === 'Other'" type="text" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white" x-model="otherLoanType" placeholder="Specify requirement">
                                </div>
                            </div>

                            <!-- Contact -->
                            <div class="col-span-1 md:col-span-2 mt-1">
                                <h3 class="font-ui text-[11px] font-bold text-primary uppercase tracking-[0.15em] border-b border-primary/10 pb-2 mb-2">4. Contact Details</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <input type="text" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white" x-model="name" placeholder="Full Name">
                                    <input type="tel" class="atelier-input !py-2.5 !text-sm !rounded-[14px] bg-white" x-model="phone" placeholder="Phone Number">
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-primary/10">
                            <button type="button" class="primary-pill-btn w-full !py-3" @click="submit()" :disabled="!name || !phone || !area || !date || !time || !loanType || animating">
                                <span x-show="!animating" class="flex items-center justify-center gap-2 text-sm font-bold tracking-wide">Confirm & Book Meeting <span class="material-icons-outlined text-[18px]">arrow_forward</span></span>
                                <span x-show="animating" class="flex items-center justify-center gap-2 italic text-sm text-white/80">Securing Your Slot...</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (mounts.length) {
        mounts.forEach((mount) => {
            mount.innerHTML = markup;
        });
        return;
    }

    document.body.insertAdjacentHTML("beforeend", markup);
})();
