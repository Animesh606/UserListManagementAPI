# User List Management and Email Sending API

## Objective

This project implements a RESTful API for managing a list of users with customizable properties and sending emails to the users.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Multer (for handling file uploads)
- Nodemailer (for sending emails)

## Features

1. **List Creation**: Admin can create a list with a title and custom properties.
2. **User Addition**: Admin can add users to the list via CSV upload.
3. **CSV Format**: The CSV file should have headers with 'name' and 'email' as required fields.
4. **Unique Emails**: No duplicate emails are allowed in a list.
5. **Error Handling**: Errors are returned in a CSV format if some users are not added.
6. **Email Sending**: Admin can send emails to all users in a list.
7. **Placeholder Replacement**: Custom properties can be used as placeholders in the email body.

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Animesh606/UserListManagementAPI.git
    ```
2. Navigate to the project directory:
    ```sh
    cd userlistmanagement
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables:
    ```plaintext
    PORT=5000
    MONGO_URI=mongodb_connection_string
    EMAIL_SERVICE=email_service
    EMAIL_USER=email_user
    EMAIL_PASSWORD=email_password
    DOMAIN_NAME=domain_name
    EMAIL_PORT=port_of_email
    ```
5. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Create a List

- **URL**: `/lists`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "title": "Sample List",
        "properties": [
            { "title": "city", "fallbackValue": "Unknown" },
            { "title": "age", "fallbackValue": "N/A" }
        ]
    }
    ```
- **Response**:
    ```json
    {
        "message": "List created successfully",
        "list": {
            "_id": "60b7c2f2e1d1c66a7c1e4b9a",
            "title": "Sample List",
            "properties": [
                { "title": "city", "fallbackValue": "Unknown" },
                { "title": "age", "fallbackValue": "N/A" }
            ]
        }
    }
    ```

### Upload Users via CSV

- **URL**: `/lists/:listId/upload`
- **Method**: `POST`
- **Headers**: `Content-Type: multipart/form-data`
- **Body**: Form-data with key `file` and value as the CSV file.
- **Sample CSV**:
    ```csv
    name,email,city
    John Doe,john.doe@example.com,Bengaluru
    Jane Doe,jane.doe@example.com,
    ```
- **Response**:
    ```json
    {
        "successCount": 1,
        "errorCount": 1,
        "errors": [
            { "email": "jane.doe@example.com", "error": "Duplicate email" }
        ]
    }
    ```

### Send Email to List

- **URL**: `/lists/:listId/send`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "emailTemplate": "<p>Hey [name]!</p><p>Thank you for signing up with your email [email]. We have received your city as [city].</p><p>Team Mathango.</p>"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Emails sent successfully"
    }
    ```

## Error Handling

- Errors are returned
