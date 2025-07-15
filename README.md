# Abhishek Payezhi Chegattil - Portfolio Website

A modern, responsive portfolio website showcasing my experience as a Data Engineer and Kubernetes Specialist. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy maintenance.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Kubernetes/Data Engineering Theme**: Professional color scheme and design elements
- **LinkedIn Integration**: Displays latest LinkedIn posts (placeholder implementation)
- **Medium Integration**: Shows recent Medium articles (placeholder implementation)
- **Modern Animations**: Smooth scrolling, fade-in effects, and typewriter animations
- **Contact Form**: Interactive contact form with validation
- **Performance Optimized**: Fast loading times with optimized images and code

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling with Kubernetes theme
├── script.js          # JavaScript functionality
├── profile.jpg        # Optimized profile image
├── README.md          # This file
└── resume.tex         # Original LaTeX resume (source content)
```

## 🎨 Design Highlights

- **Color Palette**: Professional blue and gray theme inspired by Kubernetes and cloud technologies
- **Typography**: Inter font family for modern, clean appearance
- **Icons**: Font Awesome icons for consistent visual elements
- **Layout**: CSS Grid and Flexbox for responsive, modern layouts
- **Animations**: CSS animations and JavaScript interactions for enhanced UX

## 🔧 Setup & Installation

### Local Development

1. **Clone or Download** the portfolio files to your local machine
2. **Open** `index.html` in your web browser
3. **Serve locally** (recommended) using a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

4. **Access** the portfolio at `http://localhost:8000`

### Live LinkedIn Integration

To enable live LinkedIn posts, you'll need to:

1. **LinkedIn API Access**: Apply for LinkedIn API access through LinkedIn Developer Portal
2. **Authentication**: Implement OAuth 2.0 flow for user authentication
3. **API Endpoints**: Use LinkedIn's `/v2/shares` endpoint to fetch posts
4. **Update JavaScript**: Replace the mock data in `loadLinkedInPosts()` function

**Note**: LinkedIn API has restrictions and requires approval for certain use cases.

### Live Medium Integration

For Medium articles integration:

1. **RSS Feed Approach** (Recommended):
   ```javascript
   // Replace in loadMediumArticles() function
   const rssUrl = 'https://medium.com/feed/@yourusername';
   // Use a CORS proxy or backend service to fetch RSS data
   ```

2. **Medium API** (Limited):
   - Medium's API is limited and doesn't support fetching user articles
   - RSS feed approach is more reliable

3. **Implementation Example**:
   ```javascript
   async function loadMediumArticles() {
       try {
           const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yourusername`);
           const data = await response.json();
           // Process and display articles
       } catch (error) {
           console.error('Error fetching Medium articles:', error);
       }
   }
   ```

## 🌐 Deployment Options

### GitHub Pages
1. Create a GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Access your portfolio at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the portfolio folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployment with custom domain support

### Vercel
1. Import project from GitHub
2. Automatic deployments on every push
3. Custom domain and analytics support

### Traditional Web Hosting
1. Upload files via FTP to your web hosting provider
2. Ensure `index.html` is in the root directory
3. Configure custom domain if needed

## 📱 Mobile Responsiveness

The portfolio is fully responsive with:
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Flexible Layouts**: CSS Grid and Flexbox adapt to screen sizes
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Optimized Images**: Responsive images that scale properly

## 🛠 Customization

### Colors
Update CSS variables in `:root` section of `styles.css`:
```css
:root {
    --primary-blue: #326ce5;
    --secondary-blue: #4285f4;
    /* Add your custom colors */
}
```

### Content
- **Personal Information**: Update in `index.html`
- **Projects**: Modify the projects section with your own work
- **Skills**: Update the skills sections with your technologies
- **Contact Info**: Change contact details in the contact section

### Animations
- **Typewriter Effect**: Modify titles in `script.js` `typeWriterEffect()` function
- **Scroll Animations**: Adjust timing in `observerOptions`
- **Hover Effects**: Customize in CSS `:hover` selectors

## 📊 Performance Features

- **Lazy Loading**: Images load only when needed
- **Optimized Images**: Compressed and appropriately sized
- **Minimal Dependencies**: Only Font Awesome and Google Fonts
- **Clean Code**: Well-structured HTML, CSS, and JavaScript
- **Fast Loading**: Optimized for quick initial page load

## 🐛 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features Used**: CSS Grid, Flexbox, ES6+ JavaScript
- **Fallbacks**: Graceful degradation for older browsers

## 📝 Content Source

All content is extracted and adapted from the original LaTeX resume (`resume.tex`), including:
- Professional experience and achievements
- Technical skills and certifications
- Education background
- Project details from comments section

## 🤝 Contributing

Feel free to fork this portfolio and adapt it for your own use. If you make improvements, consider sharing them back!

## 📧 Contact

- **Email**: abhishekp.cnair@gmail.com
- **LinkedIn**: [abhishek-payezhi-chegattil](https://www.linkedin.com/in/abhishek-payezhi-chegattil)
- **GitHub**: [abhishekpcnair](https://github.com/abhishekpcnair)
- **GitLab**: [abhishekp.cnair](https://gitlab.com/abhishekp.cnair)

## 📄 License

This portfolio is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Abhishek Payezhi Chegattil - Data Engineer & Kubernetes Specialist* 