// Configuration
const API_URL = 'http://localhost:5000/api';
const API_BASE = 'http://localhost:5000';

// Carousel scroll function
function scrollCarousel(type, direction) {
  const container = document.getElementById(`${type}-container`);
  const scrollAmount = 350; // pixels to scroll
  
  if (direction === 1) {
    container.scrollLeft += scrollAmount;
  } else {
    container.scrollLeft -= scrollAmount;
  }
}

// Toggle admin panel
function toggleAdminPanel(type) {
  const panelId = `${type}-admin-panel`;
  const panel = document.getElementById(panelId);
  panel.classList.toggle('hidden');
}

// GALLERY FUNCTIONS
async function loadGallery() {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    if (!response.ok) throw new Error('Failed to load gallery');
    
    const images = await response.json();
    displayGallery(images);
  } catch (error) {
    console.error('Error loading gallery:', error);
    document.getElementById('gallery-container').innerHTML = 
      '<p class="error">Unable to load gallery. Please check backend connection.</p>';
  }
}

function displayGallery(images) {
  const container = document.getElementById('gallery-container');
  
  if (images.length === 0) {
    container.innerHTML = '<p>No images in gallery yet.</p>';
    return;
  }

  container.innerHTML = images.map(image => `
    <div class="gallery-item">
      <img src="${API_BASE}${image.imageUrl}" alt="${image.title}" class="gallery-img" />
      <div class="gallery-info">
        <h3>${image.title}</h3>
        <p>${image.description}</p>
        <span class="category-badge">${image.category}</span>
        <div class="gallery-actions">
          <button class="btn btn-sm btn-color-2" onclick="editGalleryImage('${image._id}')">Edit</button>
          <button class="btn btn-sm btn-color-1" onclick="deleteGalleryImage('${image._id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

async function submitGalleryForm(e) {
  e.preventDefault();
  
  const title = document.getElementById('gallery-title').value;
  const description = document.getElementById('gallery-description').value;
  const category = document.getElementById('gallery-category').value;
  const imageFile = document.getElementById('gallery-image').files[0];

  if (!imageFile) {
    alert('Please select an image');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Failed to upload image');
    
    alert('Image uploaded successfully!');
    document.getElementById('gallery-form').reset();
    toggleAdminPanel('gallery');
    loadGallery();
  } catch (error) {
    alert('Error uploading image: ' + error.message);
  }
}

async function deleteGalleryImage(imageId) {
  if (!confirm('Are you sure you want to delete this image?')) return;

  try {
    const response = await fetch(`${API_URL}/gallery/${imageId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete image');
    
    alert('Image deleted successfully!');
    loadGallery();
  } catch (error) {
    alert('Error deleting image: ' + error.message);
  }
}

function editGalleryImage(imageId) {
  alert('Edit functionality coming soon!');
}

// BLOG FUNCTIONS
async function loadBlog() {
  try {
    const response = await fetch(`${API_URL}/blog`);
    if (!response.ok) throw new Error('Failed to load blog posts');
    
    const posts = await response.json();
    displayBlog(posts);
  } catch (error) {
    console.error('Error loading blog:', error);
    document.getElementById('blog-container').innerHTML = 
      '<p class="error">Unable to load blog posts. Please check backend connection.</p>';
  }
}

function displayBlog(posts) {
  const container = document.getElementById('blog-container');
  
  if (posts.length === 0) {
    container.innerHTML = '<p>No blog posts yet.</p>';
    return;
  }

  container.innerHTML = posts.map(post => `
    <div class="blog-item">
      ${post.imageUrl ? `<img src="${API_BASE}${post.imageUrl}" alt="${post.title}" class="blog-img" />` : ''}
      <div class="blog-content">
        <h3>${post.title}</h3>
        <p class="blog-excerpt">${post.content.substring(0, 150)}...</p>
        <div class="blog-meta">
          <span class="author">By ${post.author}</span>
          <span class="date">${new Date(post.createdAt).toLocaleDateString()}</span>
          <span class="category-badge">${post.category}</span>
        </div>
        ${post.tags.length > 0 ? `<div class="blog-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
        <div class="blog-actions">
          <button class="btn btn-sm btn-color-2" onclick="viewBlogPost('${post._id}')">Read More</button>
          <button class="btn btn-sm btn-color-1" onclick="deleteBlogPost('${post._id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

async function submitBlogForm(e) {
  e.preventDefault();
  
  const title = document.getElementById('blog-title').value;
  const content = document.getElementById('blog-content').value;
  const category = document.getElementById('blog-category').value;
  const tags = document.getElementById('blog-tags').value;
  const imageFile = document.getElementById('blog-image').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('category', category);
  formData.append('tags', tags);
  if (imageFile) {
    formData.append('image', imageFile);
  }
  formData.append('published', 'true');

  try {
    const response = await fetch(`${API_URL}/blog`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Failed to create blog post');
    
    alert('Blog post published successfully!');
    document.getElementById('blog-form').reset();
    toggleAdminPanel('blog');
    loadBlog();
  } catch (error) {
    alert('Error creating blog post: ' + error.message);
  }
}

async function deleteBlogPost(postId) {
  if (!confirm('Are you sure you want to delete this post?')) return;

  try {
    const response = await fetch(`${API_URL}/blog/${postId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete blog post');
    
    alert('Blog post deleted successfully!');
    loadBlog();
  } catch (error) {
    alert('Error deleting blog post: ' + error.message);
  }
}

async function viewBlogPost(postId) {
  try {
    const response = await fetch(`${API_URL}/blog/${postId}`);
    if (!response.ok) throw new Error('Failed to load blog post');
    
    const post = await response.json();
    alert(`${post.title}\n\n${post.content}\n\nBy ${post.author} on ${new Date(post.createdAt).toLocaleDateString()}`);
  } catch (error) {
    alert('Error loading blog post: ' + error.message);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Gallery form
  const galleryForm = document.getElementById('gallery-form');
  if (galleryForm) {
    galleryForm.addEventListener('submit', submitGalleryForm);
  }

  // Blog form
  const blogForm = document.getElementById('blog-form');
  if (blogForm) {
    blogForm.addEventListener('submit', submitBlogForm);
  }

  // Load gallery and blog on page load
  loadGallery();
  loadBlog();
});
