const prisma = require('../prisma/prismaClient');

class UserModel {
  static async showAllUser() {
    return await prisma.user.findMany({
      include: { posts: true }
    });
  }

  static async getSingleUser(data) {
    
    let whereCondition;
    if (data.email) {
      whereCondition = { email: data.email };
    } else if (data.id) {
      whereCondition = { id: data.id };
    } else {
      throw new Error('Email or ID must be provided');
    }
    return await prisma.user.findUnique({ 
        where: whereCondition ,
        include:{posts:true}
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

  static async checkUser(data) {
    return await prisma.user.findUnique({
        where: { id: data }
    });
}
}



module.exports = UserModel;
