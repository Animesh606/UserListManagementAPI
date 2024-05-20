import List from '../models/list.model.js';
import { processCSV } from '../services/csv.service.js';

const uploadUsers = async (req, res) => {
    try {
        const { listId } = req.params;

        const list = await List.findById(listId);

        if (!list)
            return res.status(404).json({ message: 'List not found' });

        const { successCount, errorCount, errors } = await processCSV(req.file.path, list);

        res.status(201).json({ successCount, errorCount, errors });
    } catch (error) {
        console.log('Server error', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export {
    uploadUsers
}