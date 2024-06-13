# Refresh Token Model API

## description 
This project implements an authentication and authorization system using JWT (JSON Web Tokens), with support for Refresh Tokens. The goal is to ensure security and efficiency in the authentication process, allowing for the renewal of access tokens without repeatedly requesting user credentials.

Main Features
Authentication with JWT:

Generation of access tokens (Access Tokens) containing user authentication and authorization information, allowing access to protected resources.
Refresh Tokens:

Implementation of Refresh Tokens that allow obtaining new Access Tokens without requiring user reauthentication.
Security:

Use of best practices to ensure the integrity and confidentiality of tokens, including the use of secure signing algorithms.
Token Validation and Revocation:

Mechanisms to validate the authenticity and validity of tokens, as well as to revoke compromised or expired Refresh Tokens.
Project Components
Authentication Server:

Responsible for authenticating users and issuing tokens (Access Tokens and Refresh Tokens) after validating credentials.
Protected API:

Endpoints that require a valid Access Token for access, ensuring that only authenticated users can access protected resources.
Refresh Mechanism:

Specific endpoints for exchanging Refresh Tokens for new Access Tokens, keeping the user session active without requiring a new login.
Database:

Stores information about users and Refresh Tokens, including issuance data and validity status.
Authentication Flow
Login:

The user sends their credentials (username and password) to the authentication server.
The server validates the credentials and, if correct, issues an Access Token and a Refresh Token.
Accessing Resources:

The user uses the Access Token to access protected API resources.
The API validates the Access Token with each request.
Token Renewal:

When the Access Token expires, the user sends the Refresh Token to the authentication server.
The server validates the Refresh Token and, if valid, issues a new Access Token.
Logout and Revocation:

The user can log out, invalidating the Refresh Token, so it can no longer be used to obtain new Access Tokens.
Benefits
Security: Using JWT with Refresh Tokens enhances security by avoiding the need for long-term credential storage.
Efficiency: Allows for the renewal of access tokens without frequent reauthentication, improving user experience.
Scalability: The system is easily scalable, able to handle a large number of users and authentication requests.




## Testing
set environment variables present file .envexemplo
