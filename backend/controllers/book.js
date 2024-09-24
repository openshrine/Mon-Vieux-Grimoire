const Book = require('../models/book');

exports.createBook = (req, res, next) => {
    const book = new Book({
        userId: req.auth.userId, // Utilise l'ID de l'utilisateur du middleware
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.genre,
        ratings: [],
        averageRating: 0,
    });

    book.save()
        .then(() => {
            res.status(201).json({ message: 'Book saved successfully!' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params._id
    }).then(
        (book) => {
            res.status(200).json(book);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyBook = (req, res, next) => {
    const book = new Book({
        userId: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        imageUrl: { type: String, required: true },
        year: { type: Number, required: true },
        genre: { typer: String, required: true },
        ratings: [
            {
                userId: { type: String, required: true },
                grade: { type: Number, required: true },
            }
        ],
        averageRating: { type: Number, required: true }
    });
    Book.updateOne({ _id: req.params.id }, book).then(
        () => {
            res.status(201).json({
                message: 'Book updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllBook = (req, res, next) => {
    Book.find().then(
        (books) => {
            res.status(200).json(books);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};