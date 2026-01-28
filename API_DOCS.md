# Habit Tracker API Documentation

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [User Routes](#user-routes)
  - [Habit Routes](#habit-routes)
  - [Tag Routes](#tag-routes)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Overview

**Base URL:**

```
http://localhost:3000/api
```

**API Version:** 1.0.0

**Authentication:** JWT Bearer Token

---

## Authentication

### Authorization Header

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## API Endpoints

### Auth Routes

#### 1. Register New User

Creates a new user account and returns a JWT token.

**Endpoint:** `POST /auth/register`

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "username": "johndoe"
  },
  "token": "jwt-token-here"
}
```

**Validation Rules:**

- `email`: Must be a valid email format
- `username`: Required, minimum 3 characters
- `password`: Required, minimum 8 characters
- `firstName`: Optional
- `lastName`: Optional

---

#### 2. Login

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

---

### User Routes

All user routes require authentication.

#### 1. Get All Users

Retrieves a list of all users in the system.

**Endpoint:** `GET /users`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "users": [
    {
      "id": "uuid-here",
      "email": "user@example.com",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

#### 2. Get User by ID

Retrieves a specific user by their ID.

**Endpoint:** `GET /users/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (UUID): User ID

**Response (200 OK):**

```json
{
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

#### 3. Update User

Updates user information.

**Endpoint:** `PUT /users/:id`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**

- `id` (UUID): User ID

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "username": "janesmith"
}
```

**Response (200 OK):**

```json
{
  "message": "User updated successfully",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "username": "janesmith",
    "firstName": "Jane",
    "lastName": "Smith"
  }
}
```

---

#### 4. Delete User

Deletes a user account.

**Endpoint:** `DELETE /users/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (UUID): User ID

**Response (200 OK):**

```json
{
  "message": "User deleted successfully"
}
```

---

### Habit Routes

All habit routes require authentication.

#### 1. Get All User Habits

Retrieves all habits belonging to the authenticated user.

**Endpoint:** `GET /habits`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "habits": [
    {
      "id": "uuid-here",
      "userId": "user-uuid",
      "name": "Exercise",
      "description": "Daily workout routine",
      "frequency": "daily",
      "targetCount": 1,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

#### 2. Get Habit by ID

Retrieves a specific habit by its ID.

**Endpoint:** `GET /habits/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (UUID): Habit ID

**Response (200 OK):**

```json
{
  "habit": {
    "id": "uuid-here",
    "userId": "user-uuid",
    "name": "Exercise",
    "description": "Daily workout routine",
    "frequency": "daily",
    "targetCount": 1,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

---

#### 3. Create New Habit

Creates a new habit for the authenticated user.

**Endpoint:** `POST /habits`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Read for 30 minutes",
  "description": "Daily reading habit",
  "frequency": "daily",
  "targetCount": 1
}
```

**Validation Rules:**

- `name`: Required, string
- `description`: Optional, string
- `frequency`: Required, enum: ["daily", "weekly", "monthly"]
- `targetCount`: Required, positive integer

**Response (201 Created):**

```json
{
  "message": "Habit created successfully",
  "habit": {
    "id": "uuid-here",
    "userId": "user-uuid",
    "name": "Read for 30 minutes",
    "description": "Daily reading habit",
    "frequency": "daily",
    "targetCount": 1,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

---

#### 4. Update Habit

Updates an existing habit.

**Endpoint:** `PUT /habits/:id`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**

- `id` (UUID): Habit ID

**Request Body:**

```json
{
  "name": "Read for 45 minutes",
  "description": "Extended reading time",
  "isActive": true
}
```

**Response (200 OK):**

```json
{
  "message": "Habit updated successfully",
  "habit": {
    "id": "uuid-here",
    "name": "Read for 45 minutes",
    "description": "Extended reading time",
    "frequency": "daily",
    "targetCount": 1,
    "isActive": true,
    "updatedAt": "2024-01-02T00:00:00Z"
  }
}
```

---

#### 5. Delete Habit

Deletes a habit.

**Endpoint:** `DELETE /habits/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (UUID): Habit ID

**Response (200 OK):**

```json
{
  "message": "Habit deleted successfully"
}
```

---

#### 6. Complete Habit

Marks a habit as completed for the current day.

**Endpoint:** `POST /habits/:id/complete`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**

- `id` (UUID): Habit ID

**Request Body (Optional):**

```json
{
  "note": "Completed 30 minutes of cardio"
}
```

**Response (201 Created):**

```json
{
  "message": "Habit completed successfully",
  "entry": {
    "id": "uuid-here",
    "habitId": "habit-uuid",
    "completion_date": "2024-01-01T12:00:00Z",
    "note": "Completed 30 minutes of cardio",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

**Error Response (409 Conflict):**

```json
{
  "error": "Habit already completed today",
  "message": "You can only complete a habit once per day"
}
```

---

#### 7. Get Habits by Tag

Retrieves all habits associated with a specific tag.

**Endpoint:** `GET /habits/tag/:tagId`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `tagId` (UUID): Tag ID

**Response (200 OK):**

```json
{
  "habits": [
    {
      "id": "uuid-here",
      "userId": "user-uuid",
      "name": "Exercise",
      "description": "Daily workout routine",
      "frequency": "daily",
      "targetCount": 1,
      "isActive": true,
      "tags": [
        {
          "id": "tag-uuid",
          "name": "health",
          "color": "#4CAF50"
        }
      ]
    }
  ]
}
```

---

#### 8. Add Tags to Habit

Associates one or more tags with a habit.

**Endpoint:** `POST /habits/:id/tags`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**

- `id` (UUID): Habit ID

**Request Body:**

```json
{
  "tagIds": ["tag-uuid-1", "tag-uuid-2"]
}
```

**Response (200 OK):**

```json
{
  "message": "Tags added to habit successfully",
  "habit": {
    "id": "uuid-here",
    "name": "Exercise",
    "tags": [
      {
        "id": "tag-uuid-1",
        "name": "health",
        "color": "#4CAF50"
      },
      {
        "id": "tag-uuid-2",
        "name": "fitness",
        "color": "#2196F3"
      }
    ]
  }
}
```

---

### Tag Routes

All tag routes require authentication.

#### 1. Get All Tags

Retrieves all tags for the authenticated user.

**Endpoint:** `GET /tags`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "tags": [
    {
      "id": "uuid-here",
      "userId": "user-uuid",
      "name": "health",
      "color": "#4CAF50",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "uuid-here-2",
      "userId": "user-uuid",
      "name": "productivity",
      "color": "#FF9800",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

#### 2. Create Tag

Creates a new tag for organizing habits.

**Endpoint:** `POST /tags`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "health",
  "color": "#4CAF50"
}
```

**Validation Rules:**

- `name`: Required, string, unique per user
- `color`: Required, hex color code (e.g., #FF5733)

**Response (201 Created):**

```json
{
  "message": "Tag created successfully",
  "tag": {
    "id": "uuid-here",
    "userId": "user-uuid",
    "name": "health",
    "color": "#4CAF50",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

#### 3. Update Tag

Updates an existing tag.

**Endpoint:** `PUT /tags/:tagId`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**

- `tagId` (UUID): Tag ID

**Request Body:**

```json
{
  "name": "wellness",
  "color": "#8BC34A"
}
```

**Response (200 OK):**

```json
{
  "message": "Tag updated successfully",
  "tag": {
    "id": "uuid-here",
    "userId": "user-uuid",
    "name": "wellness",
    "color": "#8BC34A",
    "updatedAt": "2024-01-02T00:00:00Z"
  }
}
```

---

#### 4. Delete Tag

Deletes a tag. This will also remove the tag association from all habits.

**Endpoint:** `DELETE /tags/:tagId`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `tagId` (UUID): Tag ID

**Response (200 OK):**

```json
{
  "message": "Tag deleted successfully"
}
```

---

## Error Handling

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "error": "Authentication required",
  "message": "Please provide a valid token"
}
```

### 404 Not Found

```json
{
  "error": "Habit not found"
}
```

### 409 Conflict

```json
{
  "error": "Email already registered"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

## Testing with cURL

### Register a new user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Create a habit (replace TOKEN with actual token)

```bash
curl -X POST http://localhost:3000/api/habits \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Drink Water",
    "description": "Stay hydrated",
    "frequency": "daily",
    "targetCount": 8
  }'
```

### Complete a habit

```bash
curl -X POST http://localhost:3000/api/habits/HABIT_ID/complete \
  -H "Authorization: Bearer TOKEN"
```

### Get habit statistics

```bash
curl -X GET http://localhost:3000/api/habits/HABIT_ID/stats \
  -H "Authorization: Bearer TOKEN"
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- Authentication endpoints: 5 requests per minute
- Other endpoints: 100 requests per minute per user

---

## Error Handling

The API uses standard HTTP status codes and returns consistent error responses.

### Common HTTP Status Codes

| Status Code | Meaning                                          |
| ----------- | ------------------------------------------------ |
| 200         | OK - Request successful                          |
| 201         | Created - Resource created successfully          |
| 400         | Bad Request - Invalid request data               |
| 401         | Unauthorized - Missing or invalid authentication |
| 403         | Forbidden - Authenticated but not authorized     |
| 404         | Not Found - Resource doesn't exist               |
| 409         | Conflict - Resource conflict (e.g., duplicate)   |
| 422         | Unprocessable Entity - Validation error          |
| 429         | Too Many Requests - Rate limit exceeded          |
| 500         | Internal Server Error - Server error             |

### Error Response Format

#### 400 Bad Request

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

#### 401 Unauthorized

```json
{
  "error": "Authentication required",
  "message": "Please provide a valid token"
}
```

#### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

#### 404 Not Found

```json
{
  "error": "Habit not found",
  "message": "The requested habit does not exist"
}
```

#### 409 Conflict

```json
{
  "error": "Email already registered",
  "message": "An account with this email already exists"
}
```

#### 429 Too Many Requests

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests, please try again later"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "message": "Something went wrong on our end"
}
```

---

## Examples

### cURL Examples

#### 1. Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

#### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

#### 3. Get All Habits

```bash
curl -X GET http://localhost:3000/api/habits \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 4. Create a Habit

```bash
curl -X POST http://localhost:3000/api/habits \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Drink Water",
    "description": "Stay hydrated throughout the day",
    "frequency": "daily",
    "targetCount": 8
  }'
```

#### 5. Update a Habit

```bash
curl -X PUT http://localhost:3000/api/habits/HABIT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Drink More Water",
    "targetCount": 10
  }'
```

#### 6. Complete a Habit

```bash
curl -X POST http://localhost:3000/api/habits/HABIT_ID/complete \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "note": "Completed at the gym"
  }'
```

#### 7. Delete a Habit

```bash
curl -X DELETE http://localhost:3000/api/habits/HABIT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 8. Create a Tag

```bash
curl -X POST http://localhost:3000/api/tags \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "health",
    "color": "#4CAF50"
  }'
```

#### 9. Add Tags to Habit

```bash
curl -X POST http://localhost:3000/api/habits/HABIT_ID/tags \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "tagIds": ["TAG_ID_1", "TAG_ID_2"]
  }'
```

#### 10. Get Habits by Tag

```bash
curl -X GET http://localhost:3000/api/habits/tag/TAG_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### JavaScript/TypeScript SDK Example

```typescript
class HabitTrackerAPI {
  private baseURL: string = 'http://localhost:3000/api'
  private token: string | null = null

  // Helper method for making requests
  private async request(
    endpoint: string,
    method: string = 'GET',
    body?: any,
  ): Promise<any> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      method,
      headers,
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }

    return data
  }

  // Auth methods
  async register(userData: {
    email: string
    username: string
    password: string
    firstName?: string
    lastName?: string
  }) {
    const data = await this.request('/auth/register', 'POST', userData)
    this.token = data.token
    return data
  }

  async login(email: string, password: string) {
    const data = await this.request('/auth/login', 'POST', { email, password })
    this.token = data.token
    return data
  }

  // User methods
  async getUsers() {
    return this.request('/users')
  }

  async getUserById(userId: string) {
    return this.request(`/users/${userId}`)
  }

  async updateUser(userId: string, updates: any) {
    return this.request(`/users/${userId}`, 'PUT', updates)
  }

  async deleteUser(userId: string) {
    return this.request(`/users/${userId}`, 'DELETE')
  }

  // Habit methods
  async getHabits() {
    return this.request('/habits')
  }

  async getHabitById(habitId: string) {
    return this.request(`/habits/${habitId}`)
  }

  async createHabit(habitData: {
    name: string
    description?: string
    frequency: 'daily' | 'weekly' | 'monthly'
    targetCount: number
  }) {
    return this.request('/habits', 'POST', habitData)
  }

  async updateHabit(habitId: string, updates: any) {
    return this.request(`/habits/${habitId}`, 'PUT', updates)
  }

  async deleteHabit(habitId: string) {
    return this.request(`/habits/${habitId}`, 'DELETE')
  }

  async completeHabit(habitId: string, note?: string) {
    return this.request(`/habits/${habitId}/complete`, 'POST', { note })
  }

  async getHabitsByTag(tagId: string) {
    return this.request(`/habits/tag/${tagId}`)
  }

  async addTagsToHabit(habitId: string, tagIds: string[]) {
    return this.request(`/habits/${habitId}/tags`, 'POST', { tagIds })
  }

  // Tag methods
  async getTags() {
    return this.request('/tags')
  }

  async createTag(tagData: { name: string; color: string }) {
    return this.request('/tags', 'POST', tagData)
  }

  async updateTag(tagId: string, updates: any) {
    return this.request(`/tags/${tagId}`, 'PUT', updates)
  }

  async deleteTag(tagId: string) {
    return this.request(`/tags/${tagId}`, 'DELETE')
  }
}

// Usage Example
async function main() {
  const api = new HabitTrackerAPI()

  try {
    // Register or login
    await api.login('user@example.com', 'password123')

    // Create a tag
    const healthTag = await api.createTag({
      name: 'health',
      color: '#4CAF50',
    })

    // Create a habit
    const habit = await api.createHabit({
      name: 'Morning Exercise',
      description: '30 minutes of cardio',
      frequency: 'daily',
      targetCount: 1,
    })

    // Add tag to habit
    await api.addTagsToHabit(habit.habit.id, [healthTag.tag.id])

    // Complete the habit
    await api.completeHabit(habit.habit.id, 'Ran 5km today!')

    // Get all habits
    const habits = await api.getHabits()
    console.log('My habits:', habits)

    // Get habits by tag
    const healthHabits = await api.getHabitsByTag(healthTag.tag.id)
    console.log('Health habits:', healthHabits)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

```python
import requests
from typing import Optional, Dict, Any, List

class HabitTrackerAPI:
    def __init__(self, base_url: str = "http://localhost:3000/api"):
        self.base_url = base_url
        self.token: Optional[str] = None

    def _request(
        self,
        endpoint: str,
        method: str = "GET",
        data: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Helper method for making requests"""
        headers = {"Content-Type": "application/json"}

        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"

        url = f"{self.base_url}{endpoint}"

        response = requests.request(
            method=method,
            url=url,
            json=data,
            headers=headers
        )

        response.raise_for_status()
        return response.json()

    # Auth methods
    def register(self, email: str, username: str, password: str,
                 first_name: Optional[str] = None,
                 last_name: Optional[str] = None) -> Dict[str, Any]:
        data = {
            "email": email,
            "username": username,
            "password": password
        }
        if first_name:
            data["firstName"] = first_name
        if last_name:
            data["lastName"] = last_name

        result = self._request("/auth/register", "POST", data)
        self.token = result["token"]
        return result

    def login(self, email: str, password: str) -> Dict[str, Any]:
        result = self._request("/auth/login", "POST", {
            "email": email,
            "password": password
        })
        self.token = result["token"]
        return result

    # Habit methods
    def get_habits(self) -> Dict[str, Any]:
        return self._request("/habits")

    def get_habit(self, habit_id: str) -> Dict[str, Any]:
        return self._request(f"/habits/{habit_id}")

    def create_habit(self, name: str, frequency: str, target_count: int,
                     description: Optional[str] = None) -> Dict[str, Any]:
        data = {
            "name": name,
            "frequency": frequency,
            "targetCount": target_count
        }
        if description:
            data["description"] = description
        return self._request("/habits", "POST", data)

    def update_habit(self, habit_id: str, **updates) -> Dict[str, Any]:
        return self._request(f"/habits/{habit_id}", "PUT", updates)

    def delete_habit(self, habit_id: str) -> Dict[str, Any]:
        return self._request(f"/habits/{habit_id}", "DELETE")

    def complete_habit(self, habit_id: str, note: Optional[str] = None) -> Dict[str, Any]:
        data = {"note": note} if note else {}
        return self._request(f"/habits/{habit_id}/complete", "POST", data)

    # Tag methods
    def get_tags(self) -> Dict[str, Any]:
        return self._request("/tags")

    def create_tag(self, name: str, color: str) -> Dict[str, Any]:
        return self._request("/tags", "POST", {"name": name, "color": color})

    def add_tags_to_habit(self, habit_id: str, tag_ids: List[str]) -> Dict[str, Any]:
        return self._request(f"/habits/{habit_id}/tags", "POST", {"tagIds": tag_ids})

    def get_habits_by_tag(self, tag_id: str) -> Dict[str, Any]:
        return self._request(f"/habits/tag/{tag_id}")


# Usage Example
if __name__ == "__main__":
    api = HabitTrackerAPI()

    # Login
    api.login("user@example.com", "password123")

    # Create a tag
    health_tag = api.create_tag("health", "#4CAF50")

    # Create a habit
    habit = api.create_habit(
        name="Morning Exercise",
        description="30 minutes of cardio",
        frequency="daily",
        target_count=1
    )

    # Add tag to habit
    api.add_tags_to_habit(habit["habit"]["id"], [health_tag["tag"]["id"]])

    # Complete the habit
    api.complete_habit(habit["habit"]["id"], "Ran 5km today!")

    # Get all habits
    habits = api.get_habits()
    print("My habits:", habits)
```

## Additional Information

### Rate Limiting

The API implements rate limiting to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **Other endpoints**: 100 requests per minute per authenticated user

When rate limit is exceeded, the API returns a `429 Too Many Requests` status with:

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests, please try again later",
  "retryAfter": 60
}
```

### Data Validation

All request bodies are validated using Zod schemas. Common validation rules:

- **Email**: Must be valid email format
- **UUID**: Must be valid UUID v4 format
- **Password**: Minimum 8 characters
- **Hex Color**: Must be valid hex color code (e.g., #FF5733)
- **Frequency**: Must be one of: "daily", "weekly", "monthly"

### Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Authentication**: Secure token-based authentication
3. **Rate Limiting**: Protection against brute force attacks
4. **Input Validation**: All inputs are validated and sanitized
5. **CORS**: Configurable Cross-Origin Resource Sharing
6. **SQL Injection Protection**: Using parameterized queries with Drizzle ORM

### Database Schema

The API uses PostgreSQL with the following main tables:

- **users**: User accounts
- **habits**: User habits
- **habit_completions**: Habit completion records
- **tags**: Organization tags
- **habit_tags**: Many-to-many relationship between habits and tags

### Docker Deployment

The application can be deployed using Docker Compose:

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

---

## Support & Contributing

For issues, questions, or contributions, please refer to the repository documentation.

**Version:** 1.0.0  
**Last Updated:** January 2026
