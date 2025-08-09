# Brand Share Report

A React-based analytics dashboard for brand share reporting, built with TypeScript and Tailwind CSS. This project integrates components and design patterns from the "My Assets Page" repository to create a cohesive user experience.

## 🚀 Features

### **Integrated Components from My Assets Page:**
- **Navigation Sidebar** - Collapsible sidebar with pin functionality
- **Country Dropdown** - Multi-region Amazon marketplace selector
- **Progress Tracker** - Visual completion indicator
- **Design System** - Consistent colors, typography, and spacing

### **Brand Share Analytics:**
- **Brand Header** - Nike brand information with competitor comparison
- **Analysis Tabs** - Switch between different analysis views
- **KPI Cards** - Key performance indicators with trend indicators
- **Chart Section** - Interactive data visualization
- **Promotion Section** - Call-to-action for deeper analysis

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **DM Sans** font family
- **Component-based architecture**
- **Responsive design**

## 🎨 Design System

### Colors (from My Assets Page):
- Primary Blue: `#195afe`
- Dark Navy: `#092540`
- Light Gray: `#e6e9ec`
- Background Gray: `#f7f7f8`
- Text Secondary: `#6b7c8c`

### Typography:
- Font Family: DM Sans
- Consistent spacing system (xs: 4px to 3xl: 64px)
- Standardized border radius and transitions

## 📁 Project Structure

```
src/
├── components/
│   ├── NavBar.tsx          # Navigation sidebar (from My Assets Page)
│   ├── NavBar.css          # NavBar styles
│   ├── BrandHeader.tsx     # Header with country dropdown
│   ├── BrandHeader.css     # BrandHeader styles
│   ├── AnalysisTabs.tsx    # Analysis view tabs
│   ├── KPICards.tsx        # KPI metrics cards
│   ├── ChartSection.tsx    # Data visualization
│   └── PromotionSection.tsx # Call-to-action section
├── pages/
│   └── BrandShareReport.tsx # Main page component
└── App.tsx                 # Root application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd brand-share-report

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production
```bash
npm run build
```

## 🌐 Access the Application

- **Development**: http://localhost:3000
- **Production Build**: http://localhost:3001 (served with `npx serve -s build -l 3001`)

## 🔧 Component Integration Details

### **NavBar Component**
- **Source**: Adapted from My Assets Page navigation
- **Features**: 
  - Collapsible sidebar with pin functionality
  - Hover expansion for unpinned state
  - Active state management
  - Badge support (New, Beta)

### **BrandHeader Component**
- **Source**: Adapted from My Assets Page header
- **Features**:
  - Country dropdown with flag icons
  - Progress tracker with circular indicator
  - Brand information display
  - Leading products section

### **Design System Integration**
- **Colors**: Exact color values from My Assets Page
- **Typography**: DM Sans font family
- **Spacing**: Consistent spacing scale
- **Components**: Reusable patterns and interactions

## 📱 Responsive Design

The application is fully responsive and works across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Key Features

1. **Interactive Navigation** - Collapsible sidebar with smooth animations
2. **Country Selection** - Multi-region Amazon marketplace support
3. **Progress Tracking** - Visual completion indicators
4. **Brand Analytics** - Comprehensive brand performance metrics
5. **Modern UI/UX** - Clean, professional interface following design system

## 🔄 Future Enhancements

- [ ] Real data integration
- [ ] Interactive charts with charting library
- [ ] State management (Redux/Context)
- [ ] Authentication system
- [ ] API integration
- [ ] Mobile app version

## 📄 License

This project is part of the Shopper Intelligence platform by Similarweb.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS** 