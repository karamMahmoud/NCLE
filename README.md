# 📦 Surprise Box – Ionic App

Welcome to **Surprise Box**, a modern, mobile-friendly application built with **Ionic Framework** and **Angular**. This project features a clean UI, shared components, and a subscription-based flow that encourages learning through interactive content.

---

## 🚀 Features

- ✅ **Modular Project Structure** using Angular & Ionic best practices
- ✅ **Shared Header Component** for consistent navigation
- ✅ **Home Page** with dynamic sections (steps, call-to-action, pricing, etc.)
- ✅ **Subscription Component** to handle onboarding/subscription logic
- ✅ **Global Styling** using CSS variables and responsive units
- ✅ **Unit Testing** with full test coverage for UI components

---

## 📂 Project Structure

src/ ├── app/ │ ├── home/ # Home page logic and layout │ ├── subscription/ # Subscription component │ ├── shared/ │ │ └── header/ # Reusable HeaderComponent ├── theme/ │ └── variables.scss # CSS variables and theming ├── assets/ # Static assets

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/karamMahmoud/surprise-box.git
cd surprise-box
2. Install Dependencies
Make sure you have npm and Ionic CLI installed:


npm install -g @ionic/cli
npm install
3. Run the App

ionic serve
The app will open at http://localhost:8100.

🧪 Running Unit Tests
Unit tests are written using Jasmine + Karma.


ng test
You can find the specs under each component directory (e.g., home.page.spec.ts).

🎨 Styling & Theming
Global CSS variables are defined in src/theme/variables.scss. These include:

Colors

Spacing units

Typography styles

This ensures consistent design and easy theming across the app.

📦 Production Build
To build the app for production:


ionic build --prod
Output will be generated in the www/ directory, ready for deployment.

👤 Author
@karam-mahmoud