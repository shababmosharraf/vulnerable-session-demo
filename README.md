# Vulnerable Session Demo - Railway Deployment

This is a demonstration application showing session hijacking vulnerabilities.

⚠️ **WARNING: This is for educational purposes only. This application contains intentional security vulnerabilities.**

## Features Demonstrated

- Session management vulnerabilities
- Insecure cookie configuration
- Session hijacking attack vectors

## Test Users

- Username: `user1`, Password: `pass1`
- Username: `user2`, Password: `pass2`

## Deployment

This app is configured for Railway deployment with:
- Dynamic port configuration
- Static file serving
- Production-ready package.json

## Security Vulnerabilities (Intentional)

1. Weak session secret
2. Insecure cookie settings
3. No CSRF protection
4. No XSS protection
5. HTTP-only sessions (secure: false)

## Usage

1. Login with test credentials
2. Access dashboard with sensitive data
3. Demonstrate session hijacking by capturing session cookies
4. Use captured sessions to impersonate users
