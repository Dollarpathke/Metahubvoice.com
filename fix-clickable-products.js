// ========================================
// BullBear Trading - Enhanced Product Clickability
// Makes all product cards, links, and buttons fully clickable
// ========================================

(function() {
    'use strict';
    
    console.log('🎯 Initializing Enhanced Product Clickability...');
    
    // Wait for DOM to be fully loaded
    function initializeClickability() {
        
        // ========================================
        // 1. PRODUCT CARDS - Make entire card clickable
        // ========================================
        const productCards = document.querySelectorAll('.card[data-product-url]');
        console.log(`📦 Found ${productCards.length} product cards`);
        
        productCards.forEach((card, index) => {
            const productUrl = card.getAttribute('data-product-url');
            
            if (!productUrl) {
                console.warn(`⚠️ Card ${index} missing data-product-url`);
                return;
            }
            
            // Make card visually clickable
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            // Remove any existing click handlers
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add enhanced click handler
            newCard.addEventListener('click', function(e) {
                // Check if clicking on a button or link
                const clickedButton = e.target.closest('.buy-now-btn, .paypal-btn, a');
                
                if (!clickedButton) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log(`🔗 Card clicked: ${productUrl}`);
                    
                    // Open in new tab
                    window.open(productUrl, '_blank', 'noopener,noreferrer');
                }
            }, true);
            
            // Make all card elements clickable except buttons
            const cardElements = newCard.querySelectorAll('.card__image, .card__title, .card__text, .card__price');
            cardElements.forEach(element => {
                element.style.cursor = 'pointer';
                element.style.pointerEvents = 'auto';
            });
        });
        
        // ========================================
        // 2. BUY NOW BUTTONS - Ensure they're clickable
        // ========================================
        const buyButtons = document.querySelectorAll('.buy-now-btn');
        console.log(`🛒 Found ${buyButtons.length} Buy Now buttons`);
        
        buyButtons.forEach((button, index) => {
            // Ensure button is clickable
            button.style.cursor = 'pointer';
            button.style.pointerEvents = 'auto';
            button.style.position = 'relative';
            button.style.zIndex = '1000';
            
            // Prevent event bubbling
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log(`💳 Buy button ${index} clicked`);
            }, true);
            
            // Make button children non-clickable to prevent interference
            const buttonChildren = button.querySelectorAll('*');
            buttonChildren.forEach(child => {
                child.style.pointerEvents = 'none';
            });
        });
        
        // ========================================
        // 3. PAYPAL BUTTONS - Ensure they're clickable
        // ========================================
        const paypalButtons = document.querySelectorAll('.paypal-btn');
        console.log(`💰 Found ${paypalButtons.length} PayPal buttons`);
        
        paypalButtons.forEach((button, index) => {
            button.style.cursor = 'pointer';
            button.style.pointerEvents = 'auto';
            button.style.position = 'relative';
            button.style.zIndex = '1000';
            
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log(`💳 PayPal button ${index} clicked`);
            }, true);
            
            const buttonChildren = button.querySelectorAll('*');
            buttonChildren.forEach(child => {
                child.style.pointerEvents = 'none';
            });
        });
        
        // ========================================
        // 4. CHECKLIST CARD - Special handling
        // ========================================
        const checklistCard = document.querySelector('.checklist-card');
        if (checklistCard) {
            console.log('📋 Found checklist card');
            
            checklistCard.style.cursor = 'pointer';
            checklistCard.style.pointerEvents = 'auto';
            
            // Remove existing handlers
            const newChecklistCard = checklistCard.cloneNode(true);
            checklistCard.parentNode.replaceChild(newChecklistCard, checklistCard);
            
            // Add click handler
            newChecklistCard.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📋 Checklist card clicked');
                
                if (typeof showSignupForChecklist === 'function') {
                    showSignupForChecklist();
                } else {
                    console.error('showSignupForChecklist function not found');
                }
            }, true);
            
            // Make all children clickable
            const children = newChecklistCard.querySelectorAll('*');
            children.forEach(child => {
                child.style.cursor = 'pointer';
                child.style.pointerEvents = 'auto';
            });
        }
        
        // ========================================
        // 5. NAVIGATION LINKS - Ensure they work
        // ========================================
        const navLinks = document.querySelectorAll('.link-list__link, .header a');
        console.log(`🔗 Found ${navLinks.length} navigation links`);
        
        navLinks.forEach(link => {
            link.style.cursor = 'pointer';
            link.style.pointerEvents = 'auto';
        });
        
        // ========================================
        // 6. FOOTER LINKS - Ensure they work
        // ========================================
        const footerLinks = document.querySelectorAll('.footer a, .footer-link');
        console.log(`🔗 Found ${footerLinks.length} footer links`);
        
        footerLinks.forEach(link => {
            link.style.cursor = 'pointer';
            link.style.pointerEvents = 'auto';
        });
        
        // ========================================
        // 7. SOCIAL ICONS - Ensure they work
        // ========================================
        const socialIcons = document.querySelectorAll('.social-icons__icon');
        console.log(`📱 Found ${socialIcons.length} social icons`);
        
        socialIcons.forEach(icon => {
            icon.style.cursor = 'pointer';
            icon.style.pointerEvents = 'auto';
        });
        
        // ========================================
        // 8. FRAUD ALERT BANNER - Ensure it's clickable
        // ========================================
        const fraudAlert = document.querySelector('.fraud-alert');
        if (fraudAlert) {
            console.log('⚠️ Found fraud alert banner');
            fraudAlert.style.cursor = 'pointer';
            fraudAlert.style.pointerEvents = 'auto';
        }
        
        // ========================================
        // 9. FIX OVERLAPPING ELEMENTS
        // ========================================
        
        // Ensure card bodies don't block buttons
        const cardBodies = document.querySelectorAll('.card__body');
        cardBodies.forEach(body => {
            body.style.position = 'relative';
            body.style.zIndex = '1';
        });
        
        // Ensure buttons are above card bodies
        const allButtons = document.querySelectorAll('.buy-now-btn, .paypal-btn, .btn');
        allButtons.forEach(button => {
            button.style.position = 'relative';
            button.style.zIndex = '100';
        });
        
        // ========================================
        // 10. ADD VISUAL FEEDBACK
        // ========================================
        
        // Add hover effects to cards
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add active state to buttons
        allButtons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        });
        
        console.log('✅ Enhanced Product Clickability Initialized!');
        console.log('📊 Summary:');
        console.log(`   - ${productCards.length} product cards`);
        console.log(`   - ${buyButtons.length} buy buttons`);
        console.log(`   - ${paypalButtons.length} PayPal buttons`);
        console.log(`   - ${navLinks.length} navigation links`);
        console.log(`   - ${footerLinks.length} footer links`);
        console.log(`   - ${socialIcons.length} social icons`);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeClickability);
    } else {
        initializeClickability();
    }
    
    // Re-initialize after a short delay to catch dynamically loaded content
    setTimeout(initializeClickability, 1000);
    
})();

// ========================================
// DEBUGGING HELPER
// ========================================

// Add this to console to test clickability
window.testClickability = function() {
    console.log('🧪 Testing Clickability...');
    
    const cards = document.querySelectorAll('.card[data-product-url]');
    const buttons = document.querySelectorAll('.buy-now-btn, .paypal-btn');
    const links = document.querySelectorAll('a');
    
    console.log(`Cards: ${cards.length}`);
    console.log(`Buttons: ${buttons.length}`);
    console.log(`Links: ${links.length}`);
    
    cards.forEach((card, i) => {
        const url = card.getAttribute('data-product-url');
        const cursor = window.getComputedStyle(card).cursor;
        const pointerEvents = window.getComputedStyle(card).pointerEvents;
        console.log(`Card ${i}: ${url} | cursor: ${cursor} | pointer-events: ${pointerEvents}`);
    });
    
    buttons.forEach((btn, i) => {
        const cursor = window.getComputedStyle(btn).cursor;
        const pointerEvents = window.getComputedStyle(btn).pointerEvents;
        const zIndex = window.getComputedStyle(btn).zIndex;
        console.log(`Button ${i}: cursor: ${cursor} | pointer-events: ${pointerEvents} | z-index: ${zIndex}`);
    });
};

console.log('💡 Type testClickability() in console to debug');
