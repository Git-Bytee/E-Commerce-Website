# Setup Instructions for E-Commerce Website

## Prerequisites

1. A static file server (choose one):
   - Python 3 (built-in http.server)
   - Node.js (npx http-server or npx serve)
   - VS Code Live Server extension

## Storage Setup (No Database / No API Required)

- Data is stored in JSON files under the `storage/` folder:
  - `storage/products.json`
  - `storage/categories.json`
  - `storage/brands.json`
  - `storage/orders.json`
  
These are used only for initial seeding. Changes are saved in the browser (localStorage).
To reset, clear your browser site data.

## Configuration

1. **Update database credentials** in `config/database.php`:
   ```php
   private $host = 'localhost';
   private $db_name = 'clickcart_db';
   private $username = 'root';      // Change to your MySQL username
   private $password = '';            // Change to your MySQL password
   ```

## Running the Project

### Option 1: Python http.server (no installs beyond Python)

```bash
cd E-Commerce-Website
python -m http.server 8000
```

Open:
- Main: http://localhost:8000/index.html
- Admin: http://localhost:8000/admin%20index.html

### Option 2: Node.js static server

Use any static server (no API needed):
```bash
cd E-Commerce-Website
npx http-server -p 8000
```

Open:
- Main: http://localhost:8000/index.html
- Admin: http://localhost:8000/admin%20index.html

### Option 3: VS Code Live Server
- Open the folder in VS Code, install Live Server, then “Open with Live Server”.

## Admin Panel Features

### Access Admin Panel
Navigate to: `admin index.html` or `admin/index.html`

### Available Features:
1. **Products Management** (`admin/manage-products.html`)
   - View all products
   - Add new products
   - Edit existing products
   - Delete products

2. **Categories Management** (`admin/manage-categories.html`)
   - View all categories
   - Add new categories
   - Edit categories
   - Delete categories (only if no products use them)

3. **Brands Management** (`admin/manage-brands.html`)
   - View all brands
   - Add new brands
   - Edit brands
   - Delete brands (only if no products use them)

4. **Orders Management** (`admin/manage-orders.html`)
   - View all orders
   - View order details
   - Update order status
   - Update payment status

## API Endpoints (File-based)

All API endpoints are in the `api/` directory and read/write to JSON files:

- `api/products.php` - Product CRUD operations (storage/products.json)
- `api/categories.php` - Category CRUD operations (storage/categories.json)
- `api/brands.php` - Brand CRUD operations (storage/brands.json)
- `api/orders.php` - Order viewing and status updates (storage/orders.json)

## Troubleshooting

### Storage Issues
- Ensure the `storage/` folder is writable
- JSON files are valid (use a JSON validator if needed)

### Products Not Loading
- Check PHP error logs
- Verify database connection
- Ensure sample data is imported
- Check browser console for JavaScript errors

### CORS Issues
- If accessing from different port, update CORS headers in API files
- Or use a web server instead of file:// protocol

## Default Admin Credentials

If you've imported sample data, you can use:
- Username: `admin_user`
- Password: (check database or create new admin user)

## Notes

- Images should be placed in the `images/` directory
- Update image URLs in products to match your file structure
- The project uses Bootstrap 5 and Font Awesome for styling
- All data is stored in MySQL database

## Support

For issues or questions:
1. Check PHP error logs
2. Check browser console for JavaScript errors
3. Verify database connection
4. Ensure all API files are accessible

