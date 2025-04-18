# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Personal Book Management Application

A React application for managing your personal book collection, tracking books you own, are currently reading, or want to buy.

## Features

- Add, edit, and delete books
- Filter books by status (owned, reading, wishlist)
- Search books by title or author
- View statistics about your collection
- Light and dark mode toggle
- Data persistence with localStorage

## Technologies Used

- React with Hooks (useState, useEffect, useContext)
- React Router for navigation
- Context API for state management
- PropTypes for type checking
- Custom hooks (useLocalStorage, useBookStats)
- Vite.js for fast development
- CSS variables for theming

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open your browser to `http://localhost:3000`

## Testing

To run tests:
`npm run test`

## Screenshots

![Home Page Light Mode](/screenshots/home-light.png)
![Home Page Dark Mode](/screenshots/home-dark.png)
![Stats Page](/screenshots/stats.png)

## React Features Used

- **useState/useEffect**: For managing component state and side effects
- **Context API**: For global state management of books and theme
- **React Router**: For multi-page navigation
- **Custom Hooks**: useLocalStorage for persistence, useBookStats for derived data
- **PropTypes**: For component prop validation
- **React Testing Library**: For unit testing components and hooks