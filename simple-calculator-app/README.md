# Simple Calculator App

A modern, responsive calculator web application with a clean iPhone-inspired design, featuring both local and cloud deployment capabilities.

## 🚀 Features

- **iPhone-style UI**: Glass morphism design with dark/light theme toggle
- **Real-time Calculations**: Instant computation with expression display
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **API Backend**: RESTful API for calculations
- **Comprehensive Testing**: Unit and integration tests with high coverage
- **Cloud Deployment**: Optimized for Vercel serverless deployment
- **Keyboard Support**: Full keyboard input support
- **Error Handling**: Robust error handling and validation

## 🛠️ Tech Stack

### **Primary Language**
- **JavaScript (ES6+)**: Modern JavaScript with async/await, modules, and DOM manipulation

### **Backend Framework**
- **Node.js + Express.js**: RESTful API server with middleware support
- **Serverless Functions**: Vercel-compatible serverless architecture

### **Frontend Technologies**
- **Vanilla JavaScript**: No heavy frameworks, pure JavaScript for optimal performance
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and CSS Variables
- **HTML5**: Semantic markup with accessibility considerations

### **Testing Framework**
- **Jest**: Comprehensive testing framework for unit and integration tests
- **Supertest**: HTTP endpoint testing for API validation

### **Development Tools**
- **Nodemon**: Development server with auto-restart
- **ESLint**: Code quality and consistency (implied)

## 🏗️ Architecture & Design Patterns

### **Key Standards & Patterns**

#### **1. Separation of Concerns**
- **Backend Logic**: Pure calculation functions in `functions/calculator.js`
- **API Layer**: Express routes handling HTTP requests/responses
- **Frontend Logic**: DOM manipulation and user interaction handling
- **Styling**: Component-based CSS with reusable variables

#### **2. RESTful API Design**
- **Resource-Based URLs**: `/api/calc` endpoint
- **HTTP Methods**: POST for calculations
- **JSON Request/Response**: Consistent data format
- **Error Handling**: Proper HTTP status codes and error messages

#### **3. Asynchronous Programming**
- **Async/Await**: Modern JavaScript async patterns
- **Promise-based API**: Fetch API for HTTP requests
- **Error Boundaries**: Try/catch blocks for robust error handling

#### **4. Component Architecture**
- **Modular Functions**: Single responsibility principle
- **Event-driven UI**: DOM event listeners for user interactions
- **State Management**: In-memory state for calculator operations

#### **5. CSS Architecture**
- **CSS Variables**: Dynamic theming with custom properties
- **BEM-like Naming**: Semantic class naming conventions
- **Responsive Design**: Mobile-first approach with media queries

#### **6. Testing Patterns**
- **Unit Testing**: Isolated function testing
- **Integration Testing**: API endpoint validation
- **Test-Driven Development**: Comprehensive test coverage (64 tests)
- **Mocking**: Supertest for HTTP request simulation

## 📁 Project Structure

```
simple-calculator-app/
├── functions/
│   ├── calculator.js          # Core calculation logic
│   └── calculator.test.js     # Unit tests for calculations
├── public/
│   ├── index.html            # Main HTML structure
│   ├── styles.css            # CSS styling and themes
│   └── app.js                # Frontend JavaScript logic
├── api/
│   └── calc.js               # Vercel serverless function
├── server.js                 # Express server (local development)
├── server.test.js            # Integration tests for API
├── vercel.json               # Vercel deployment configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn

### **Local Development**

1. **Clone and Install**
```bash
git clone <repository-url>
cd simple-calculator-app
npm install
```

2. **Start Development Server**
```bash
npm start
```
Server runs on `http://localhost:3000`

3. **Run Tests**
```bash
npm test
```

4. **Development Mode** (with auto-restart)
```bash
npm run dev
```

## 🌐 API Documentation

### **POST /api/calc**

Calculate mathematical operations between two numbers.

**Request Body:**
```json
{
  "op": "add|sub|mul|div",
  "a": number,
  "b": number
}
```

**Response:**
```json
{
  "result": number
}
```

**Examples:**

```bash
# Addition
curl -X POST http://localhost:3000/api/calc \
  -H "Content-Type: application/json" \
  -d '{"op": "add", "a": 5, "b": 3}'

# Response: {"result": 8}

# Division
curl -X POST http://localhost:3000/api/calc \
  -H "Content-Type: application/json" \
  -d '{"op": "div", "a": 15, "b": 3}'

# Response: {"result": 5}
```

**Error Responses:**
- `400 Bad Request`: Invalid operation or division by zero
- `405 Method Not Allowed`: Wrong HTTP method

## 🧪 Testing

### **Test Coverage**
- **64 total tests** across 2 test suites
- **Unit Tests**: Core calculation functions
- **Integration Tests**: API endpoints and error handling

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm test -- --coverage
```

### **Test Structure**
- **functions/calculator.test.js**: Tests all mathematical operations
- **server.test.js**: Tests API endpoints, validation, and error cases

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect Repository**
   - Import project on Vercel
   - Connect GitHub repository
   - Vercel auto-detects configuration

2. **Automatic Deployment**
   - Push to `main` branch triggers deployment
   - Serverless functions automatically configured
   - Global CDN for optimal performance

3. **Environment Variables** (if needed)
   - Add custom environment variables in Vercel dashboard

### **Other Platforms**

The app can be deployed to:
- **Railway**
- **Render**
- **Heroku**
- **AWS Lambda**
- **Google Cloud Functions**

## 🎨 UI/UX Features

### **Design System**
- **Glass Morphism**: Backdrop blur effects and transparency
- **Dynamic Theming**: Dark/light mode with smooth transitions
- **iPhone Calculator**: Familiar button layout and spacing
- **Responsive Grid**: CSS Grid for button layout

### **User Experience**
- **Expression Display**: Shows full calculation history
- **Keyboard Support**: Arrow keys, numbers, operators, Enter
- **Visual Feedback**: Button press animations
- **Error States**: Clear error messaging

### **Accessibility**
- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes
- **Screen Reader**: Proper ARIA labels and descriptions

## 🔒 Security & Best Practices

### **Input Validation**
- **Type Checking**: Number validation for operands
- **Operation Validation**: Whitelist of allowed operations
- **Error Sanitization**: Safe error message exposure

### **API Security**
- **CORS Configuration**: Proper cross-origin handling
- **Request Size Limits**: Express built-in protections
- **Rate Limiting**: Vercel platform-level protection

### **Code Quality**
- **ESLint Configuration**: Code consistency and error prevention
- **Modular Architecture**: Maintainable and testable code
- **Error Handling**: Comprehensive try/catch blocks

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- iPhone calculator design inspiration
- Express.js and Node.js communities
- Jest testing framework
- Vercel platform for hosting

---

**Built with ❤️ using modern web technologies**
