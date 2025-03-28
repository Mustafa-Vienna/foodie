# 🍽 Foody Frontend

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/Mustafa-Vienna/foodie)](https://github.com/Mustafa-Vienna/foodie/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/Mustafa-Vienna/foodie)](https://github.com/Mustafa-Vienna/foodie/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/Mustafa-Vienna/foodie)](https://github.com/Mustafa-Vienna/foodie)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=Mustafa-Vienna&repo=foodie&layout=compact)

---

## 📖 Contents <a id="contents"></a>

1. [Project Overview](#project-overview)
2. [Related Projects](#related-projects)
3. [Project Structure](#project-structure)
4. [Features](#features)
   - [Current Features](#current-features)
   - [Upcoming Features](#upcoming-features)
5. [UX and UI Design](#ux-and-ui-design)
   - [Colour Scheme](#colour-scheme)
   - [Typography](#typography)
   - [Wireframes](#wireframes)
6. [Technologies Used](#technologies-used)
7. [Agile Workflow](#agile-workflow)
   - [GitHub Projects](#github-projects)
   - [GitHub Issues](#github-issues)
   - [MoSCoW Prioritization](#moscow-prioritization)
8. [Testing](#testing)
9. [Deployment](#deployment)
   - [Live Site](#live-site)
   - [Local Setup](#local-setup)
10. [Known Issues and Future Enhancements](#known-issues-and-future-enhancements)
11. [Credits](#credits)

---

## 🌟 Project Overview <a id="project-overview"></a>

**Foody** is a full-featured **React frontend** for a modern recipe-sharing platform. It allows food lovers to explore, publish, and interact with recipes in a clean and social-friendly interface. The frontend consumes a RESTful API built with Django and JWT authentication, enabling full CRUD operations, real-time feedback, and user profile management.

[Go to Contents](#contents)

---

## 🌐 Related Projects <a id="related-projects"></a>

### 💻 Frontend Application (React)
- 🔗 GitHub: [Mustafa-Vienna/foodie](https://github.com/Mustafa-Vienna/foodie)
- 🚀 Live Demo: [https://foodiefront-bacd5250c6d8.herokuapp.com/](https://foodiefront-bacd5250c6d8.herokuapp.com/)

### 🧠 Backend API (Django REST + JWT)
- 🔗 GitHub: [Mustafa-Vienna/foodie-back](https://github.com/Mustafa-Vienna/foodie-back)
- 🚀 Live API: [https://foodieback-0e50528a3736.herokuapp.com/](https://foodieback-0e50528a3736.herokuapp.com/)

[Go to Contents](#contents)


## 🧱 Project Structure <a id="project-structure"></a>

The frontend of Foody is structured using a component-based architecture in React. Pages, components, styles, and context are modularly separated to ensure scalability, clarity, and maintainability.

More details on individual folders and file roles are outlined below.

[Go to Contents](#contents)

---

## ✨ Features <a id="features"></a>

Foody offers a dynamic, user-friendly recipe-sharing experience. Users can sign up, create posts with images, like others’ posts, and leave comments. The interface is responsive and intuitive, with personalized content for logged-in users.

### ✅ Current Features <a id="current-features"></a>

- **User Authentication**  
  - Sign up, sign in, and sign out functionality using JWT tokens.

- **Post Management**  
  - Users can create, update, and delete posts.
  - Posts include images, tags, timestamps, and view counters.
  - Users can like and unlike posts.

- **Comments Section**  
  - Logged-in users can add, edit, and delete comments under each post.
  - Each comment displays the author, timestamp, and is tied to its post.

- **Liked Posts Page**  
  - Users can view a dedicated page listing all posts they've liked.
  - Unliking a post removes it from the list dynamically.

- **User Profile Page**  
  - Each user has a profile page displaying their posts and profile image.
  - Users can update their profile information and avatar.

- **Infinite Scroll**  
  - Posts load dynamically as the user scrolls, improving performance and user experience.

- **Responsive Layout**  
  - Fully responsive design using Bootstrap 5.3.3 and modular CSS for layout and styling.

- **Reusable Components**  
  - Core components like `NavBar`, `PostCard`, `LikeButton`, `CommentList`, and `LoadMoreButton` are used across multiple pages to maintain consistency.

---

### 🔮 Upcoming Features <a id="upcoming-features"></a>

Several advanced features are planned for future updates. Many are already supported by the backend and will be integrated into the frontend to enhance interactivity and personalization:

- **Follow System Integration**  
  Display followed users’ posts in a personalized activity feed to build community interaction.

- **Draft Post Feature**  
  Allow users to save posts as drafts and publish them later.

- **Tag-Based Filtering**  
  Implement tag filters such as **Fresh**, **Hot**, and **Featured**, using dynamic backend logic based on post activity.

- **Search Functionality**  
  Let users search posts by title, tags, or author for easier content discovery.

- **Dark Mode Toggle**  
  Provide a toggle to switch between light and dark themes.

- **Custom Error Pages**  
  Add user-friendly 404 and general error pages for improved navigation and experience.

- **Popular Posts Section**  
  Highlight posts with high engagement (e.g., most likes and comments) in a dedicated section to showcase trending content.


[Go to Contents](#contents)


