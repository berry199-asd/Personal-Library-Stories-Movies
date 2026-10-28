# Personal Library – Stories & Movies

A web-based personal library system for storing, organizing, managing, and sharing stories and movies. The platform also provides private and group messaging, allowing users to connect, discuss, and share their favorite content.

## About the Project

Personal Library – Stories & Movies is an internal web application designed for users who want to manage their favorite stories and movies in one place.

Users can build their own libraries, organize content by categories and genres, share selected items with others, write reviews, and communicate through private or group chats.

The system also includes an administrative dashboard for managing users, content, categories, and community interactions.

## Features

### 1. User Management
- User registration and login.
- Personal profile and avatar management.
- User roles and access control.
- Private and public library management.

### 2. Story & Movie Library
- Add, edit, delete, and manage stories and movies.
- Upload cover images and movie posters.
- Organize content by genres and categories.
- Add detailed descriptions and relevant information.
- Manage reading and watching status.
- Create personal collections and favorites.

### 3. Chapters & Episodes
- Organize stories into chapters.
- Organize movies into seasons and episodes.
- Display chapters and episodes in the correct order.
- Add external reading or watching links to individual titles, chapters, or episodes.
- Open external websites or applications directly from the provided links.

### 4. Search & Filtering
- Search by story or movie title.
- Filter by genre, category, content type, and status.
- Browse personal libraries and shared content.

### 5. Content Sharing
- Share selected stories and movies with other users.
- Keep library items private or make them accessible to others.
- Add shared content to a personal library.
- Manage sharing permissions.
- Share stories, movies, and links through private or group conversations.

### 6. Reviews & Comments
- Write reviews and rate stories or movies.
- Comment on individual chapters and episodes.
- Reply to comments and discuss content.
- Support spoiler warnings for comments containing important plot details.

### 7. Messaging System
- One-to-one private messaging.
- Group conversations.
- Create and manage chat groups.
- Manage group names, avatars, and members.
- Share story and movie information through messages.
- Display conversation history and message timestamps.
- Support real-time messaging and synchronized group information.

### 8. Administration
- Manage user accounts and permissions.
- Manage stories, movies, chapters, and episodes.
- Manage genres and categories.
- Moderate reviews and comments.
- Oversee shared content and reported violations.

## Technology Stack

| Component | Technology |
|---|---|
| Backend | Java |
| Frontend | JavaScript, HTML5, CSS3 |
| Database | MySQL |
| Local Server Environment | XAMPP |
| Version Control | Git & GitHub |

*Note: Additional frameworks and libraries may be specified as the project develops.*

## Getting Started

### Prerequisites

Make sure the following software is installed:

- Java Development Kit (JDK).
- XAMPP with MySQL.
- A Java-compatible IDE, such as NetBeans or IntelliJ IDEA.
- Git.
- A web browser.

### Installation

**1. Clone the repository**

```bash
https://github.com/berry199-asd/Personal-Library-Stories-Movies.git
cd YOUR_REPOSITORY
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your GitHub username and repository name.

**2. Start MySQL using XAMPP**

- Open the XAMPP Control Panel.
- Start the MySQL service.
- Open phpMyAdmin at `http://localhost/phpmyadmin`.

**3. Create the database**

Create a MySQL database for the project. For example:

```sql
CREATE DATABASE personal_library
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Import the project's SQL schema or database initialization script if one is provided.

**4. Configure the database connection**

Configure the Java backend with the appropriate MySQL connection settings:

- Database URL: `jdbc:mysql://localhost:3306/personal_library`
- Username: Your MySQL username.
- Password: Your MySQL password.

Make sure the MySQL JDBC driver is included in the backend project.

Do not commit database passwords or other sensitive credentials to GitHub.

**5. Run the application**

- Open the Java backend project in your IDE.
- Configure the required dependencies and database connection.
- Start the Java backend server.
- Serve the frontend files using the development server or web server configured for the project.
- Open the application in your browser using the appropriate frontend URL.

Refer to the project configuration and documentation for framework-specific commands and settings.

## Project Structure

The project may follow a structure similar to the following:

```text
personal-library/
├── backend/
│   ├── src/
│   ├── resources/
│   └── pom.xml
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
├── database/
│   └── schema.sql
├── docs/
├── .gitignore
└── README.md
```

The actual structure may vary depending on the selected Java framework and project configuration.

## Security & Privacy

- Protect user passwords using secure password hashing.
- Enforce authorization on the backend.
- Protect private libraries and conversations from unauthorized access.
- Validate user input and external URLs.
- Keep credentials and environment-specific settings out of version control.

## Project Status

**Status:** In Development

New features, improvements, and bug fixes will be added as development progresses.

## Future Improvements

- Real-time notifications.
- Advanced search and recommendations.
- Reading and watching progress tracking.
- Improved mobile responsiveness.
- Additional library organization and customization options.

## License

The licensing terms have not yet been specified.

If this project is intended for personal or internal use, define the appropriate license before distributing it publicly.

---

**Personal Library – Stories & Movies**  
A personal space to organize your favorite stories and movies, share your interests, and connect with others.
