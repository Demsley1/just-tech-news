const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// GET /api/comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: [
            {
                model: Post,
                attributes: ['title', 'post_url']
            },
            {
                model: User,
                attributes: ['username']
            }
    ]
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
});

// Post /api/comments
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// DELTE /api/comments/1
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if(!dbCommentData){
            res.status(400).json({ message: 'No comment found with this id' })
            return;
        }
        res.json(dbCommentData)
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

module.exports = router;