const router = require('express').Router();
const { Category, Product } = require('../../models');




router.get('/:id', async (req, res) => {
	try {
		const categorData = await Category.find(req.params.id, {
		});
		if (!categorData) {
			res.status(404).json({ message: 'err - not found' });
			return;
		}
		res.status(200).json(categorData);
	} catch (err) {
		res.status(500).json(err);
	}


});


router.get('/', async (req, res) => {
	try {
		const categorData = await Category.findAll();
		res.status(200).json(categorData);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.post('/', async (req, res) => {
	try {
		const categorData = await Category.create(req.body);
		res.status(200).json(categorData);
	} catch (err) {
		res.status(400).json(err);
	}
});


router.put('/:id', async (req, res) => {
	try {
		const categorData = await Category.update(
			{ category_name: req.body.category_name },
			{ where: { id: req.params.id } }
		);
		if (!categorData) {
			res.status(404).json({ message: 'categories w/ this id not found' });
			return;
		}
		res.status(200).json(categorData);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.delete('/:id', async (req, res) => {
	try {
		const categorData = await Category.destroy({
			where: {
				id: req.params.id
			}
		});
		if (!categorData) {
			res.status(404).json({ message: 'categories w/ this id not found' });
			return;
		}
		res.status(200).json(categorData);
	} catch (err) {
		res.status(500).json(err);
	}
});




module.exports = router;