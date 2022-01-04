const router = require('express').Router();
const sequelize = require('../../config/connection')
const { Post, User, Vote, Comment } = require('../../models');
<<<<<<< HEAD:routes/api/post-routes.js
=======
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
>>>>>>> develop:controllers/api/post-routes.js

// get all users posts /api/posts
router.get('/', (req, res) => {
<<<<<<< HEAD:routes/api/post-routes.js
    console.log('=======================');
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
=======
  console.log('=====================');
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });  
>>>>>>> develop:controllers/api/post-routes.js
});

// get one users posts api/posts/id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'post_id', 'user_id', 'comment_text', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

<<<<<<< HEAD:routes/api/post-routes.js
// post/add a new user post /api/posts
router.post('/', (req,res) => {
    // expects {"title": "Taskmaster goes public!", "post_url": "https://taskmaster.com/press", "user_id": 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
=======
// create a users post
router.post('/', withAuth, (req, res) => {
    // expects {"title": "Taskmaster goes public!", "post_url": "https://taskmaster.com/press", "user_id": 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
>>>>>>> develop:controllers/api/post-routes.js
        console.log(err);
        res.status(500).json(err);
    });
});

<<<<<<< HEAD:routes/api/post-routes.js
// Put /api/posts/upvote
router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote(req.body, { Vote })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// put/update a users post /api/posts/1
router.put('/:id', (req, res) => {
=======
// PUT /api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
  // expects {  "user_id": 1, "post_id": 1 }
  // custom static method created in models/Post.js
  if(req.session){
    // pass session id along with all destructured properties on req.body
    Post.upvote({ ...req.body, user_id: req.session.user_id  }, { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
});


// update a users post 
router.put('/:id', withAuth, (req, res) => {
>>>>>>> develop:controllers/api/post-routes.js
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

<<<<<<< HEAD:routes/api/post-routes.js
// delete a users post /api/posts/1
router.delete('/:id', (req, res) => {
=======
//delete a users post
router.delete('/:id', withAuth, (req, res) => {
>>>>>>> develop:controllers/api/post-routes.js
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
