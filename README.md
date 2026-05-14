# Expense Tracker App

A mobile expense tracking application built with React Native.  
This app helps users manage their income and expenses using customizable cards for monthly budgets, trips, events, or any personal purpose.

## Features

- User Authentication
  - Login and signup support
  - Access data from any device when logged in

- Guest Mode
  - Use the app without creating an account
  - Data stored locally on the device
  - No cloud sync in guest mode

- Expense & Income Tracking
  - Add income and expenses inside cards
  - Track monthly spending
  - Create custom cards for trips, shopping, events, etc.

- Cloud Database Support (Planned)
  - Logged-in users will have data stored in MongoDB Atlas
  - Real-time access across multiple devices

- Local Storage
  - Guest users’ data stored securely in device local storage

## Tech Stack

### Frontend
- React Native
- Expo (if using Expo)
- React Navigation

### Backend (Planned)
- Node.js
- Express.js
- MongoDB Atlas

### Storage
- AsyncStorage (Guest Mode)
- MongoDB Atlas (Authenticated Users)

## App Flow

### Logged-In Users
1. User logs in
2. Data is stored in cloud database
3. User can access expenses from any device

### Guest Users
1. User enters as guest
2. Data stored locally on device
3. Data remains only on that phone

## Future Plans

- Charts and analytics
- Budget goals
- Category filters
- Dark mode
- Export expenses as PDF
- Shared group expense tracking
- Notifications and reminders

## Installation

```bash
git clone <your-repo-link>
cd expense-tracker
npm install
npm start