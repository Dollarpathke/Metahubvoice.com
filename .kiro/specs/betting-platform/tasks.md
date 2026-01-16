# Implementation Plan: Betting Platform

## Overview

This implementation plan breaks down the betting platform into discrete coding tasks. The platform will be built using Node.js/Express for the backend with MongoDB for data persistence, and vanilla JavaScript for the frontend. Each task builds incrementally, with testing integrated throughout to validate correctness early.

## Tasks

- [ ] 1. Set up project structure and dependencies
  - Create backend directory with Express.js server
  - Install dependencies: express, mongoose, bcryptjs, jsonwebtoken, dotenv, cors
  - Install dev dependencies: jest, fast-check, supertest, mongodb-memory-server
  - Create .env.example file with required environment variables
  - Set up MongoDB connection utility
  - _Requirements: 10.2, 10.4_

- [ ] 2. Implement User model and authentication
  - [ ] 2.1 Create User model with Mongoose schema
    - Define schema with name, email, phone, password, role, balance, limits, self-exclusion fields
    - Add indexes on email and phone for uniqueness
    - Add timestamps
    - _Requirements: 1.1, 9.1, 9.3, 9.5_

  - [ ]* 2.2 Write property test for password hashing
    - **Property 29: Password Hashing**
    - **Validates: Requirements 10.1**

  - [ ] 2.3 Implement authentication middleware and JWT service
    - Create JWT token generation function with 24-hour expiration
    - Create authentication middleware to verify JWT tokens
    - Create admin role verification middleware
    - _Requirements: 1.4, 10.3_

  - [ ]* 2.4 Write property test for JWT expiration
    - **Property 30: JWT Token Expiration**
    - **Validates: Requirements 10.3**

  - [ ] 2.5 Create authentication routes (register, login, password reset)
    - POST /api/auth/register - validate input, hash password, create user
    - POST /api/auth/login - verify credentials, generate JWT
    - POST /api/auth/forgot-password - generate reset token
    - POST /api/auth/reset-password - validate token, update password
    - _Requirements: 1.1, 1.4, 1.6_

  - [ ]* 2.6 Write property tests for authentication
    - **Property 1: Valid User Registration Creates Account**
    - **Property 2: Password Security Requirements Enforcement**
    - **Property 3: Authentication Success with Valid Credentials**
    - **Property 4: Authentication Failure with Invalid Credentials**
    - **Validates: Requirements 1.1, 1.3, 1.4, 1.5**

  - [ ]* 2.7 Write unit tests for authentication edge cases
    - Test duplicate email registration
    - Test password reset flow
    - Test invalid token handling
    - _Requirements: 1.2, 1.6_

- [ ] 3. Checkpoint - Ensure authentication tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement Transaction model and balance management
  - [ ] 4.1 Create Transaction model with Mongoose schema
    - Define schema with userId, type, amount, balanceBefore, balanceAfter, status, mpesa fields
    - Add indexes on userId and createdAt
    - _Requirements: 2.5, 10.4_

  - [ ] 4.2 Create balance management service
    - Implement atomic balance update functions (deposit, withdrawal, bet stake, winnings)
    - Ensure all balance changes create transaction records
    - Use MongoDB sessions for transaction atomicity
    - _Requirements: 2.1, 2.4, 2.5, 2.6_

  - [ ]* 4.3 Write property tests for balance operations
    - **Property 5: Deposit Updates Balance Correctly**
    - **Property 6: Withdrawal Requires Sufficient Balance**
    - **Property 7: Withdrawal Deducts Balance Correctly**
    - **Property 8: Balance Accuracy After Transactions**
    - **Property 31: Financial Transaction Logging**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 10.4**

  - [ ] 4.4 Create user balance routes
    - GET /api/users/balance - return current balance
    - GET /api/users/transactions - return transaction history with filters
    - _Requirements: 2.6, 2.5_

- [ ] 5. Implement Event model and management
  - [ ] 5.1 Create Event model with Mongoose schema
    - Define schema with sport, teams, scheduledTime, status, markets, outcomes, odds, result
    - Add indexes on sport and status
    - _Requirements: 3.1, 3.4_

  - [ ] 5.2 Create event management routes
    - GET /api/events - list events with filters (sport, status)
    - GET /api/events/:id - get single event details
    - POST /api/events - create event (admin only)
    - PUT /api/events/:id - update event (admin only)
    - DELETE /api/events/:id - delete event (admin only)
    - PUT /api/events/:id/odds - update odds (admin only)
    - _Requirements: 3.1, 3.2, 3.4, 3.5, 7.2, 7.3_

  - [ ]* 5.3 Write property tests for event operations
    - **Property 9: Event Categorization by Sport**
    - **Property 20: Admin Odds Modification**
    - **Validates: Requirements 3.4, 3.5, 7.3**

  - [ ]* 5.4 Write unit tests for event management
    - Test event creation with valid data
    - Test event filtering by sport
    - Test odds update by admin
    - _Requirements: 3.1, 7.2, 7.3_

- [ ] 6. Checkpoint - Ensure event management tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement Bet model and placement
  - [ ] 7.1 Create Bet model with Mongoose schema
    - Define schema with userId, eventId, market, outcome, odds, stake, potentialWinnings, status
    - Add indexes on userId and status
    - _Requirements: 4.7_

  - [ ] 7.2 Implement bet placement service
    - Validate sufficient balance
    - Validate event hasn't started
    - Calculate potential winnings
    - Deduct stake from balance atomically
    - Create bet record
    - _Requirements: 4.2, 4.3, 4.4, 4.6, 4.7_

  - [ ]* 7.3 Write property tests for bet placement
    - **Property 10: Bet Slip Addition**
    - **Property 11: Potential Winnings Calculation**
    - **Property 12: Bet Placement Requires Sufficient Balance**
    - **Property 13: Bet Placement Deducts Stake**
    - **Property 14: Betting Prevented on Started Events**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.6, 4.7**

  - [ ] 7.4 Create bet routes
    - POST /api/bets - place a bet
    - GET /api/bets - get user's bets with filters
    - GET /api/bets/:id - get bet details
    - _Requirements: 4.1, 4.7, 5.1, 5.3_

  - [ ]* 7.5 Write property tests for bet retrieval
    - **Property 15: Bet Details Completeness**
    - **Property 16: Bet Filtering by Criteria**
    - **Validates: Requirements 5.3, 5.4**

  - [ ]* 7.6 Write unit tests for bet placement edge cases
    - Test odds change notification
    - Test bet on started event rejection
    - Test insufficient balance rejection
    - _Requirements: 4.3, 4.5, 4.6_

- [ ] 8. Implement bet settlement
  - [ ] 8.1 Create bet settlement service
    - Implement logic to determine winning outcome from event result
    - Implement settlement for won bets (add winnings to balance)
    - Implement settlement for lost bets (mark as lost)
    - Implement settlement for void bets (refund stake)
    - Create transaction records for all settlements
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [ ]* 8.2 Write property tests for bet settlement
    - **Property 17: Winning Bet Settlement**
    - **Property 18: Losing Bet Settlement**
    - **Property 19: Void Bet Refund**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.6**

  - [ ] 8.3 Create settlement route
    - POST /api/bets/:id/settle - settle bet (admin only)
    - _Requirements: 7.6_

  - [ ]* 8.4 Write unit tests for settlement scenarios
    - Test winning bet settlement
    - Test losing bet settlement
    - Test void bet refund
    - _Requirements: 6.2, 6.3, 6.4_

- [ ] 9. Checkpoint - Ensure bet and settlement tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement M-Pesa payment integration
  - [ ] 10.1 Create M-Pesa service class
    - Implement OAuth token generation
    - Implement STK Push for deposits
    - Implement B2C payment for withdrawals
    - Implement callback validation
    - _Requirements: 8.1, 8.4, 8.6_

  - [ ] 10.2 Create payment routes
    - POST /api/payments/deposit - initiate M-Pesa deposit
    - POST /api/payments/mpesa-callback - handle M-Pesa callbacks
    - POST /api/payments/withdraw - request withdrawal
    - GET /api/payments/transactions - get payment history
    - _Requirements: 8.1, 8.2, 8.4_

  - [ ]* 10.3 Write property tests for payment processing
    - **Property 24: M-Pesa Callback Processing**
    - **Property 25: Failed Payment Handling**
    - **Validates: Requirements 8.2, 8.3, 8.5, 8.6**

  - [ ]* 10.4 Write unit tests for M-Pesa integration
    - Test STK push initiation (mocked)
    - Test successful callback processing
    - Test failed callback handling
    - Test B2C withdrawal initiation (mocked)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 11. Implement responsible gambling features
  - [ ] 11.1 Add limit enforcement to user service
    - Implement deposit limit checking
    - Implement loss limit checking
    - Implement self-exclusion checking
    - _Requirements: 9.2, 9.4, 9.6_

  - [ ] 11.2 Create responsible gambling routes
    - PUT /api/users/limits - set deposit and loss limits
    - POST /api/users/self-exclude - set self-exclusion period
    - _Requirements: 9.1, 9.3, 9.5_

  - [ ]* 11.3 Write property tests for limit enforcement
    - **Property 26: Deposit Limit Enforcement**
    - **Property 27: Loss Limit Enforcement**
    - **Property 28: Self-Exclusion Enforcement**
    - **Validates: Requirements 9.2, 9.4, 9.6**

  - [ ]* 11.4 Write unit tests for responsible gambling
    - Test setting deposit limits
    - Test deposit rejection when limit exceeded
    - Test self-exclusion login prevention
    - _Requirements: 9.1, 9.2, 9.5, 9.6_

- [ ] 12. Implement admin dashboard functionality
  - [ ] 12.1 Create admin statistics service
    - Calculate total bets count
    - Calculate active users count
    - Calculate total revenue
    - _Requirements: 7.4_

  - [ ]* 12.2 Write property test for statistics accuracy
    - **Property 21: Platform Statistics Accuracy**
    - **Validates: Requirements 7.4**

  - [ ] 12.3 Create admin routes
    - GET /api/admin/stats - get platform statistics
    - GET /api/admin/users - get all users
    - PUT /api/admin/users/:id - update user account
    - GET /api/admin/bets - get all bets
    - POST /api/admin/withdrawals/:id/approve - approve/reject withdrawal
    - _Requirements: 7.1, 7.4, 7.5, 7.7_

  - [ ]* 12.4 Write property tests for admin operations
    - **Property 22: Manual Bet Settlement by Admin**
    - **Property 23: Withdrawal Approval Updates Status**
    - **Validates: Requirements 7.6, 7.7**

  - [ ]* 12.5 Write unit tests for admin operations
    - Test admin authentication
    - Test statistics calculation
    - Test withdrawal approval
    - Test manual bet settlement
    - _Requirements: 7.1, 7.4, 7.6, 7.7_

- [ ] 13. Implement security features
  - [ ] 13.1 Add input validation and sanitization middleware
    - Validate all user inputs against expected formats
    - Sanitize inputs to prevent injection attacks
    - Add rate limiting to prevent abuse
    - _Requirements: 10.5_

  - [ ]* 13.2 Write property test for input validation
    - **Property 32: Input Validation and Sanitization**
    - **Validates: Requirements 10.5**

  - [ ] 13.3 Add error handling middleware
    - Implement centralized error handler
    - Format error responses consistently
    - Log errors with appropriate detail
    - _Requirements: 10.4_

  - [ ]* 13.4 Write unit tests for security features
    - Test SQL injection prevention
    - Test XSS prevention
    - Test rate limiting
    - _Requirements: 10.5_

- [ ] 14. Checkpoint - Ensure all backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Build frontend user interface
  - [ ] 15.1 Create main landing page (index.html)
    - Design responsive layout with navigation
    - Add hero section with call-to-action
    - Display featured events
    - _Requirements: 3.1_

  - [ ] 15.2 Create user registration and login pages
    - Build registration form with validation
    - Build login form
    - Implement client-side password validation
    - Store JWT token in localStorage
    - _Requirements: 1.1, 1.3, 1.4_

  - [ ] 15.3 Create events browsing page
    - Display events list with filters (sport, status)
    - Show event details with markets and odds
    - Implement real-time odds updates (polling every 5 seconds)
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [ ] 15.4 Create bet slip component
    - Add selected bets to slip
    - Calculate potential winnings dynamically
    - Implement bet placement with balance validation
    - Show confirmation on successful bet
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 15.5 Create user account page
    - Display current balance
    - Show transaction history
    - Provide deposit and withdrawal forms
    - Allow setting betting limits
    - Allow self-exclusion
    - _Requirements: 2.6, 2.5, 9.1, 9.3, 9.5_

  - [ ] 15.6 Create bet history page
    - Display active bets
    - Display historical bets with outcomes
    - Implement filtering by date, sport, status
    - _Requirements: 5.1, 5.2, 5.4_

- [ ] 16. Build admin dashboard interface
  - [ ] 16.1 Create admin login page
    - Build admin authentication form
    - Verify admin role on login
    - _Requirements: 7.1_

  - [ ] 16.2 Create admin dashboard home
    - Display platform statistics (total bets, active users, revenue)
    - Show recent activity
    - _Requirements: 7.4_

  - [ ] 16.3 Create event management interface
    - List all events with edit/delete actions
    - Form to create new events
    - Form to update odds
    - _Requirements: 7.2, 7.3_

  - [ ] 16.4 Create user management interface
    - List all users with search
    - View user details and betting history
    - Ability to update user accounts
    - _Requirements: 7.5_

  - [ ] 16.5 Create bet management interface
    - List all bets with filters
    - Manually settle or void bets
    - _Requirements: 7.6_

  - [ ] 16.6 Create withdrawal approval interface
    - List pending withdrawals
    - Approve or reject withdrawal requests
    - _Requirements: 7.7_

- [ ] 17. Integration and final testing
  - [ ] 17.1 Wire all components together
    - Connect frontend to backend API
    - Test complete user flows (registration → deposit → bet → settlement)
    - Test admin flows (create event → manage odds → settle bets)
    - _Requirements: All_

  - [ ]* 17.2 Write integration tests
    - Test end-to-end user registration and betting flow
    - Test end-to-end deposit and withdrawal flow
    - Test admin event creation and settlement flow
    - _Requirements: All_

  - [ ] 17.3 Add environment configuration
    - Document all required environment variables
    - Create setup instructions in README
    - Add deployment configuration
    - _Requirements: 10.2_

- [ ] 18. Final checkpoint - Complete system validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout development
- Property tests validate universal correctness properties using fast-check library
- Unit tests validate specific examples, edge cases, and integration points
- All property tests should run minimum 100 iterations
- Frontend uses vanilla JavaScript for simplicity, can be upgraded to React/Vue later
- M-Pesa integration requires Safaricom Daraja API credentials
- MongoDB Atlas recommended for database hosting
