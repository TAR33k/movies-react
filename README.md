<div align="center">

  <img width="100" height="100" alt="logo" src="https://img.icons8.com/3d-fluency/94/movie.png" />

  <h1>
    <font color="#D6C7FF" style="font-weight: bold;">Movies</font> <font color="#AB8BFF" style="font-weight: bold;">React</font>
  </h1>

  A modern movie discovery application featuring real-time search, dynamic trending metrics, and a sleek dark-themed UI.

  <p>
    <img alt="Framework" src="https://img.shields.io/badge/Framework-React%2019-61DAFB.svg?style=for-the-badge&logo=react"/>
    <img alt="Styling" src="https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC.svg?style=for-the-badge&logo=tailwind-css"/>
    <img alt="Backend" src="https://img.shields.io/badge/BaaS-Appwrite-FD366E.svg?style=for-the-badge&logo=appwrite"/>
    <img alt="Data" src="https://img.shields.io/badge/API-TMDB-01B4E4.svg?style=for-the-badge&logo=themoviedatabase"/>
  </p>

</div>

---

## About The Project

**Movies React** is a responsive single-page application designed to help users discover movies effortlessly. Unlike standard movie apps, this project integrates **Appwrite** to track user search behavior in real-time, generating a dynamic "Trending" section based on what users are actually looking for, rather than just static API data.

The frontend is built with **React 19** and utilizes the latest **Tailwind CSS v4** for a high-performance, maintainable styling architecture using native CSS variables and modern directives.

### Key Features

| Component | Functionality |
| :--- | :--- |
| **Live Search** | Real-time movie searching via the **TMDB API** with debounced inputs for optimized performance. |
| **Dynamic Trending** | A smart trending system that tracks search terms in an **Appwrite** database to display the top 5 most searched movies. |
| **Modern UI/UX** | A "Glassmorphism" inspired dark theme, fully responsive grid layouts, and smooth loading states using generic Spinners. |
| **Responsive** | Mobile-first approach ensuring a seamless experience across phones, tablets, and desktops. |

---

## Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Latest version of React for building the component-based UI. |
| **Build Tool** | **Vite** | Extremely fast build tool and development server. |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS framework configured with the new `@theme` directive. |
| **Backend** | **Appwrite** | Open-source backend server used for Database and Analytics storage. |
| **API** | **TMDB** | The Movie Database API for fetching movie metadata and posters. |

---

## Prerequisites

Before getting started, ensure you have the following ready:

| Requirement | Description |
| :--- | :--- |
| **Node.js** | Version 18.0.0 or higher. |
| **TMDB API Key** | Register at [The Movie Database](https://www.themoviedb.org/documentation/api) to get a free API Key. |
| **Appwrite** | An account on [Appwrite Cloud](https://cloud.appwrite.io/) or a self-hosted instance. |

---

## Environment Configuration

This project relies on environment variables for API connectivity.

1.  Rename `.env.example` to `.env` in the root directory.
2.  Fill in the following values:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

---

## Appwrite Database Setup

To enable the "Trending" feature, you must set up your Appwrite Database correctly:

1.  Create a **Database** in your Appwrite console.
2.  Create a **Collection** within that database.
3.  Add the following **Attributes** to the Collection:

| Attribute Name | Type |
| :--- | :--- |
| `searchTerm` | String |
| `count` | Integer |
| `movie_id` | Integer |
| `poster_url` | URL |

4.  **Permissions:** Ensure the collection has `create` and `read` permissions enabled for `Any`.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TAR33k/movies-react.git
cd movies-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` to view it in the browser.
