# Mergington High School Activities Portal

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

A web application for Mergington High School students to view, sign up for, and unregister from extracurricular activities.

## Features

- **View Activities**: Browse all available extracurricular activities at Mergington High School
- **Activity Details**: See detailed information about each activity including schedule, description, and current participants
- **Sign Up**: Students can register for activities using their school email
- **Unregister**: Students can unregister from activities they no longer wish to attend
- **Responsive Design**: Optimized for both desktop and mobile devices

## Technical Overview

This application is built using:

- **Backend**: Python with FastAPI framework
- **Frontend**: HTML, CSS, and vanilla JavaScript
- **Testing**: Pytest for backend testing

## Project Structure

```
├── src/                   # Source code
│   ├── app.py             # FastAPI application with API endpoints
│   ├── static/            # Static files
│   │   ├── index.html     # Main HTML page
│   │   ├── styles.css     # CSS styles
│   │   └── app.js         # Frontend JavaScript
├── tests/                 # Test files
│   ├── test_app.py        # Backend API tests
│   └── test_frontend.js   # Frontend tests
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
└── LICENSE                # License information
```

## Setup and Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mergington-high-activities.git
   cd mergington-high-activities
   ```

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   cd src
   python -m uvicorn app:app --reload
   ```

4. Open a web browser and navigate to `http://localhost:8000` to access the application.

## API Endpoints

- `GET /activities` - Get a list of all activities
- `POST /activities/{activity_name}/signup?email={email}` - Sign up a student for an activity
- `POST /activities/{activity_name}/unregister?email={email}` - Unregister a student from an activity

## Testing

Run backend tests with pytest:

```bash
python -m pytest tests/test_app.py -v
```

## License

&copy; 2025 GitHub &bull; [MIT License](https://gh.io/mit)

