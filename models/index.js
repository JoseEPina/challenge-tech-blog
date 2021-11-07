const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// Create Associations
User.hasMany(Post, {
   foreignKey: 'user_id',
});

Post.belongsTo(User, {
   foreignKey: 'user_id',
});

// belongsToMany method allows User and
// Post models to query each other's info
User.belongsToMany(Post, {
   foreignKey: 'user_id',
});

Post.belongsToMany(User, {
   foreignKey: 'post_id',
});

// Create Associations for Comments
Comment.belongsTo(User, {
   foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
   foreignKey: 'post_id',
});

User.hasMany(Comment, {
   foreignKey: 'user_id',
});

Post.hasMany(Comment, {
   foreignKey: 'post_id',
});

module.exports = { User, Post, Vote, Comment };
