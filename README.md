# Shopify Cashback Checkout UI Extension

A comprehensive cashback system for Shopify stores featuring a Django backend, Remix admin dashboard, and Shopify checkout UI extension that displays cashback offers and records redemption transactions.

## 🏗️ Project Structure

```
shopify-cashback-extension/
├── cashback_backend/          # Django REST API backend
├── remix-admin/              # Admin dashboard (Remix)
├── sample-cashback/          # Shopify app with checkout UI extension
└── README.md
```

## 🚀 Features

- **Cashback Offers Display**: Shows available cashback offers directly in Shopify checkout
- **Real-time Redemption**: Records cashback transactions in real-time
- **Admin Dashboard**: Manage cashback offers and view analytics
- **Secure API**: Django REST framework with proper authentication
- **Responsive UI**: Works seamlessly across all devices

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **PostgreSQL** (v12 or higher)
- **Shopify CLI** (latest version)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone Sidharth-Chirathazha/Cashback-promotion-app
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE db_name;
CREATE USER db_username WITH PASSWORD 'db_password';
GRANT ALL PRIVILEGES ON DATABASE db_name TO db_username;
```

### 3. Backend Setup (Django)

#### Navigate to backend directory:
```bash
cd cashback_backend
```

#### Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install dependencies:
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables:

Create a `.env` file in the `cashback_backend` directory:

```env
SECRET_KEY="your-secret-key-here"
DEBUG=True(In development)/False(In production)
DATABASE_URL=postgres://db_username:db_password@localhost:db_port/db_name
CORS_ALLOWED_ORIGINS=YOUR_FRONTEND_URL,HOSTED_URL(If any),https://your-store.myshopify.com,https://checkout.shopifycs.com,https://extensions.shopifycdn.com
ALLOWED_HOSTS=YOUR_HOSTED_DOMAIN(if any),LOCAL_HOST
```

**⚠️ Important Configuration Notes:**

- **SECRET_KEY**: Generate a new Django secret key for production
- **DATABASE_URL**: Update with your PostgreSQL credentials if different
- **CORS_ALLOWED_ORIGINS**: 
  - Replace `your-ngrok-url.ngrok-free.app` with your actual ngrok URL
  - Replace `your-store.myshopify.com` with your Shopify store URL
  - Add any additional frontend URLs that need API access
- **ALLOWED_HOSTS**: 
  - Include your production domain
  - Include your ngrok URL for development OR Hosted Domain

#### Run migrations and start server:
```bash
python manage.py migrate
python manage.py runserver
```

The Django backend will be available at `http://localhost:8000`

### 4. Admin Dashboard Setup (Remix)

#### Navigate to admin directory:
```bash
cd ../remix-admin
```

#### Install dependencies:
```bash
npm install
```

#### Configure Environment Variables:

Create a `.env` file in the `remix-admin` directory:

```env
VITE_API_URLL=BACKEND_URL
# Add other Remix-specific environment variables as needed
```

**Configuration Notes:**
- **BACKEND_URL**: Update this to your Django backend URL
- For production, use your deployed backend URL instead of localhost

#### Start the development server:
```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:5173`

### 5. Shopify App Setup

#### Navigate to Shopify app directory:
```bash
cd ../sample-cashback
```

#### Install dependencies:
```bash
npm install
```

#### Configure API Service:

Edit `sample-cashback/extensions/checkout-ui/src/apiservice.js`:

```javascript
// Update this line with your backend URL
const API_BASE_URL = BACKEND_URL_FOR_DEVELOPMENT(Use ngrok to attain a https url, shopify requires a https url); // Development
// const API_BASE_URL = 'https://your-backend-domain.com'; // Production
```

**⚠️ Important**: 
- For development: Use `http://localhost:8000` or your ngrok URL
- For production: Use your deployed backend URL
- Ensure the URL matches the one in your Django CORS_ALLOWED_ORIGINS

#### Login to Shopify and start development:
```bash
shopify app dev
```

Follow the prompts to connect your Shopify development store.

## 🔧 Development Workflow

### Running All Services

1. **Start PostgreSQL** (ensure it's running)

2. **Start Django Backend**:
   ```bash
   cd cashback_backend
   source venv/bin/activate
   python manage.py runserver
   ```

3. **Start Remix Admin** (new terminal):
   ```bash
   cd remix-admin
   npm run dev
   ```

4. **Start Shopify App** (new terminal):
   ```bash
   cd sample-cashback
   shopify app dev
   ```

### Using ngrok for External Access

If you need external access to your Django backend:

```bash
ngrok http 8000
```

Update your `.env` files with the generated ngrok URL.

## 🚀 Deployment

### Backend Deployment

1. Set `DEBUG=False` in production
2. Update `ALLOWED_HOSTS` with your production domain
3. Use a production database
4. Set a secure `SECRET_KEY`
5. Configure HTTPS

### Frontend Deployment

1. Update `API_BASE_URL` in `apiservice.js` to your production backend URL
2. Deploy using Shopify Partners Dashboard

## 🔐 Security Considerations

- Never commit `.env` files to version control
- Use strong, unique secret keys in production
- Enable HTTPS for all production services
- Regularly update dependencies
- Implement proper authentication and authorization

## 📝 Environment Variables Reference

### Django Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| SECRET_KEY | Django secret key | `"your-secret-key"` |
| DEBUG | Debug mode | `True` / `False` |
| DATABASE_URL | PostgreSQL connection | `postgres://user:pass@host:port/db` |
| CORS_ALLOWED_ORIGINS | Allowed CORS origins | Comma-separated URLs |
| ALLOWED_HOSTS | Allowed host headers | Comma-separated hosts |

### Remix Admin (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| BACKEND_URL | Django backend URL | `http://localhost:8000` |

### Shopify Extension
| File | Variable | Description |
|------|----------|-------------|
| apiservice.js | API_BASE_URL | Backend API endpoint |

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your frontend URL is in `CORS_ALLOWED_ORIGINS`
2. **Database Connection**: Verify PostgreSQL is running and credentials are correct
3. **API Not Accessible**: Check if Django server is running and ports are correct
4. **Shopify Extension Not Loading**: Verify API_BASE_URL is correctly configured

### Debug Steps

1. Check all services are running
2. Verify environment variables are correctly set
3. Check browser console for errors
4. Review Django logs for API issues

## 📚 Additional Resources

- [Shopify App Development](https://shopify.dev/apps)
- [Django Documentation](https://docs.djangoproject.com/)
- [Remix Documentation](https://remix.run/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

[sidharthchirathazha@gmail.com]

---

**Need Help?** Create an issue in the repository or contact the development team.
