const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.list_all_categories = async function (req, res) {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.create_a_category = async (req, res) => {
    try {
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
            return res.status(404).send({ message: 'category not found' });
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
            return res.status(404).send({ message: 'category not found' });
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
            return res.status(404).send({ message: 'category not found' });
        }
        res.json({
            message: 'category successfully deleted',
            _id: req.params.id
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
