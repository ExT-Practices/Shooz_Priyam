import Banner from '../models/Banner.js';

export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find({});
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBanner = async (req, res) => {
    try {
        const banner = await Banner.create(req.body);
        res.status(201).json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            banner.title = req.body.title !== undefined ? req.body.title : banner.title;
            banner.subtitle = req.body.subtitle !== undefined ? req.body.subtitle : banner.subtitle;
            banner.description = req.body.description !== undefined ? req.body.description : banner.description;
            banner.position = req.body.position !== undefined ? req.body.position : banner.position;
            banner.image = req.body.image !== undefined ? req.body.image : banner.image;
            banner.link = req.body.link !== undefined ? req.body.link : banner.link;
            banner.isActive = req.body.isActive !== undefined ? req.body.isActive : banner.isActive;

            const updatedBanner = await banner.save();
            res.json(updatedBanner);
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            await banner.deleteOne();
            res.json({ message: 'Banner removed' });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
