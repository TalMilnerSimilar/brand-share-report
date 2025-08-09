# Brand Share Report - Dynamic Competitive Analytics Dashboard

A comprehensive React-based analytics dashboard for tracking brand performance across multiple metrics with dynamic competitive insights and market share analysis.

## 🚀 Features

### **📊 Multi-Dimensional Analytics**
- **Brand Share Overview**: Product views, units sold, and revenue analysis
- **Funnel Analysis**: Search visibility, branded search volume, and click-through metrics
- **Brand Trend Analysis**: Individual brand performance across all metrics over time

### **🎯 Strategic Narrative Engine**
- **Nike Strategic Story**: Demonstrates paid strategy compensating for organic decline
- **Competitive Dynamics**: Each brand shows unique performance patterns
- **YoY Comparisons**: All metrics display year-over-year changes
- **Market Share Constraints**: Data maintains realistic 100% total market share

### **⚡ Advanced Data Visualization**
- **Interactive Line Charts**: Hover tooltips with detailed breakdowns
- **Dynamic Overtime Views**: Month-to-month competitive volatility
- **Percentage-Based Y-Axis**: Proper market share representation
- **Brand-Specific Trends**: Each brand has unique performance patterns

### **🔧 Technical Excellence**
- **Centralized Data Management**: Single source of truth via `masterData.ts`
- **Consistent Calculations**: All components use the same data source
- **Real-time Updates**: Changes propagate across all views instantly
- **TypeScript**: Full type safety and IntelliSense support

## 📈 Key Insights Demonstrated

### **Nike's Strategic Performance (YoY)**
- 📉 **Product Views**: -8.2% (losing organic discovery)
- 📈 **Units Sold**: +12.5% (paid strategy success)
- 📈 **Revenue**: +15.8% (higher conversion value)
- 📉 **Search Visibility**: -12.6% (organic ranking decline)
- 📈 **Paid Clicks**: +28.7% (heavy investment in paid search)
- 📈 **Total Clicks**: +6.9% (net positive result)

### **Competitive Landscape**
- **Adidas**: Steady growth across most metrics (+4.3% YoY)
- **New Balance**: Explosive growth trajectory (+19.2% YoY)
- **Hoka**: Meteoric rise as emerging brand (+35.7% YoY)
- **Others**: Varied performance with realistic market dynamics

## 🛠 Technical Stack

- **Frontend**: React 18 with TypeScript
- **Charts**: Recharts for interactive visualizations
- **Styling**: Tailwind CSS for responsive design
- **Data Management**: Centralized master data architecture
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
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

# Build for production
npm run build
```

### Development

```bash
# Run in development mode
npm start

# Run tests
npm test

# Build production bundle
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── AnalysisTabs.tsx     # Tab navigation
│   ├── BrandTrendChart.tsx  # Individual brand trends
│   ├── CustomTooltip.tsx    # Chart hover tooltips
│   ├── DataTable.tsx        # Main data table with charts
│   ├── InteractiveLineChart.tsx # Multi-brand comparison
│   ├── KPICards.tsx         # Metric summary cards
│   └── ...
├── data/                 # Data management
│   ├── masterData.ts        # Centralized data source
│   ├── brandTrendData.ts    # Brand-specific trend generation
│   ├── chartData.ts         # Chart data transformations
│   └── kpiCardData.ts       # KPI card data
└── pages/
    └── BrandShareReport.tsx # Main dashboard page
```

## 🎨 Design System

### **Color Palette**
- Primary Blue: `#195afe`
- Nike: `#3E74FE` 
- Adidas: `#FF7A1A`
- New Balance: `#00CA9A`
- Hoka: `#FFB800`
- Others: Consistent brand color mapping

### **Typography**
- Font Family: DM Sans
- Weights: 300, 400, 500, 600, 700
- Responsive scaling

## 📊 Data Architecture

### **Master Data System**
All metrics flow from `masterData.ts`:
- **Single Source of Truth**: Eliminates data inconsistencies
- **Market Share Validation**: Ensures totals always equal 100%
- **Brand-Specific Narratives**: Each brand has unique performance patterns
- **Time Series Generation**: Dynamic month-to-month variations

### **Metric Coverage**
- Product Views Share
- Units Sold Share  
- Revenue Share
- Branded Search Share
- Search Visibility Share
- Paid Clicks Share
- Total Clicks Share

## 🧪 Key Features in Detail

### **Dynamic Competitive Volatility**
- Month-to-month market share changes
- Brand-specific momentum patterns
- Realistic competitive dynamics
- Seasonal variation modeling

### **Strategic Narrative Engine**
- Nike: Paid strategy compensating organic decline
- Growth brands: New Balance, Hoka meteoric rises
- Established players: Adidas steady performance
- Market dynamics: Realistic competitive pressure

### **Consistent Data Flow**
```
masterData.ts → generateTimeSeriesData() → chartData.ts → Components
                                        → funnelChartData.ts → Components
                                        → brandTrendData.ts → Components
                                        → kpiCardData.ts → Components
```

## 🎯 Use Cases

- **Executive Dashboards**: High-level market share insights
- **Marketing Strategy**: Understanding competitive dynamics  
- **Performance Analysis**: Tracking YoY brand performance
- **Competitive Intelligence**: Market share trend analysis
- **Investment Decisions**: ROI analysis of marketing spend

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Recharts
- Inspired by modern analytics dashboards
- Designed for enterprise-grade market analysis

---

**Built with ❤️ for competitive market analysis** 