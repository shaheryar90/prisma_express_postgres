const Response = require("../utils/Response");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const Mailer = require("../services/Mailer");
const jwt = require("../utils/jwt");
const prisma = new PrismaClient();

module.exports = {
  /**
   * This controller is use to create avatar images
   * @param {object} req
   * @param {object} res
   */

  signup: async function (req, res) {
    const { name, email, password, country, phone, image } = req.body;
    try {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .send(Response.failure(400, "Email already exists"));
      }

      // If email doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          country,
          phone,
          image,
        },
      });

      return res
        .status(200)
        .send(Response.success(200, "Successfully registered"));
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .send(Response.failure(500, "Internal server error"));
    } finally {
      await prisma.$disconnect();
    }
  },
  uploadImage: async function (req, res) {
    try {
      req.body.imageUrl = `http://${req?.headers?.host}/${req.file.path}`;

      return res.status(201).send(Response.success(201, req.body));
    } catch (error) {
      console.log(error);
      return res.status(500).send(Response.failure(500, "Server Error"));
    }
  },
  login: async function (req, res) {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res
          .status(400)
          .send(Response.failure(400, "Invalid email or password"));
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res
          .status(400)
          .send(Response.failure(400, "Invalid email or password"));
      }

      // Generate JWT token
      const token = jwt.createToken(user);

      const updatedUser = {
        ...user,
        token,
      };
      delete updatedUser["password"];
      // Send token to the client
      return res
        .status(200)
        .header("x-auth-token", token)
        .send(Response.success(200, updatedUser, "Login successful"));
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .send(Response.failure(500, "Internal server error"));
    } finally {
      await prisma.$disconnect();
    }
  },
  forgotPassword: async function (req, res) {
    const { email } = req.body;
    try {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        return res
          .status(400)
          .send(Response.failure(400, "Email does not exist"));
      } else {
        // Generate a random verification code
        const token = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

        // Update the user record with the verification code

        const sub = "Verification code";
        const text = `This is your four-digit verification code: ${token}`;
        Mailer.sendVerificationToken(existingUser, token, text, sub);
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            verificationCode: `${token}`,
          },
        });
        return res.status(200).send(
          Response.success(200, {
            message: `We sent you a new code. Please check your inbox.`,
            code: token,
          })
        );
      }
    } catch (error) {
      return res
        .status(500)
        .send(Response.failure(500, "Internal server error"));
    } finally {
      await prisma.$disconnect();
    }
  },

  verifyToken: async function (req, res) {
    const { email, fourDigitCode } = req.body;

    try {
      // Retrieve the user based on the email
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        return res.status(400).send(Response.failure(400, "User not found"));
      }
      if (fourDigitCode !== existingUser?.verificationCode) {
        return res.status(400).send(Response.failure(400, "Invalid code"));
      }

      return res
        .status(200)
        .send(
          Response.success(
            200,
            { token: fourDigitCode },
            "Code match successfully"
          )
        );
    } catch (error) {
      return res
        .status(500)
        .send(Response.failure(500, "Internal server error"));
    }
  },
  resetPassword: async function (req, res) {
    const { verifyCode, newPassword } = req.body;
    console.log(typeof verifyCode);

    try {
      const existingUser = await prisma.user.findMany({
        where: {
          verificationCode: verifyCode,
        },
      });

      if (!existingUser.length) {
        return res.status(400).send(Response.failure(400, "Invalid code"));
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // // Update the user's password
        await prisma.user.update({
          where: {
            id: existingUser[0].id,
          },
          data: {
            password: hashedPassword,
            verificationCode: null, // Assuming you clear the reset code after successful reset
          },
        });

        return res
          .status(200)
          .send(Response.success(200, {}, "Password reset successfully"));
      }
    } catch (error) {
      return res
        .status(500)
        .send(Response.failure(500, "Internal server error"));
    }
  },
};
