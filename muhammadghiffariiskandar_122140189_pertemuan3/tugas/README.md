# Personal Book Management App

A React application for managing your personal book collection, allowing you to track books you own, are reading, or want to purchase.

## Features

- Add new books with title, author, status, and optional notes
- Edit and delete existing books
- Filter books by status (owned, reading, want to buy)
- Search through your collection by title or author
- View statistics about your book collection
- Data persists in your browser using localStorage

## Screenshots

![Home Page](/images/Home%20Page.PNG)
*Home page showing the book collection*

![Add Book Form](/images/Add%20Book%20Form.PNG)
*Adding a new book to the collection*

![Statistics Page](/images/Statistik%20Page.PNG)
*Statistics about your book collection*

## Installation and Setup

1. Clone the repository
```
git clone https://github.com/yourusername/book-management-app.git
cd book-management-app
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

- **React** - UI library
- **React Router** - For navigation between pages
- **Vite** - Build tool and development server
- **LocalStorage API** - For client-side data persistence

## React Features Used

### State Management
- **useState** - For component-level state management
- **useReducer** - For more complex state operations
- **Context API** - For global state management across components

### Effects and Lifecycle
- **useEffect** - For side effects like localStorage synchronization

### Custom Hooks
- **useLocalStorage** - Custom hook for localStorage persistence
- **useBookStats** - Custom hook for calculating book statistics

### Routing
- **React Router** - For navigation between Home and Stats pages

### Component Architecture
- Reusable components for book items, forms, and lists
- Proper component composition and props drilling avoidance

### PropTypes
- Type checking for all component props

### Testing
- Unit tests with React Testing Library

## Project Structure

```
src/
├── components/
│   ├── BookForm/
│   ├── BookList/
│   └── Navbar/
├── pages/
│   ├── Home/
│   └── Stats/
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── context/
│   └── BookContext.js
└── App.js
```

## Testing

Run the test suite with:

```
npm test
```

### Laporan Hasil Testing

Berikut adalah hasil dari pengujian unit menggunakan Vitest dan React Testing Library:

#### Contoh Hasil Test
- **Komponen BookForm**:
  - Validasi input berhasil dilakukan.
  - Fungsi `addBook` dan `editBook` dipanggil dengan data yang benar.
  - Tombol "Cancel" berhasil menutup form.

- **Komponen BookList**:
  - Filter berdasarkan status dan pencarian bekerja dengan benar.
  - Pesan "No books found" muncul saat tidak ada buku yang sesuai dengan filter.

#### Screenshots Hasil Test
![Hasil Test](https://via.placeholder.com/800x450)
*Screenshot hasil pengujian unit test menggunakan Vitest*

## License

MIT