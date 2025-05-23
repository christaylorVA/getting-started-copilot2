"""
Tests for the Mergington High School API
"""
import sys
import os
import pytest
from fastapi.testclient import TestClient

# Add the src directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.app import app, activities

client = TestClient(app)

def test_root_redirect():
    """Test that root redirects to static index.html"""
    response = client.get("/", follow_redirects=False)
    assert response.status_code == 307  # 307 is a temporary redirect
    assert response.headers["location"] == "/static/index.html"

def test_get_activities():
    """Test that we can get all activities"""
    response = client.get("/activities")
    assert response.status_code == 200
    assert response.json() == activities

def test_signup_for_activity():
    """Test signing up for an activity"""
    # Save original participants
    original_participants = activities["Chess Club"]["participants"].copy()
    
    # Test valid signup
    response = client.post("/activities/Chess Club/signup?email=test@mergington.edu")
    assert response.status_code == 200
    assert "test@mergington.edu" in activities["Chess Club"]["participants"]
    assert response.json() == {"message": "Signed up test@mergington.edu for Chess Club"}
    
    # Test duplicate signup
    response = client.post("/activities/Chess Club/signup?email=test@mergington.edu")
    assert response.status_code == 400
    assert response.json() == {"detail": "Student is already signed up"}
    
    # Test invalid activity
    response = client.post("/activities/Invalid Club/signup?email=test@mergington.edu")
    assert response.status_code == 404
    assert response.json() == {"detail": "Activity not found"}
    
    # Restore original state
    activities["Chess Club"]["participants"] = original_participants

def test_unregister_from_activity():
    """Test unregistering from an activity"""
    # Add a test participant
    activities["Chess Club"]["participants"].append("testunregister@mergington.edu")
    
    # Test valid unregistration
    response = client.post("/activities/Chess Club/unregister?email=testunregister@mergington.edu")
    assert response.status_code == 200
    assert "testunregister@mergington.edu" not in activities["Chess Club"]["participants"]
    assert response.json() == {"message": "Unregistered testunregister@mergington.edu from Chess Club"}
    
    # Test unregistering someone who isn't registered
    response = client.post("/activities/Chess Club/unregister?email=testunregister@mergington.edu")
    assert response.status_code == 400
    assert response.json() == {"detail": "Student is not registered for this activity"}
    
    # Test invalid activity
    response = client.post("/activities/Invalid Club/unregister?email=testunregister@mergington.edu")
    assert response.status_code == 404
    assert response.json() == {"detail": "Activity not found"}
