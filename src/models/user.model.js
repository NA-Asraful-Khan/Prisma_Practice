const prisma = require('../prisma/prismaClient');

class UserModel {
  static async showAllUser() {
    return await prisma.user.findMany({
      include: { posts: true }
    });
  }

  static async getSingleUser(date) {
    return await prisma.user.findUnique({ 
        where: { email: date.email } 
    });
  }

  static async signUp(data) {
    try {
        const newUser = await prisma.user.create({data});
          return newUser;
    } catch (error) {
      throw new Error(`Could not create user: ${error.message}`);
    }
  }

  static async deleteUser(userid) {
    return await prisma.user.delete({
        where:{id:userid}
    });
  }
}

module.exports = UserModel;
