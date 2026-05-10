# Student Task Manager

## Features
- User Registration
- User Login
- JWT Authentication
- Add Task
- Update Task
- Delete Task
- User-specific Tasks
- Logout

---

## API Endpoints

### Auth APIs

POST /auth/register
POST /auth/login

### Task APIs

GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id

---

## User Schema

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

---

## Task Schema

```js
{
  title: String,
  description: String,
  status: String,
  userId: ObjectId,
  createdAt: Date
}
```

---

## Architecture

Frontend (React)
↓
Backend (Node + Express)
↓
MongoDB Database

---

## Future Improvements

- Task deadlines
- Task priority
- Search functionality
- Notifications
- Dark mode