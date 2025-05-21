# Idea Quadrant Ranking Web Application

## Description
This web application allows users to input their ideas along with their perceived feasibility and impact scores. The application then stores these ideas for the current session, displays them in a list, and visualizes them in a 2x2 quadrant (High/Low Impact vs. High/Low Feasibility) to help prioritize them.

## Features
*   **Idea Input:** Users can submit ideas with a description, a feasibility score (1-10), and an impact score (1-10).
*   **In-Memory Storage:** Ideas are stored in memory for the duration of the user's session.
*   **List Display:** All submitted ideas are displayed in a simple list format, showing their description, feasibility, and impact.
*   **Quadrant Visualization:** Ideas are categorized and displayed in a 2x2 grid:
    *   High Impact / High Feasibility
    *   High Impact / Low Feasibility
    *   Low Impact / High Feasibility
    *   Low Impact / Low Feasibility
*   **Basic Responsive Design:** The quadrant layout adjusts for smaller screen sizes.

## Technology Stack
*   Python
*   Flask
*   HTML
*   CSS

## Setup and Running the Application

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **(Optional but Recommended) Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```

3.  **Install dependencies:**
    The application requires Flask. Install it using pip:
    ```bash
    pip install Flask
    ```

4.  **Run the application:**
    ```bash
    python app.py
    ```

5.  **Access the application:**
    Open your web browser and navigate to `http://127.0.0.1:5000/`.

## File Structure
```
/
|-- app.py             # Main Flask application logic
|-- templates/
|   |-- index.html     # Main HTML template for the user interface
|-- static/
|   |-- style.css      # CSS styles for the application
|-- venv/              # Python virtual environment (if created by user)
|-- README.md          # This file
```