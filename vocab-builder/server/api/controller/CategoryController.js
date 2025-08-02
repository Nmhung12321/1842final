const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Vocab = mongoose.model('Vocab');

exports.list_all_categories = async (req, res) => {
    try {
        const categories = await Category.find({});
        const result = await Promise.all(
            categories.map(async (cat) => {
                const words = await Vocab.find({ category: cat._id });
                return {
                    _id: cat._id,
                    name: cat.name,
                    words,
                }
            })
        )
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.create_a_category = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.name = req.body.name.trim().toLowerCase();
        }
        const existing = await Category.findOne({
            name: req.body.name
        });
        if (existing) {
            return res.json({
                message: 'This category already exists.',
                exists: true
            });
        }

        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        res.json(category);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.read_a_category = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.update_a_category = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.delete_a_category = async (req, res) => {
    try {
        const result = await Category.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Category not found' });
        }
        await Vocab.updateMany(
            { category: result._id },
            { $set: { category: null } }
        );
        res.json({
            message: 'Category successfully deleted',
            _id: req.params.id
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
