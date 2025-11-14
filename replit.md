# AtlasForge Interactive Portfolio Site

## Overview

AtlasForge Interactive is a static portfolio website showcasing a game development studio's creative projects. The site features a multi-page architecture with a homepage and four distinct project pages, each with its own thematic styling and tone. The project was initially generated using DesignerGPT and exported to Replit for full control and modification.

The website serves as a showcase for:
- **Octopus in Action** - A cozy, colorful action platformer with cartoon physics
- **Neighborhood Patrol** - A whimsical sandbox patrol game with dark humor
- **SKB** - A minimalist, cryptic experimental project
- **Atlas V** - An AI-powered agent and project management tool (in development)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Multi-Page Static Website**
- Technology: Pure HTML5, CSS3, and vanilla JavaScript
- No frontend framework or build system required
- Each page is a self-contained HTML file with shared CSS
- Responsive design with mobile-first approach

**Page Structure**
- `index.html` - Homepage with studio overview and project cards
- `octopus.html` - Cozy, warm-toned game page
- `neighborhood.html` - Dark, whimsical game page  
- `skb.html` - Minimal, cryptic project page
- `atlasv.html` - Tech-focused, professional project page

**Styling System**
- Single `style.css` file for all pages
- CSS custom properties (variables) for theme colors
- Page-specific class names (`.octopus-page`, `.neighborhood-page`, etc.) for scoped styling
- Fixed navigation bar with transparent/themed backgrounds per page
- Different navbar variants: `navbar-light`, `navbar-dark`, `navbar-minimal`, `navbar-tech`

**Design Principles**
- Each subpage has a distinct visual identity matching its content tone
- Shared navigation structure across all pages for consistency
- Responsive layout adapting to mobile, tablet, and desktop viewports
- Heavy use of hero sections with large imagery and clear CTAs

### Content Management

**Static Asset Structure**
- Images stored in `attached_assets/` directory
- No content management system or database
- All content hardcoded in HTML files
- Image references use relative paths

**Navigation Pattern**
- Consistent navbar across all pages
- Active state indication for current page (`.active` class)
- All pages link back to homepage via brand logo
- Four main navigation items always visible

### JavaScript Architecture

**Minimal Interactivity**
- `script.js` currently empty/unused
- Site is primarily content-driven with CSS-based interactions
- Designed for future enhancement without breaking existing functionality

**Future Enhancement Considerations**
- Placeholder for interactive elements (buttons, modals, animations)
- Clean separation allows adding JavaScript features incrementally

### Design System

**Color Palette (CSS Variables)**
- Primary brand: Teal (`--color-teal: #1a9b8e`)
- Dark mode base: Navy gradient (`--color-dark-bg: #0f2027`)
- Light accent: Cream (`--color-cream: #f4e4c1`)
- Highlight: Cyan (`--color-cyan: #00d9ff`)

**Typography**
- Primary: System font stack for performance
- Monospace: Courier for technical/cryptic content (SKB page)

**Responsive Breakpoints**
- Mobile-first approach
- Flexible grid layouts for project cards
- Fixed navigation adapts to viewport width

## External Dependencies

### Third-Party Services
None currently implemented. The site is completely self-contained.

### Future Integration Points
Based on page content, potential future integrations include:

**Gaming Platforms**
- Steam Wishlist integration (buttons present but not functional)
- Discord community links (referenced but not implemented)
- Demo hosting/download functionality

**Analytics & Tracking**
- No analytics currently implemented
- Placeholder for future user tracking

**Content Delivery**
- All assets served directly from repository
- No CDN or external hosting for images/fonts

### Asset Dependencies
- Images: Local files in `attached_assets/` directory
- Fonts: System fonts only, no web fonts loaded
- Icons: None currently used (emoji symbols on SKB page)

### Development Tools
- Generated initially via DesignerGPT (AI design tool)
- Exported to Replit for manual development
- No build process, bundler, or preprocessor required