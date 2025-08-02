const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

exports.list_all_words = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const words = await Vocab.find(filter).populate('category');
        res.json(words);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.create_a_word = async (req, res) => {
    try {
        ['english', 'german', 'vietnamese'].forEach(field => {
            if (req.body[field]) {
                req.body[field] = req.body[field].trim().toLowerCase();
            }
        });
        const existing = await Vocab.findOne({
            english: req.body.english,
            german: req.body.german,
            vietnamese: req.body.vietnamese
        });
        if (existing) {
            return res.json({
                message: 'This word already exists.',
                exists: true
            });
        }

        const newWord = new Vocab(req.body);
        const word = await newWord.save();
        res.json(word);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.id).populate('category');
        if (!word) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!word) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.delete_a_word = async (req, res) => {
    try {
        const result = await Vocab.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json({
            message: 'Word successfully deleted',
            _id: req.params.id
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
