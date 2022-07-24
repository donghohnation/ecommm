const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



Product.belongsTo(Category, {
	foreignKey: 'categor_id',
});


Category.hasMany(Product, {
	foreignKey: 'categor_id',
});

Product.belongsToMany(Tag, {
	through: {
		model: ProductTag,
		unique: false
	},
	as: 'productTag'
});

Tag.belongsToMany(Product, {
	through: {
		model: ProductTag,
		unique: false
	},
	as: 'productTag'
});



module.exports = {
	Product,
	Category,
	Tag,
	ProductTag,
};