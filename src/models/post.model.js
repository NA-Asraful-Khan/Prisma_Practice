const prisma = require('../prisma/prismaClient');

class PostModel {
    static async createPost(postData) {
        try {
            const newPost = await prisma.post.create({
                data: {
                  title: postData.title,
                  content: postData.content,
                  imageUrl: postData.imageUrl,
                  authorId: postData.authorId,
                },
              });
            return newPost;
        } catch (error) {
            throw new Error(`Could not create Post: ${error.message}`);
        }finally {
            await prisma.$disconnect();
          }
    }

    static async showAllPost() {
        return await prisma.post.findMany({
            include: { 
                author: {
                    select: {
                    email: true,
                    name: true
                    }
              } }
          });
    }

    static async getSingleUser(date) {
        return await prisma.user.findUnique({
            where: { email: date.email }
        });
    }



    static async deleteUser(userid) {
        return await prisma.user.delete({
            where: { id: userid }
        });
    }
}

module.exports = PostModel;