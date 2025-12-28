# Ritik Lahari's Portfolio with Gallery & Blog

A modern, responsive portfolio website with integrated MongoDB database for managing gallery images and blog posts.

## 🌟 Features

### Frontend
- Responsive design (mobile, tablet, desktop)
- Smooth navigation with scroll effects
- Gallery section with image showcase
- Blog section with article management
- Admin panels for adding content
- Real-time content loading from MongoDB

### Backend
- Express.js REST API
- MongoDB database integration
- File upload handling with Multer
- CRUD operations for Gallery and Blog
- Environment configuration support
- CORS enabled for frontend communication

### Database (MongoDB)
- Cloud-based with MongoDB Atlas
- Gallery collection with image metadata
- Blog collection with article data
- Automatic timestamps and categorization

## 📦 Tech Stack

**Frontend:**
- HTML5
- CSS3 (responsive grid layout)
- Vanilla JavaScript (no frameworks)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Multer (file uploads)

**Deployment:**
- MongoDB Atlas (Database)
- Can be deployed to Heroku, Vercel, Netlify, etc.

## 🚀 Quick Start

1. **Install Node.js**: https://nodejs.org/

2. **Setup MongoDB Atlas**:
   - Create free account at https://www.mongodb.com/cloud/atlas
   - Create cluster and get connection string

3. **Install Dependencies**:
```bash
cd server
npm install
```

4. **Configure Environment**:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

5. **Start Backend**:
```bash
npm start
```

6. **Open Frontend**:
   - Open `myself/index.html` in your browser
   - Or use Python: `cd myself && python -m http.server 8000`

## 📁 Project Structure

```
new_portfolio/
├── myself/                    # Frontend
│   ├── index.html            # Main portfolio page
│   ├── style.css             # Styles
│   ├── gallery-blog.js       # Gallery & blog functionality
│   ├── script.js             # Portfolio scripts
│   └── assets/               # Images and resources
│
├── server/                    # Backend
│   ├── server.js             # Express app
│   ├── package.json          # Dependencies
│   ├── .env                  # Configuration (create this)
│   ├── models/
│   │   ├── Gallery.js        # Gallery schema
│   │   └── Blog.js           # Blog schema
│   ├── routes/
│   │   ├── gallery.js        # Gallery API
│   │   └── blog.js           # Blog API
│   └── uploads/              # Uploaded images
│
├── SETUP_GUIDE.md            # Detailed setup instructions
├── QUICKSTART.md             # Quick reference
└── README.md                 # This file
```

## 🔌 API Endpoints

### Gallery
```
GET    /api/gallery          - Get all images
GET    /api/gallery/:id      - Get single image
POST   /api/gallery          - Upload new image
PATCH  /api/gallery/:id      - Update image
DELETE /api/gallery/:id      - Delete image
```

### Blog
```
GET    /api/blog             - Get all posts
GET    /api/blog/:id         - Get single post
POST   /api/blog             - Create new post
PATCH  /api/blog/:id         - Update post
DELETE /api/blog/:id         - Delete post
```

## 🎨 Gallery Features

- Upload images with title, description, and category
- Auto-generated thumbnails
- Responsive grid layout
- Quick delete functionality
- Category filtering (coming soon)
- Image optimization (coming soon)

## 📝 Blog Features

- Create posts with title, content, and featured image
- Tag system for categorization
- Author information
- Publication timestamps
- Rich text support
- Draft functionality (coming soon)

## 🔐 Security Considerations

- Input validation on all forms
- File type verification for uploads
- Environment variables for sensitive data
- CORS configuration for trusted origins

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly controls
- Optimized images for all devices

## 🚢 Deployment

### Backend Deployment (Heroku)
```bash
heroku login
heroku create your-app-name
git push heroku main
```






## 👨‍💻 About

**Ritik Lahari**
- Full Stack Developer
- NIT Jamshedpur
- [LinkedIn](https://in.linkedin.com/in/ritik-lahari-267213254)
- [GitHub](https://github.com/RitikLahari)

## 📄 License

MIT License - Feel free to use this project for learning and personal projects.


echo "# Ritik_Lahari" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/RitikLahari/Ritik_Lahari.git
git push -u origin main