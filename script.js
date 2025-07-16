// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);

            // In a real implementation, you would send this data to your backend
            console.log('Form submission:', data);
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat').forEach(el => {
        observer.observe(el);
    });

    // LinkedIn Posts Integration
    loadLinkedInPosts();

    // Medium Articles Integration
    loadMediumArticles();

    // Dev.to Articles Integration
    loadDevToArticles();

    // Parallax Effects
    initParallaxEffects();

    // Theme Toggle
    initThemeToggle();

    // Type writer effect for hero subtitle
    typeWriterEffect();
});

// LinkedIn Posts Loading Function
async function loadLinkedInPosts() {
    const linkedinContainer = document.getElementById('linkedin-posts');
    
    try {
        // Placeholder for LinkedIn posts - in real implementation, you would use LinkedIn API
        // Note: LinkedIn API requires authentication and has limitations for personal profiles
        
        // Simulated LinkedIn posts data
        const mockPosts = [
            {
                content: "🚀 Excited to share my latest work on Kubernetes orchestration for data pipelines! The combination of cloud-native technologies and efficient data processing continues to amaze me. #Kubernetes #DataEngineering #CloudNative",
                date: "2024-01-15",
                likes: 45,
                comments: 8
            },
            {
                content: "Just completed deploying a Large Language Model using BentoML and VLLM. The performance improvements are incredible! RAG implementation for technical documentation is game-changing. #LLM #MachineLearning #AI",
                date: "2024-01-10",
                likes: 67,
                comments: 12
            },
            {
                content: "Loving the new features in Apache Spark 3.5! The improved performance for data lake operations is exactly what we needed for our EU projects. #ApacheSpark #BigData #DataEngineering",
                date: "2024-01-05",
                likes: 34,
                comments: 6
            }
        ];

        // Clear loading state
        linkedinContainer.innerHTML = '';

        // Render mock posts
        mockPosts.forEach(post => {
            const postElement = createPostElement(post, 'linkedin');
            linkedinContainer.appendChild(postElement);
        });

        // Add note about live integration
        const note = document.createElement('div');
        note.className = 'integration-note';
        note.innerHTML = '<p><small><em>Note: Live LinkedIn integration requires API authentication. Contact me for the latest updates!</em></small></p>';
        linkedinContainer.appendChild(note);

    } catch (error) {
        console.error('Error loading LinkedIn posts:', error);
        linkedinContainer.innerHTML = '<div class="error-message">Unable to load LinkedIn posts at the moment.</div>';
    }
}

// Medium Articles Loading Function with RSS Feed Support
async function loadMediumArticles() {
    const mediumContainer = document.getElementById('medium-articles');
    
    try {
        // Try to load from Medium RSS feed
        // Replace 'yourusername' with actual Medium username
        const rssUrl = 'https://medium.com/feed/@yourusername';
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                // Clear loading state
                mediumContainer.innerHTML = '';
                
                // Render actual articles (limit to 3)
                data.items.slice(0, 3).forEach(item => {
                    const article = {
                        title: item.title,
                        excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                        date: item.pubDate,
                        readTime: Math.ceil(item.description.split(' ').length / 200) + ' min read',
                        url: item.link
                    };
                    const articleElement = createArticleElement(article);
                    mediumContainer.appendChild(articleElement);
                });
                
                const note = document.createElement('div');
                note.className = 'integration-note';
                note.innerHTML = '<p><small><em>Latest articles from Medium RSS feed</em></small></p>';
                mediumContainer.appendChild(note);
                return;
            }
        } catch (rssError) {
            console.warn('RSS feed not available, using mock data');
        }
        
        // Fallback to mock data
        const mockArticles = [
            {
                title: "Building Scalable Data Pipelines with Kubernetes and Apache Spark",
                excerpt: "A comprehensive guide to deploying and managing data processing workloads in cloud-native environments...",
                date: "2024-01-12",
                readTime: "8 min read",
                url: "#"
            },
            {
                title: "Implementing MLOps with BentoML and Kubernetes",
                excerpt: "How to streamline machine learning deployment using modern DevOps practices and container orchestration...",
                date: "2024-01-08",
                readTime: "12 min read",
                url: "#"
            },
            {
                title: "Optimizing Data Lake Performance with Trino and MinIO",
                excerpt: "Best practices for query optimization and storage management in distributed data architectures...",
                date: "2024-01-03",
                readTime: "10 min read",
                url: "#"
            }
        ];

        // Clear loading state
        mediumContainer.innerHTML = '';

        // Render mock articles
        mockArticles.forEach(article => {
            const articleElement = createArticleElement(article);
            mediumContainer.appendChild(articleElement);
        });

        // Add note about integration
        const note = document.createElement('div');
        note.className = 'integration-note';
        note.innerHTML = '<p><small><em>Note: Connect Medium RSS feed by updating the username in script.js</em></small></p>';
        mediumContainer.appendChild(note);

    } catch (error) {
        console.error('Error loading Medium articles:', error);
        mediumContainer.innerHTML = '<div class="error-message">Unable to load Medium articles at the moment.</div>';
    }
}

// Create Post Element for LinkedIn
function createPostElement(post, platform) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-item';
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    postDiv.innerHTML = `
        <div class="post-content">
            <p>${post.content}</p>
        </div>
        <div class="post-meta">
            <span class="post-date">${formatDate(post.date)}</span>
            <div class="post-stats">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
            </div>
        </div>
    `;

    return postDiv;
}

// Create Article Element for Medium
function createArticleElement(article) {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'article-item';
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    articleDiv.innerHTML = `
        <div class="article-content">
            <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
        <div class="article-meta">
            <span class="article-date">${formatDate(article.date)}</span>
            <span class="article-read-time">${article.readTime}</span>
        </div>
    `;

    return articleDiv;
}

// Typewriter Effect for Hero Subtitle
function typeWriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    const titles = [
        'Data Engineer & Kubernetes Specialist',
        'Cloud-Native Solutions Architect',
        'AI/ML Engineer',
        'Big Data Processing Expert'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before starting new title
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(type, 1000);
}

// Skills Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const percentage = bar.dataset.percentage;
        bar.style.width = percentage + '%';
    });
}

// Add CSS for blog posts and articles
const additionalCSS = `
.post-item, .article-item {
    padding: 1rem;
    border-bottom: 1px solid var(--gray-200);
    transition: background-color 0.3s ease;
}

.post-item:hover, .article-item:hover {
    background-color: var(--gray-100);
}

.post-item:last-child, .article-item:last-child {
    border-bottom: none;
}

.post-content p, .article-content p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: var(--gray-700);
}

.article-content h4 {
    margin-bottom: 0.5rem;
}

.article-content h4 a {
    color: var(--gray-800);
    text-decoration: none;
    font-weight: 600;
}

.article-content h4 a:hover {
    color: var(--primary-blue);
}

.article-excerpt {
    font-size: 0.9rem;
    color: var(--gray-600);
}

.post-meta, .article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: var(--gray-500);
    margin-top: 0.5rem;
}

.post-stats {
    display: flex;
    gap: 1rem;
}

.post-stats span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.integration-note {
    padding: 1rem;
    background-color: var(--light-blue);
    border-radius: var(--radius-md);
    margin-top: 1rem;
    text-align: center;
}

.error-message {
    padding: 2rem;
    text-align: center;
    color: var(--gray-500);
    font-style: italic;
}

.article-tags {
    margin: 0.5rem 0;
}

.tag {
    background: var(--primary-blue);
    color: var(--white);
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    margin-right: 0.25rem;
    display: inline-block;
}

@media (max-width: 768px) {
    .post-meta, .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
}
`;

// Add the additional CSS to the document
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add smooth reveal animation for sections
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
});

// Console greeting for developers
console.log(`
🚀 Welcome to Abhishek's Portfolio!
👨‍💻 Data Engineer & Kubernetes Specialist
🔧 Built with vanilla HTML, CSS, and JavaScript
📧 Contact: abhishekp.cnair@gmail.com
🌐 LinkedIn: linkedin.com/in/abhishek-payezhi-chegattil
`)

// Dev.to Articles Loading Function
async function loadDevToArticles() {
    const devtoContainer = document.getElementById('devto-articles');
    
    try {
        // Try to load from Dev.to API
        // Replace 'yourusername' with actual Dev.to username
        const username = 'yourusername';
        const apiUrl = `https://dev.to/api/articles?username=${username}&per_page=3`;
        
        try {
            const response = await fetch(apiUrl);
            const articles = await response.json();
            
            if (articles && articles.length > 0) {
                // Clear loading state
                devtoContainer.innerHTML = '';
                
                // Render actual articles
                articles.forEach(item => {
                    const article = {
                        title: item.title,
                        excerpt: item.description || (item.body_markdown ? item.body_markdown.substring(0, 150) + '...' : 'Read more on Dev.to'),
                        date: item.published_at,
                        readTime: `${item.reading_time_minutes || 5} min read`,
                        url: item.url,
                        tags: item.tag_list || []
                    };
                    const articleElement = createDevToArticleElement(article);
                    devtoContainer.appendChild(articleElement);
                });
                
                const note = document.createElement('div');
                note.className = 'integration-note';
                note.innerHTML = '<p><small><em>Latest articles from Dev.to API</em></small></p>';
                devtoContainer.appendChild(note);
                return;
            }
        } catch (apiError) {
            console.warn('Dev.to API not available, using mock data');
        }
        
        // Fallback to mock data
        const mockArticles = [
            {
                title: "Kubernetes Best Practices for Data Engineers",
                excerpt: "Essential patterns and practices for running data workloads efficiently in Kubernetes clusters...",
                date: "2024-01-15",
                readTime: "7 min read",
                url: "#",
                tags: ['kubernetes', 'dataengineering', 'devops']
            },
            {
                title: "Setting up Grafana Monitoring for Production Data Pipelines",
                excerpt: "Complete guide to monitoring your data pipelines with Grafana dashboards and alerting...",
                date: "2024-01-10",
                readTime: "10 min read",
                url: "#",
                tags: ['grafana', 'monitoring', 'datapipelines']
            },
            {
                title: "Deploying LLMs with BentoML: A Practical Guide",
                excerpt: "Step-by-step tutorial on deploying Large Language Models in production using BentoML...",
                date: "2024-01-05",
                readTime: "12 min read",
                url: "#",
                tags: ['llm', 'bentoml', 'machinelearning']
            }
        ];

        // Clear loading state
        devtoContainer.innerHTML = '';

        // Render mock articles
        mockArticles.forEach(article => {
            const articleElement = createDevToArticleElement(article);
            devtoContainer.appendChild(articleElement);
        });

        // Add note about integration
        const note = document.createElement('div');
        note.className = 'integration-note';
        note.innerHTML = '<p><small><em>Note: Connect Dev.to API by updating the username in script.js</em></small></p>';
        devtoContainer.appendChild(note);

    } catch (error) {
        console.error('Error loading Dev.to articles:', error);
        devtoContainer.innerHTML = '<div class="error-message">Unable to load Dev.to articles at the moment.</div>';
    }
}

// Create Dev.to Article Element
function createDevToArticleElement(article) {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'article-item';
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const tagsHtml = article.tags && article.tags.length > 0 
        ? `<div class="article-tags">${article.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}</div>`
        : '';

    articleDiv.innerHTML = `
        <div class="article-content">
            <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
            <p class="article-excerpt">${article.excerpt}</p>
            ${tagsHtml}
        </div>
        <div class="article-meta">
            <span class="article-date">${formatDate(article.date)}</span>
            <span class="article-read-time">${article.readTime}</span>
        </div>
    `;

    return articleDiv;
}

// Parallax Effects Initialization
function initParallaxEffects() {
    // Parallax scrolling for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .about::before, .projects::before');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1); // Different speeds for different elements
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.kubernetes-badge, .profile-img');
    floatingElements.forEach(element => {
        let position = 0;
        setInterval(() => {
            position += 0.02;
            element.style.transform = `translateY(${Math.sin(position) * 5}px)`;
        }, 50);
    });

    // Smooth reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for reveal animation
    document.querySelectorAll('.section-title, .timeline-item, .project-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarBackground() {
        if (!navbar) return; // Guard clause if navbar not found
        
        const currentTheme = body.getAttribute('data-theme') || 'light';
        
        if (window.scrollY > 50) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(13, 17, 23, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation to the button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Update navbar background immediately
        updateNavbarBackground();
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0d1117' : '#326ce5');
        } else {
            // Create meta tag if it doesn't exist
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'dark' ? '#0d1117' : '#326ce5';
            document.head.appendChild(meta);
        }
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
} 