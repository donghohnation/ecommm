const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');




router.get('/:id', async (req, res) => {
	try {
		const productData = await Product.find(req.params.id, {
		});
		if (!productData) {
			res.status(404).json({ message: 'err - not found' });
			return;
		}
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.get('/', async (req, res) => {
	try {
		const productData = await Product.findAll();
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});


router.put('/:id', (req, res) => {
	Product.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((product) => {
			return ProductTag.findAll({ where: { product_id: req.params.id } });
			console.log("product: " + product);
		})
		.then((prodTags) => {
			const prodTagIds = prodTags.map(({ tag_id }) => tag_id);
			const newProdTags = req.body.category_id
				.filter((tag_id) => !prodTagIds.includes(tag_id))
				.map((tag_id) => {
					return {
						tag_id,
						product_id: req.params.id,
					};
				});
			console.log("product tags = " + prodTags);

			const prodTagsToRemove = prodTags
				.filter(({ tag_id }) => !req.body.category_id.includes(tag_id))
				.map(({ id }) => id);

			return Promise.all([
				ProductTag.destroy({ where: { id: prodTagsToRemove } }),
				ProductTag.bulkCreate(newProdTags),
			]);
		})
		.then((updatedProdTags) => {
			res.status(200).json(updatedProdTags)
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});


router.post('/', (req, res) => {
	Product.create(req.body)
		.then((product) => {
			if (req.body.category_id.length) {
				const prodTagIdArray = req.body.category_id.map((tag_id) => {
					return {
						tag_id,
						product_id: product.id,
					};
				});
				return ProductTag.bulkCreate(prodTagIdArray);
			}
			res.status(200).json(product);
		})
		.then((prodTagIds) => res.status(200).json(prodTagIds))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});


router.delete('/:id', async (req, res) => {
	try {
		const productData = await Product.destroy({
			where: {
				id: req.params.id
			}
		});

		if (!productData) {
			res.status(404).json({ message: 'product w/ this id not found' });
			return;
		}
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});




module.exports = router;