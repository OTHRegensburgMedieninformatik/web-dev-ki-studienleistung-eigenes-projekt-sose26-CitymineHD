# Peisinger SC e.V. Website - Web Technology Final Project

## 📋 Description

This is the official website for the Peisinger SC e.V., developed as a final project for the Web Technology course at the OTH Regensburg.

## ✨ Features

- A lot of Information Pages about the club, its departments and contact information
- A news section
- Registration and login system for (new) members
- Admin Features to manage stuff on the website

## 🛠 Tech Stack

- **Backend:** Node.js with Express.js
- **Frontend:** Handlebars, Bootstrap for styling
- **Database:** PostgreSQL
- **Extra Libraries:**
    - crypto for password and personal data encryption
    - express-session for session management
    - connect-pg-simple for PostgreSQL connection
    - Editor.js for rich text inline Editor

## 📦 Installation & Setup

### Installation Steps

1. Clone the Repo: 
`git clone https://github.com/OTHRegensburgMedieninformatik/web-dev-ki-studienleistung-eigenes-projekt-sose26-CitymineHD.git`

2. Install the Dependencies:
Go into your terminal and navigate to the project directory:
```bash
cd web-dev-ki-studienleistung-eigenes-projekt-sose26-CitymineHD
```
Just install the dependencies with npm:
```bash
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env`file in the root directory and set the following variables:

```.env
PORT=[THE PORT TO YOUR DATABASE]
DB_CON_STRING=[YOUR DATABASE CONNECTION URL]
CRYPTO_KEY=[USE `npm run genkey` to generate a random new key]
```

## 📁 Project Structure

Peisinger-SC-Website/
├── app.js                          # Main application entry point
├── routes.js                       # Route definitions
├── package.json                    # Project dependencies
├── README.md                       # Project documentation
│
├── controllers/                    # Business logic controllers
│   ├── accounts.js                 # Account management
│   ├── archive.js                  # Archive management
│   ├── home.js                     # Homepage controller
│   ├── membership.js               # Membership management
│   ├── news.js                     # News controller
│   ├── profil.js                   # Profile controller
│   ├── profil-edit.js              # Profile editing
│   ├── department/                 # Department-specific controllers
│   │   ├── breitensport.js         # Breitensport department
│   │   ├── soccer.js               # Soccer department
│   │   ├── stockschuetzen.js       # Stockschützen department
│   │   └── tennis.js               # Tennis department
│   └── verein/                     # Club-specific controllers
│       ├── appointments.js         # Appointments management
│       ├── contact.js              # Contact management
│       ├── facility.js             # Facility management
│       ├── leading.js              # Leadership management
│       └── verein.js               # Main club controller
│
├── models/                         # Data models and storage
│   ├── contact-store.js            # Contact data handling
│   ├── crypto.js                   # Encryption utilities
│   ├── data-store.js               # General data storage
│   ├── json-to-text-parser.js      # JSON to text parsing (not in use)
│   ├── leading-store.js            # Leadership data handling
│   ├── news-store.js               # News data handling
│   └── user-store.js               # User data handling
│
├── views/                          # Frontend
│   ├── archive.hbs
│   ├── index.hbs
│   ├── membership.hbs
│   ├── news.hbs
│   ├── profile-edit.hbs
│   ├── profile.hbs
│   ├── layouts/
│   │   └── main.hbs                # Main layout template
│   ├── partials/                   # Reusable template components
│   │   ├── footer.hbs
│   │   ├── menu.hbs
│   │   ├── pop_up_add_edit_article.hbs
│   │   ├── pop_up_contact.hbs
│   │   ├── pop_up_edit_member.hbs
│   │   ├── pop_up_news.hbs
│   │   └── pop_up_team.hbs
│   ├── department/                 # Department-specific views
│   │   ├── breitensport.hbs
│   │   ├── soccer.hbs
│   │   ├── stockschuetzen.hbs
│   │   └── tennis.hbs
│   └── verein/                     # Club-specific views
│       ├── appointments.hbs
│       ├── contact.hbs
│       ├── facility.hbs
│       ├── leading.hbs
│       ├── login.hbs
│       └── verein.hbs
│
├── public/                         # Static files
│   ├── css/
│   │   └── style.css               # Main stylesheet
│   └── src/                        # Frontend assets
│       ├── department/             # Department-specific assets
│       ├── facility/               # Facility assets
│       ├── header/                 # Header assets
│       ├── home/                   # Homepage assets
│       ├── leading/                # Leadership assets
│       ├── membership/             # Membership assets
│       ├── news/                   # News assets
│       └── profile/                # Profile assets
│
└── utils/                          # Utility functions
    ├── auth.js                     # Authentication utilities
    └── logger.js                   # Logging utilities

## 🚀 Usage

### Starting the Application

To start the application, be in the root directory of your project and run:

```bash
npm start
```

Then go into your browser and open `http://localhost:[PORT]` (replace `[PORT]` with the selected port in your `.env` file)

## 📚 API / Routes Documentation

### Main Routes

#### Frontend Routes

| Methode | Route | Description | Protection |
| --- | --- | --- | --- |
| **GET** | `/` | Homepage | Public |
| **GET** | `/news` | News page | Public |
| **GET** | `/archive` | Archive page | Public |
| **GET** | `/membership` | Membership page | Public |
| **POST** | `/membership/apply` | Handle membership application form submission | Public |
| **GET** | `/department/breitensport` | Breitensport department page | | Public |
| **GET** | `/department/soccer` | Soccer department page | Public |
| **GET** | `/department/stockschuetzen` | Stockschützen department page | Public |
| **GET** | `/department/tennis` | Tennis department page | Public |
| **GET** | `/verein/appointments` | Appointments page | Public |
| **GET** | `/verein/contact` | Contact page | Public |
| **GET** | `/verein/facility` | Facility page | Public |
| **GET** | `/verein/leading` | Leadership page | Public |
| **GET** | `/verein/overview` | Main club page | Public |

#### Internal Routes

| Methode | Route | Description | Protection |
| --- | --- | --- | --- |
| **GET** | `/profile` | User profile page | Authenticated Users |
| **GET** | `/profile/edit` | Edit user profile page | Authenticated Users |
| **POST** | `/profile/edit/:id` | Handle profile edit form submission | Authenticated Users |
| **POST** | `/profile/editPassword` | Handle password change form submission | Authenticated Users |
| **POST** | `/profile/uploadProfilePicture` | Handle profile picture upload | Authenticated Users |

#### Admin Routes

| Methode | Route | Description | Protection |
| --- | --- | --- | --- |
| **POST** | `/profile/editStatus/:id` | Handle member status change form submission | Admin Users |
| **POST** | `/profile/editPosition/:id` | Handle member position change form submission | Admin Users |
| **POST** | `/profile/memberDetails/:id` | Handle member details edit form submission | Admin Users |
| **POST** | `/profile/deletePosition/:id` | Handle member position deletion form submission | Admin Users |
| **POST** | `/news/addNews` | Handle news addition form submission | Admin Users |
| **POST** | `/news/editNews/:id` | Handle news edit form submission | Admin Users |
| **POST** | `/news/deleteNews/:id` | Handle news deletion form submission | Admin Users |

### Editor Documentation

In the news section, there is an inline rich text editor, called Editor.js, embedded. It allows admins to create and edit news articles with rich formatting options. Implementet Features:
- Text formatting (bold, italic, underline)
- Headings (H1, H2, H3, H4)
- Lists (ordered and unordered)
- Text alignment (left, center, right)
- Links
- Video embedding (Youtube) (just copy the URL in an empty line)

Documentation of the editor: [Editor.js Documentation](https://editorjs.io/base-concepts/)
Editor.js Extensions Documentation: [Editor.js Tools](https://github.com/editor-js/awesome-editorjs)

## 🔐 Authentication

There exists two types of users:
- **Regular User (member)** - Can view all public and internal protected pages, can edit their own profile and upload a profile picture
- **Admin User (admin)** - Has all permissions of a regular user, can also edit the profile of other users except of password and profile picture, change their status and position, can add, edit and delete news articles. The Admin Function are accessible via their own profile page

A User can Login to the webite with their email and password. The Login Form is located in the dropdown menu under "Verein".

## 🐛 Known Issues

- In the registration form, the department selection does not appear in the database. Its always saved as NULL.
- Pop Up for leadings are missing

## 📝 Academic Context and License

- **Project Name:** Peisinger SC e.V. Website - Web Technology Final Project
- **University Name:** OTH Regensburg
- **Course Name:** Web Technology
- **Professor Name:** Prof. Dr. Markus Heckner

## 👥 Authors

- Lucas Pfeffer - [GitHub Profile](https://github.com/CitymineHD) - [E-Mail Official](mailto:lucas.pfeffer@st.oth-regensburg.de) - [E-Mail Private](mailto:lucas.pfeffer@gmx.de)

---

**Last Updated:** June 2026