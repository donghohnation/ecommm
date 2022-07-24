const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');




router.get('/:id', async (req, res) => {
	try {
		const tagD = await Tag.find(req.params.id, {
		});
		if (!tagD) {
			res.status(404).json({ message: 'err - tag not found' });
			return;
		}
		res.status(200).json(tagD);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.get('/', async (req, res) => {
	try {
		const tagD = await Tag.findAll();
		res.status(200).json(tagD);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.put('/:id', async (req, res) => {
	try {
		const tagD = await Tag.update(
			{ tag_name: req.body.tag_name },
			{ where: { id: req.params.id } }
		);
		if (!tagD) {
			res.status(404).json({ message: 'none found w/ this id' });
			return;
		}
		res.status(200).json(tagD);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.post('/', async (req, res) => {
	try {
		const tagD = await Tag.create(req.body);
		res.status(200).json(tagD);
	} catch (err) {
		res.status(400).json(err);
	}
});


router.delete('/:id', async (req, res) => {
	try {
		const tagD = await Tag.destroy({
			where: {
				id: req.params.id
			}
		});

		if (!tagD) {
			res.status(404).json({ message: 'none found w/ this id' });
			return;
		}
		res.status(200).json(tagD);
	} catch (err) {
		res.status(500).json(err);
	}
});



module.exports = router;