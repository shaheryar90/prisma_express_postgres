const Response = require("../utils/Response");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  /**
   * This controller is use to create avatar images
   * @param {object} req
   * @param {object} res
   */

  getUsers: async function (req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          country: true,
          phone: true,
          image: true,
        },
      });
      return res.status(200).send(Response.success(200, users));
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .send(Response.failure(500, "Internal server error"));
    } finally {
      await prisma.$disconnect();
    }
  },
};
