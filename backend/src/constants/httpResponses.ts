// backend/src/constants/httpResponses.ts
export const HTTP_STATUS = {
    OK: 200,
    REGISTERED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
    NO_TOKEN: 'No token provided',
    INVALID_TOKEN: 'Invalid token',
    SERVER_ERROR: 'Server error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    REGISTER_SUCCESSFUL: 'User registered successfully',
    REGISTER_FAILED: 'Registration failed',
};