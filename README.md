# Nutrient - Headless Digital Signature Validation

A React-based application demonstrating headless PDF digital signature validation using Nutrient Web SDK (PSPDFKit) via CDN. This project loads multiple PDF documents in headless mode, validates their digital signatures using custom trusted certificates, and displays validation results in a user-friendly table format.

## Features

- **Headless PDF Processing**: Load and process PDF documents without rendering UI components
- **Batch Digital Signature Validation**: Upload and validate multiple PDF documents simultaneously
- **Custom Certificate Authority Support**: Integrate with external APIs to fetch trusted certificates for signature validation
- **Real-time Processing Feedback**: Visual indication of document processing status
- **Detailed Results Display**: View comprehensive signature information in an expandable table format
- **Built with Modern Stack**: React 19, Vite 6, and Nutrient Web SDK via CDN

## Prerequisites

- Node.js (v16 or higher)
- A valid Nutrient Web SDK license key
- Access to a certificate API endpoint (optional, for signature validation with custom CAs)

## Installation

1. Clone or navigate to the project directory:
```bash
cd nutrient-multidocs-headless-digital-signature-validation
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Nutrient license key:
```env
VITE_lkey=YOUR_LICENSE_KEY_HERE
```

## Configuration

### Certificate API Integration

The application is configured to fetch trusted certificates from an external API. Update the API endpoint in [src/components/pdf-viewer-component.jsx:38](src/components/pdf-viewer-component.jsx#L38):

```javascript
const response = await fetch(
  "http://localhost:5502/api/Certificate", // Replace with your API URL
  {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  },
);
```

The API should return a JSON response in the following format:
```json
{
  "certificates": [
    [/* byte array */],
    [/* byte array */],
    // or Base64 encoded strings
  ]
}
```

## Usage

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Using the Application

1. Click the "Open documents" button
2. Select one or multiple PDF files to validate
3. Wait for the processing to complete
4. View the signature validation results in the table
5. Click "View Details" to expand and see comprehensive signature information

## Project Structure

```
nutrient-vite-cdn-headless-digital-signature-validation/
├── src/
│   ├── components/
│   │   └── pdf-viewer-component.jsx    # Main PDF processing and signature validation component
│   ├── app.jsx                          # Main App component with file upload
│   ├── main.jsx                         # React entry point
│   └── app.css                          # Styling
├── index.html                           # HTML template with Nutrient CDN script
├── vite.config.js                       # Vite configuration
├── package.json                         # Project dependencies
└── .env                                 # Environment variables (license key)
```

## Key Implementation Details

### Headless Mode

The application uses Nutrient Web SDK in headless mode, which means:
- No visual PDF viewer is rendered
- Documents are loaded purely for data extraction
- Reduced memory footprint and faster processing
- Ideal for batch processing and automation

```javascript
const instance = await NutrientViewer.load({
  licenseKey: import.meta.env.VITE_lkey,
  document: documentUrl,
  headless: true, // No UI rendering
  trustedCAsCallback: async () => {
    // Fetch trusted certificates
  },
});
```

### Signature Validation Flow

1. User selects PDF files
2. Files are converted to blob URLs
3. Each document is loaded in headless mode
4. Trusted certificates are fetched from the API during initialization
5. Signature information is extracted using `getSignaturesInfo()`
6. Instance is disposed after processing
7. Results are displayed in a table format

### Certificate Handling

The `trustedCAsCallback` function:
- Fetches certificates from an external API
- Handles multiple certificate formats (byte arrays, Base64 strings)
- Converts certificates to ArrayBuffers required by Nutrient SDK
- Gracefully handles errors and continues without certificates if unavailable

## Technologies Used

- **React 19.1.0**: UI framework
- **Vite 6.3.5**: Build tool and development server
- **Nutrient Web SDK 1.7.0**: PDF processing and signature validation (loaded via CDN)
- **ESLint**: Code linting

## API Response Format

Your certificate API should return data in one of these formats:

### Format: [ArrayBuffer](https://www.nutrient.io/guides/web/signatures/digital-signatures/signature-lifecycle/validation/#provide-trusted-root-certificates)
```json
{
  "certificates": [
    "MIIDUjCCAjqgAwIBAgIBAD...",
    "MIIDUzCCAjugAwIBAgIBAD..."
  ]
}
```

## Troubleshooting

### NutrientViewer not loaded from CDN
- Ensure you have internet connectivity
- Check browser console for CDN loading errors
- Verify the CDN URL in [index.html:19](index.html#L19) is accessible

### Certificate API errors
- Verify the API endpoint is running and accessible
- Check network requests in browser DevTools
- Ensure the API returns data in the expected format
- The application will continue processing without trusted certificates if the API fails

### License key errors
- Verify your `.env` file contains the correct license key
- Ensure the variable name is `VITE_lkey`
- Restart the dev server after adding/modifying the `.env` file

## License
Please contact Nutrient.io Sales team for license.