import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const { keyword, category, brand, inStock, maxPrice, sort, size, material, productType, tags } = req.query;

        const query = {};

        if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (category) query.category = { $regex: `^${category}$`, $options: 'i' };
        if (brand) query.brand = { $regex: `^${brand}$`, $options: 'i' };
        if (inStock === 'true') query.inStock = true;
        if (inStock === 'false') query.inStock = false;
        if (maxPrice) query.price = { $lte: Number(maxPrice) };
        if (size) query.sizes = { $in: size.split(',') };
        if (material) query.material = { $regex: `^${material}$`, $options: 'i' };
        if (productType) query.productType = { $regex: `^${productType}$`, $options: 'i' };
        if (tags) query.tags = { $in: tags.split(',').map(t => t.trim()) };

        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'name_asc') sortOption = { name: 1 };

        const products = await Product.find(query).sort(sortOption);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, images, brand, category, colors, inStock, isFeatured, isNewArrival, isBestSeller, countdown, sizes, material, productType, tags } = req.body;

        const product = new Product({
            name, price, description, images, brand, category, colors,
            inStock, isFeatured, isNewArrival, isBestSeller, countdown,
            sizes, material, productType, tags
        });

        const created = await product.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, images, brand, category, colors, inStock, isFeatured, isNewArrival, isBestSeller, countdown, sizes, material, productType, tags } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            if (name !== undefined) product.name = name;
            if (price !== undefined) product.price = price;
            if (description !== undefined) product.description = description;
            if (images !== undefined) product.images = images;
            if (brand !== undefined) product.brand = brand;
            if (category !== undefined) product.category = category;
            if (colors !== undefined) product.colors = colors;
            if (inStock !== undefined) product.inStock = inStock;
            if (isFeatured !== undefined) product.isFeatured = isFeatured;
            if (isNewArrival !== undefined) product.isNewArrival = isNewArrival;
            if (isBestSeller !== undefined) product.isBestSeller = isBestSeller;
            if (countdown !== undefined) product.countdown = countdown;
            if (sizes !== undefined) product.sizes = sizes;
            if (material !== undefined) product.material = material;
            if (productType !== undefined) product.productType = productType;
            if (tags !== undefined) product.tags = tags;

            const updated = await product.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
