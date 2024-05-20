import List from '../models/list.model.js';

const createList = async (req, res) => {
    try {
        // Take details from request
        const { title, properties } = req.body;

        // Create a new List
        const list = new List({ title, properties });
        await list.save();

        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export {
    createList
}
