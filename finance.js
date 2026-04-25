// Tailwind Configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: "#6d0c35",
                "primary-container": "#8c274c",
                "tertiary-container": "#873134",
                surface: "#faf9f9",
                "surface-low": "#f4f3f3",
                "surface-container": "#eeeeee",
                "surface-lowest": "#ffffff",
                "on-surface": "#1a1c1c",
                "on-surface-variant": "#5a5d5d",
                "outline-variant": "rgba(219, 192, 197, 0.25)", /* Ghost border */
            },
            boxShadow: {
                'ambient': '0px 20px 40px rgba(26, 28, 28, 0.05)',
                'ambient-glow': '0px 30px 60px rgba(109, 12, 53, 0.15)',
            },
            fontFamily: {
                display: ["'Sora'", "sans-serif"],
                body: ["'Inter'", "sans-serif"],
                ui: ["'Inter'", "sans-serif"],
                headline: ["'Epilogue'", "sans-serif"],
            },
        },
    },
};

// Alpine.js Components
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
        
        goTo(n) {
            if (this.animating) return;
            this.animating = true;
            setTimeout(() => { 
                this.step = n; 
                this.animating = false; 
            }, 280);
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

    Alpine.data('processTracker', () => ({
        activeStep: 1,
        
        isActive(step) {
            return this.activeStep === step;
        },
        
        isPast(step) {
            return this.activeStep > step;
        },
        
        setStep(step) {
            this.activeStep = step;
        }
    }));
});
