const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a POST model
class Post extends Model {}

// Create fields/columns for Post model
Post.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      content: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id',
         },
      },
      image_url: {
         // * img path (can be a string url, one uplodaded to Heroku)
         // * to be included in post object.
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post',
   }
);

module.exports = Post;
