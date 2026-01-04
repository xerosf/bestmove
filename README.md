# BestMove Properties

**5COSC026W Advanced Client-Side Web Development**: Final Coursework

A React-based web application for browsing, favourites, and viewing property listings. Features include dynamic filtering, drag-and-drop reordering of favourites, and responsive design for mobile.

### Responsive Design Approach

I have implemented a mobile-responsive design with the following strategy:

**Breakpoint Selection:**
- Primary breakpoint: 768px (iPad landscape width as specified in brief)
- Targets two distinct layouts: large screens (>768px) and smaller devices (≤768px)

**Technical Implementation:**
- **CSS Grid**: Used with `auto-fill` and `minmax()` for fluid property cards that automatically reflow
- **Flexbox**: Employed for search layout with `flex-wrap` to naturally adapt to screen size
- **Media Queries**: Hand-written queries at 768px change layout structure (sidebar to stack, grid columns adjust)

**Layout Changes:**
- Desktop: Side-by-side search + favourites sidebar (sticky positioning)
- Mobile: Column layout with full-width favourites list
- Gallery thumbnails: Horizontal scroll on mobile for better usability

### Deployment

The application is deployed and can be accessed at: [https://bestmove-kappa.vercel.app/](https://bestmove-kappa.vercel.app/).

### Development

```bash
npm install
```

```bash
npm run dev -- --open
```

### Testing

This project uses **Vitest** for testing.

To run the tests:
```bash
npm test
```

### Acknowledgements

I hereby declare that this coursework is my own work, and that I have acknowledged all sources used in its preparation.

**All illustrative images are generated using AI.**

### Contact

| - | - |
| --- | --- |
| Student Name | Sansith Fernando |
| UoW ID | W2120244 |
| IIT ID | 20231604 |
| IIT Email | sansith.20231604@iit.ac.lk |