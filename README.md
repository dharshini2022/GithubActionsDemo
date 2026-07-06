# Weather Forecast Dashboard (Angular App)

This project has been restructured as an Angular standalone application that connects to the Azure App Service Weatherforecast API and presents live telemetry metrics and dynamic table visualization with a clean light theme.

## Project Structure

```
weather-app/
├── src/                  # Application source code
│   ├── app/              # Standard standalone AppComponent
│   ├── index.html        # Main HTML layout
│   ├── main.ts           # Boostrapper
│   └── styles.css        # Premium Light-themed CSS style sheets
├── public/               # Public assets / images
├── environments/         # Configuration environment variables
│   ├── environment.ts    # Development endpoint
│   └── environment.prod.ts # Production deployment endpoint
├── .github/              # Automation workflow files
│   └── workflows/
│       └── deploy.yml    # CI/CD deployment configuration
├── angular.json          # Angular CLI workspace parameters
├── package.json          # Module dependencies
└── README.md             # Project handbook
```

## Running the App Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

3. Open `http://localhost:4200` to view the running dashboard.

## Production Build

To build the static bundle for Azure deployment:
```bash
npm run build
```
The optimized HTML/JS/CSS assets will compile to the `dist/weather-app/browser/` directory, ready to be served.
