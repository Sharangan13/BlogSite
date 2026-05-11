# Blog App — Backend

## Setup
```bash
npm install
```

## Configure
Edit `config/config.env`:
- Set `DB_LOCAL_URI` to your MongoDB URI
- Set `JWT_SECRET` to a strong secret
- Set SMTP credentials for email (e.g. Mailtrap for dev)

## Run
```bash
# Development (with nodemon)
npm run dev

# Production
npm start

# Seed sample data
npm run seed
```

## API Endpoints

### Auth (`/api/sh/`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /register | No | Register user |
| POST | /login | No | Login |
| GET | /logout | No | Logout |
| GET | /myprofile | Yes | Get own profile |
| PUT | /update | Yes | Update profile |
| PUT | /password/change | Yes | Change password |
| POST | /password/forgot | No | Send reset email |
| POST | /password/reset/:token | No | Reset password |

### Blogs (`/api/sh/`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /blog | No | Get all blogs |
| GET | /blog/:id | No | Get single blog |
| POST | /blog/new | Yes | Create blog |
| PUT | /blog/update/:id | Yes | Update blog |
| GET | /myblogs | Yes | Get own blogs |
| DELETE | /myblog/:id | Yes | Delete own blog |

### Admin (`/api/sh/admin/`)
| Method | Path | Description |
|--------|------|-------------|
| GET | /blogs | All blogs |
| DELETE | /blog/:id | Delete any blog |
| GET | /users | All users |
| GET | /user/:id | Single user |
| PUT | /user/:id | Update user |
| DELETE | /user/:id | Delete user |
