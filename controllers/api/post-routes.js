const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all users
router.get('/', (req, res) => {
   console.log('======================');
   Post.findAll({
      // Query configuration
      order: [['created_at', 'DESC']],
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
         // Include Comment Model Here:
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
               model: User,
               attributes: ['username'],
            },
         },
         {
            model: User,
            attributes: ['username'],
         },
      ],
   })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET by user ID
router.get('/:id', (req, res) => {
   Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
         // Include Comment Model Here:
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
               model: User,
               attributes: ['username'],
            },
         },
         {
            model: User,
            attributes: ['username'],
         },
      ],
   })
      .then((dbPostData) => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// CREATE a POST
router.post('/', withAuth, (req, res) => {
   // expects {title: 'Taskmaster goes public!',
   // post_url: 'https://taskmaster.com/press', user_id: 1
   Post.create({
      title: req.body.post_title,
      content: req.body.content,
      user_id: req.session.user_id,
      // image_path: path,
   })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// PUT - to update the Post's title
router.put('/:id', withAuth, (req, res) => {
   Post.update({ title: req.body.title }, { where: { id: req.params.id } })
      .then((dbPostData) => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
         }
         res.json(dbPostData);
      })
      .catch((err) => {
         console.log(err);
         res.status(err).json(err);
      });
});

// DELETE - destroy a post
router.delete('/:id', withAuth, (req, res) => {
   Post.destroy({ where: { id: req.params.id } })
      .then((dbPostData) => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
         }
         res.json(dbPostData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
