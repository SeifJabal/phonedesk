# PhoneDesk - OVH Deployment Guide

## Prerequisites
- Node.js 18+ installed on your OVH server
- MongoDB database (MongoDB Atlas or your own)
- PM2 for process management: `npm install -g pm2`

## 1. Prepare Backend

### Upload backend folder to OVH
```bash
# SSH into your OVH server
ssh user@your-server-ip

# Navigate to your web directory
cd /var/www/

# Clone or upload your project
git clone https://github.com/SeifJabal/phonedesk.git
cd phonedesk/backend
```

### Install dependencies
```bash
npm install
```

### Create .env file
```bash
cp .env.example .env
nano .env
```

Update with your production values:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key
ADMIN_TOKEN=change-this-secret-admin-token-123
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### Build and start backend
```bash
npm run build
pm2 start dist/server.js --name phonedesk-backend
pm2 save
pm2 startup
```

## 2. Prepare Frontend

### Upload frontend folder
```bash
cd /var/www/phonedesk/frontend
npm install
```

### Create .env.local
```bash
nano .env.local
```

Add:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Build frontend
```bash
npm run build
pm2 start npm --name phonedesk-frontend -- start
pm2 save
```

## 3. Configure Nginx (if using)

Create nginx config:
```bash
sudo nano /etc/nginx/sites-available/phonedesk
```

Add:
```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/phonedesk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 4. SSL Certificate (Optional but recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

## 5. Useful PM2 Commands

```bash
# View running apps
pm2 list

# View logs
pm2 logs phonedesk-backend
pm2 logs phonedesk-frontend

# Restart apps
pm2 restart phonedesk-backend
pm2 restart phonedesk-frontend

# Stop apps
pm2 stop phonedesk-backend
pm2 stop phonedesk-frontend

# Monitor
pm2 monit
```

## 6. Update Application

```bash
cd /var/www/phonedesk
git pull origin main

# Update backend
cd backend
npm install
npm run build
pm2 restart phonedesk-backend

# Update frontend
cd ../frontend
npm install
npm run build
pm2 restart phonedesk-frontend
```

## Database Setup

Use MongoDB Atlas (recommended):
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Add to backend .env file

## Troubleshooting

- Check logs: `pm2 logs`
- Check if ports are open: `sudo ufw status`
- Check if services are running: `pm2 list`
- Test backend: `curl http://localhost:5000/health`
- Test frontend: `curl http://localhost:3000`
