# NexaFit - Modern Fitness Web App

NexaFit is a frontend-only fitness web application built with Tailwind CSS, HTML, and Vanilla JavaScript. It features a modern, beautiful, responsive, and animated UI with a modular project structure.

## Features

- **Aura Visualizations**: Animated glowing auras around avatars and progress bars
- **Motivational Quote Generator**: Rotating quotes with a "Motivate Me" button
- **Live Footstep Trail**: Animated footprints on the dashboard as step count increases
- **Mood Tracker**: Track daily mood with emojis and visualize in a graph
- **Gamified Flame Streaks**: Flame animation that grows with user's streak
- **Animated Section Transitions**: Smooth animations between sections
- **Today's Flow Timeline**: Visual timeline of daily activities
- **Friends Stats** section to compare progress with others


## Technologies Used

- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework for styling
- **JavaScript**: Vanilla JS for interactivity and animations
- **Chart.js**: For data visualization
- **Feather Icons**: Lightweight icon set
- **Web Storage API**: For data persistence using localStorage

## Features Implementation

### Mood Tracking

Users can select their daily mood using emoji buttons. Mood data is stored in localStorage and visualized in a line chart on the profile page.

### Animated Elements

The app includes various animations:
- Scroll reveal animations using Intersection Observer
- Hover effects on cards and buttons
- Footstep trail animation on the dashboard
- Flame animation for streaks
- Success particles when completing actions

### Data Persistence

User data is stored in localStorage, including:
- Daily mood selections
- User bio and profile information
- Avatar image (as base64)

## Customization

The app uses CSS variables for easy customization of colors and animations. These can be found in the `styles/global.css` file.

## Browser Compatibility

NexaFit is designed to work in all modern browsers that support ES6+ JavaScript features and modern CSS properties.

## License

This project is available for personal and commercial use.
