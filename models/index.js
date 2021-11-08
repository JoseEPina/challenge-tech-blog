const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Create Associations
User.hasMany(Post, {
   foreignKey: 'user_id',
});

Post.belongsTo(User, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

// belongsToMany method allows User and
// Post models to query each other's info
User.belongsToMany(Post, {
   through: Comment,
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

Post.belongsToMany(User, {
   through: Comment,
   foreignKey: 'post_id',
   onDelete: 'SET NULL',
});

// Create Associations for Comments
Comment.belongsTo(User, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
   foreignKey: 'post_id',
   onDelete: 'SET NULL',
});

User.hasMany(Comment, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
   foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
