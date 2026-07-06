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

## Running the App Locally (smoke test)

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

## WorkFlow
```text
                           Developer
                               │
                     Develop Angular Application
                               │
                               ▼
                     Commit Local Changes
                               │
                     git add . && git commit
                               │
                               ▼
                      git push origin main
                               │
                               ▼
                    GitHub Repository (main)
                               │
             Push event triggers GitHub Actions
                               │
                               ▼
                  GitHub Actions CI/CD Pipeline
                               │
     ┌─────────────────────────────────────────────────┐
     │                 Build Stage                     │
     ├─────────────────────────────────────────────────┤
     │ ✓ Checkout Repository                           │
     │ ✓ Setup Node.js Runtime                         │
     │ ✓ Restore npm Cache                             │
     │ ✓ Install Dependencies (npm ci)                 │
     │ ✓ Run Lint Checks                               │
     │ ✓ Run Unit Tests (optional)                     │
     │ ✓ Build Angular (Production)                    │
     │ ✓ Generate Static Assets (dist/)                │
     │ ✓ Upload Build Artifact                         │
     └─────────────────────────────────────────────────┘
                               │
                               ▼
                  GitHub Pages Deployment Stage
                               │
                     Deploy Uploaded Artifact
                               │
                               ▼
                 GitHub Pages Static Website
      https://<github-username>.github.io/<repository-name>/
                               │
                               ▼
                     User Opens Website
                               │
                               ▼
                   Angular Application Loads
                               │
                               ▼
               HTTP GET /WeatherForecast (HTTPS)
                               │
                               ▼
        Azure App Service (.NET Web API Backend)
https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net
                               │
                               ▼
                     Returns JSON Response
                               │
                               ▼
                Angular Parses Response
                               │
                               ▼
               Weather Data Rendered in UI
```
# CI
**Goal**: Ensure that every code change is valid and can be built successfully.
- works like factory to manufacture products

## Responsibilities of CI
- Retrieve the latest source code.
- Install project dependencies.
- Validate code quality (linting).
- Execute automated tests.
- Compile the Angular application.
- Produce deployable static files (dist/).

## Output of CI
```
dist/
├── index.html
├── main.js
├── styles.css
└── assets/
```
- This output is called the build artifact.

- **If any step fails (for example, a syntax error or a failing test), the pipeline stops here and nothing is deployed.**

---

# CD
**Goal:** Take the successfully built artifact and publish it to the hosting platform automatically, i.e, make the build available to users
- works like shipping

## Workflow
```
Build Artifact
      │
      ▼
Upload Artifact
      │
      ▼
Deploy to GitHub Pages
      │
      ▼
Website Published
```

## Responsibilities of CD
- Receive the build artifact.
- Publish it to GitHub Pages.
- Make the latest version accessible over HTTPS.

## Once deployed, users can access:
```
https://<github-account-name>.github.io/<github-repo-name>/
```

## After CD
Github Actions is no longer invovled
```
User
   │
Opens Website
   │
   ▼
GitHub Pages
   │
Loads Angular
   │
   ▼
Angular
   │
HTTP GET
   ▼
Azure App Service
   │
Returns JSON
   ▼
Angular UI
```
