/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     summary: Get user Data
 *     description: Retrieve the profile of the currently logged-in user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User data retrieved successfully
 *       '401':
 *         description: Unauthorized request, user not logged in
 *       '500':
 *         description: Internal server error
 */

// Additional Swagger Definitions
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
