// Simple PayPal Integration for BullBear Trading - No Encryption
class PayPalIntegration {
    constructor() {
        this.apiUrl = 'http://localhost:5000/api/paypal';
        this.clientId = 'EHyxXrMCDAjeeNIFxhIVhg9b8I7PffoH0nPeoHWN7VJUD6Gfw1yHYrOqOiN5lbm5EKLXty5ukbsnLGIS';
        this.init();
    }

    async init() {
        console.log('🚀 Initializing PayPal Integration - No Encryption');
        this.loadPayPalSDK();
    }

    loadPayPalSDK() {
        if (document.getElementById('paypal-sdk')) return;

        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD`;
        script.onload = () => {
            console.log('✅ PayPal SDK loaded - Direct integration');
            this.initializePayPalButtons();
        };
        script.onerror = () => {
            console.error('❌ Failed to load PayPal SDK');
        };
        document.head.appendChild(script);
    }

    initializePayPalButtons() {
        // Replace all Buy Now buttons with PayPal buttons
        const buyButtons = document.querySelectorAll('.buy-now-btn');
        
        buyButtons.forEach((button, index) => {
            const card = button.closest('.card');
            const priceElement = card.querySelector('.card__price');
            const titleElement = card.querySelector('.card__title');
            
            if (priceElement && titleElement) {
                // Extract price (remove $ and USD)
                const priceText = priceElement.textContent.replace(/[$,USD\s]/g, '');
                const amount = parseFloat(priceText);
                const description = titleElement.textContent.trim();
                
                if (!isNaN(amount)) {
                    this.createPayPalButton(button, amount, description, index);
                }
            }
        });
    }

    createPayPalButton(originalButton, amount, description, courseId) {
        // Create PayPal button container
        const paypalContainer = document.createElement('div');
        paypalContainer.id = `paypal-button-${courseId}`;
        paypalContainer.className = 'paypal-button-container';
        paypalContainer.style.marginTop = '10px';
        
        // Replace original button
        originalButton.parentNode.replaceChild(paypalContainer, originalButton);

        // Simple PayPal button - No encryption needed
        if (window.paypal) {
            window.paypal.Buttons({
                style: {
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay',
                    height: 50,
                    layout: 'vertical'
                },
                
                createOrder: (data, actions) => {
                    const currentUser = JSON.parse(localStorage.getItem('metahubCurrentUser') || '{}');
                    const userId = currentUser.email || 'guest';
                    
                    console.log('Creating PayPal order - No encryption');
                    
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount.toString(),
                                currency_code: 'USD'
                            },
                            description: description,
                            custom_id: `course_${courseId}_user_${userId}`
                        }],
                        application_context: {
                            brand_name: 'BullBear Trading',
                            landing_page: 'BILLING',
                            user_action: 'PAY_NOW'
                        }
                    });
                },
                
                onApprove: async (data, actions) => {
                    try {
                        console.log('PayPal payment approved - Processing...');
                        
                        // Capture payment directly through PayPal
                        const details = await actions.order.capture();
                        
                        if (details.status === 'COMPLETED') {
                            console.log('✅ Payment completed:', details);
                            
                            // Notify backend (optional)
                            this.notifyBackend(data.orderID, amount, description);
                            
                            // Handle successful payment
                            this.handleSuccessfulPayment(description, amount, details);
                        } else {
                            throw new Error('Payment not completed');
                        }
                    } catch (error) {
                        console.error('Payment processing failed:', error);
                        alert('Payment processing failed. Please contact support.');
                    }
                },
                
                onError: (err) => {
                    console.error('PayPal error:', err);
                    alert('Payment failed. Please try again or contact support.');
                },
                
                onCancel: (data) => {
                    console.log('Payment cancelled:', data);
                    alert('Payment was cancelled.');
                }
            }).render(`#paypal-button-${courseId}`);
        }
    }

    // Optional: Notify backend about successful payment
    async notifyBackend(paymentId, amount, description) {
        try {
            const currentUser = JSON.parse(localStorage.getItem('metahubCurrentUser') || '{}');
            
            await fetch(`${this.apiUrl}/capture-payment/${paymentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
                    description: description,
                    userId: currentUser.email || 'guest'
                })
            });
            
            console.log('✅ Backend notified of payment');
        } catch (error) {
            console.log('⚠️ Backend notification failed (payment still successful)');
        }
    }

    handleSuccessfulPayment(courseName, amount, paymentDetails) {
        // Save purchase locally
        this.savePurchase(courseName, amount, 'paypal', paymentDetails);
        
        // Show success message
        this.showSuccessMessage(courseName, amount);
        
        // Redirect to library
        setTimeout(() => {
            window.location.href = 'my-library.html';
        }, 3000);
    }

    savePurchase(courseName, amount, paymentMethod, paymentDetails = null) {
        const currentUser = JSON.parse(localStorage.getItem('metahubCurrentUser') || '{}');
        const userEmail = currentUser.email || 'guest@example.com';

        const purchases = JSON.parse(localStorage.getItem('metahubPurchases_' + userEmail) || '[]');
        
        const purchase = {
            courseId: 'course-' + Date.now(),
            courseName: courseName,
            purchaseDate: new Date().toISOString(),
            orderId: paymentDetails?.id || 'PAYPAL-' + Date.now(),
            amount: amount,
            paymentMethod: paymentMethod,
            status: 'completed',
            paymentDetails: paymentDetails
        };
        
        purchases.push(purchase);
        localStorage.setItem('metahubPurchases_' + userEmail, JSON.stringify(purchases));
        
        console.log('✅ Purchase saved locally:', purchase);
    }

    showSuccessMessage(courseName, amount) {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'payment-success-modal';
        modal.innerHTML = `
            <div class="payment-success-content">
                <div class="success-icon">✅</div>
                <h2>Payment Successful!</h2>
                <p>Thank you for purchasing <strong>${courseName}</strong></p>
                <p>Amount paid: <strong>$${amount} USD</strong></p>
                <div class="success-details">
                    <p>✓ Payment processed securely via PayPal</p>
                    <p>✓ Course access granted immediately</p>
                    <p>✓ No encryption required - Simple & secure</p>
                </div>
                <p style="margin-top: 20px;">Redirecting to your library in 3 seconds...</p>
                <button onclick="this.parentElement.parentElement.remove(); window.location.href='my-library.html'">
                    Go to Library Now
                </button>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.getElementById('paypal-success-styles')) {
            const style = document.createElement('style');
            style.id = 'paypal-success-styles';
            style.textContent = `
                .payment-success-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    backdrop-filter: blur(5px);
                }
                .payment-success-content {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    color: white;
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    max-width: 450px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    animation: slideIn 0.3s ease;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .success-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    animation: bounce 0.6s ease;
                }
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .payment-success-content h2 {
                    color: #06b6d4;
                    margin-bottom: 20px;
                    font-size: 1.8rem;
                }
                .success-details {
                    background: rgba(6, 182, 212, 0.1);
                    border: 1px solid rgba(6, 182, 212, 0.3);
                    border-radius: 10px;
                    padding: 15px;
                    margin: 20px 0;
                    text-align: left;
                }
                .success-details p {
                    margin: 5px 0;
                    font-size: 0.9rem;
                    color: #cbd5e1;
                }
                .payment-success-content button {
                    background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
                    color: white;
                    border: none;
                    padding: 14px 28px;
                    border-radius: 10px;
                    cursor: pointer;
                    margin-top: 20px;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .payment-success-content button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modal);
    }
}

// Initialize PayPal integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with buy buttons
    if (document.querySelector('.buy-now-btn')) {
        new PayPalIntegration();
    }
});

// Export for use in other scripts
window.PayPalIntegration = PayPalIntegration;