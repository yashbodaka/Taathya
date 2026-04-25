/**
 * Global Advisor/Meeting Booking Logic
 * Ported from finance.js
 */
document.addEventListener('alpine:init', () => {
    Alpine.data('bookingForm', () => ({
        showForm: false,
        isBooked: false,
        step: 1,
        city: 'ahmedabad',
        area: '',
        date: '',
        time: '',
        loanType: '',
        otherLoanType: '',
        name: '',
        phone: '',
        animating: false,
        activeDropdown: null,
        availableTimes: [],
        minDate: new Date().toLocaleDateString('en-CA'), // Formats to YYYY-MM-DD
        
        init() {
            this.generateTimes();
            this.$watch('date', () => {
                this.generateTimes();
            });

            // Listen for global event to open advisor form
            window.addEventListener('open-advisor-form', (e) => {
                this.open();
                if (e.detail && e.detail.loanType) {
                    this.loanType = e.detail.loanType;
                }
            });
        },
        
        generateTimes() {
            const slots = [];
            const now = new Date();
            const selectedDateStr = this.date || this.minDate;
            const isToday = selectedDateStr === this.minDate;
            
            for (let hour = 10; hour <= 18; hour++) {
                for (let min of [0, 30]) {
                    if (hour === 18 && min === 30) continue; // Ends exactly at 6 PM
                    
                    let slotValid = true;
                    if (isToday) {
                        let slotTime = new Date();
                        slotTime.setHours(hour, min, 0, 0);
                        let bufferTime = new Date(now.getTime() + 75 * 60000); // 1 hr 15 mins buffer
                        if (slotTime < bufferTime) {
                            slotValid = false;
                        }
                    }
                    
                    if (slotValid) {
                        let ampm = hour >= 12 ? 'PM' : 'AM';
                        let h = hour > 12 ? hour - 12 : hour;
                        let m = min === 0 ? '00' : '30';
                        slots.push(`${h}:${m} ${ampm}`);
                    }
                }
            }
            this.availableTimes = slots;
            if (!slots.includes(this.time)) {
                this.time = '';
            }
        },

        toggleDropdown(name) {
            this.activeDropdown = this.activeDropdown === name ? null : name;
        },
        
        open() { 
            this.showForm = true; 
            this.isBooked = false;
            this.step = 1;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden'; 
            if (window.lenis && typeof window.lenis.stop === 'function') {
                window.lenis.stop();
            }
        },
        
        close() { 
            this.showForm = false; 
            document.documentElement.style.overflow = '';
            document.body.style.overflow = ''; 
            if (window.lenis && typeof window.lenis.start === 'function') {
                window.lenis.start();
            }
        },
        
        submit() {
            if (this.animating) return;
            this.animating = true;
            // Simulate API call
            setTimeout(() => {
                this.isBooked = true;
                this.animating = false;
            }, 1000);
        }
    }));
});
