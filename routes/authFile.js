// authController.js
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided information.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               country:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: Email already exists or invalid request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/uploadImage:
 *   post:
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Image uploaded successfully
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Forgot password
 *     description: Sends a verification code to reset the password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Verification code sent successfully
 *       '400':
 *         description: Email does not exist
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/verifyToken:
 *   post:
 *     summary: Verify reset token
 *     description: Verifies the reset token sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               fourDigitCode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Code match successfully
 *       '400':
 *         description: User not found or invalid code
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Reset password
 *     description: Resets user password with a verification code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verifyCode:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '400':
 *         description: Invalid code
 *       '500':
 *         description: Internal server error
 */
