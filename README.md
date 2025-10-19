# Estore

Estore is a simple e-commerce web app built with vanilla HTML5, CSS3, and JavaScript. This was the first project I created when I first learned JavaScript, and I used it to practice DOM manipulation, events, localStorage, and building a small multi-page UI without frameworks.

## Features

- **User accounts (localStorage-based)**
- **Sign up / Sign in with Remember Me**
- **Cart management**
- **Favorites (wishlist)**
- **Product search with instant suggestions**
- **Product details page**
- **Add, edit, delete products (admin-like page)**
- **User settings**: avatar upload, address info, shipping mode
- **Responsive navbar and mobile navigation**
- **LocalStorage persistence** for products, users, cart, favorites, and search

## Pages

- **`index.html`**: Home and product listings
- **`product.html`**: Product details
- **`cart.html`**: Cart items and actions
- **`favourites.html`**: Saved favorites
- **`search-results.html`**: Search results view
- **`addproduct.html`**: Create/update/delete products (image + thumbnails)
- **`settings.html`**: Profile, avatar, address, shipping mode
- **`signinup.html`**: Authentication (sign up / sign in)
- **Category pages**: `clothes-cat.html`, `electronics-cat.html`, `furniture-cat.html`

## Tech stack

- **HTML5**, **CSS3**, **Vanilla JavaScript**
- **LocalStorage** for data persistence (no backend)

## Data & persistence

The app stores data in the browser using `localStorage` keys such as:

- **`productDB`**: products database
- **`cart`**: cart items
- **`fav`**: favorites
- **`signupUser`**, **`currentUserID`**: users and session state
- **`search`**: search cache/results

## How to run

- Open `index.html` in any modern browser. No build step or server is required.

## Notes

- This is a learning/legacy project and intentionally keeps things simple using only vanilla JS and localStorage.
