# Mergington High School Activities API

A FastAPI application that allows students to view, sign up for, and unregister from extracurricular activities.

## Features

- View all available extracurricular activities
- Sign up for activities
- Unregister from activities
- Real-time activity information with current participant lists

## Getting Started

1. Install the dependencies:

   ```
   pip install fastapi uvicorn httpx pytest
   ```

2. Run the application:

   ```
   uvicorn app:app --reload
   ```

3. Open your browser and go to:
   - Frontend: http://localhost:8000/
   - API documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

## API Endpoints

| Method | Endpoint                                                              | Description                                                         |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| GET    | `/activities`                                                         | Get all activities with their details and current participant count |
| POST   | `/activities/{activity_name}/signup?email=student@mergington.edu`     | Sign up for an activity                                             |
| POST   | `/activities/{activity_name}/unregister?email=student@mergington.edu` | Unregister from an activity                                         |

## Data Model

The application uses a simple data model with meaningful identifiers:

1. **Activities** - Uses activity name as identifier:

   - Description
   - Schedule
   - Maximum number of participants allowed
   - List of student emails who are signed up

2. **Students** - Uses email as identifier

All data is stored in memory, which means data will be reset when the server restarts.

## Project Structure

- `app.py` - Main FastAPI application with API endpoints
- `static/` - Frontend static files
  - `index.html` - Main HTML page
  - `styles.css` - CSS styles
  - `app.js` - Frontend JavaScript logic

## Testing

From the root directory, run:

```
python -m pytest tests/test_app.py -v
```

## Error Handling

The API includes proper error handling for scenarios such as:
- Activity not found
- Student already signed up
- Student not registered for the activity
- Activity at maximum capacity
