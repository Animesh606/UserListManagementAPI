import csvParser from 'csv-parser';
import fs from 'fs';
import User from '../models/user.model.js';
import validateCSV from '../utils/csv.validator.js';

const processCSV = async (filePath, list) => {
    const results = [];
    const errors = [];
    const propertyMap = list.properties.reduce((map, prop) => {
        map[prop.title] = prop.fallbackValue;
        return map;
    }, {});

    try {
        const stream = fs.createReadStream(filePath).pipe(csvParser());

        for await (const data of stream) {
            const validationErrors = validateCSV(data, list.properties);
            if (validationErrors) {
                errors.push({ email: data.email, error: validationErrors.join(', ') });
                continue;
            }

            try {
                const properties = {};
                list.properties.forEach(prop => {
                    properties[prop.title] = data[prop.title] || prop.fallbackValue;
                });

                const user = new User({
                    name: data.name,
                    email: data.email,
                    properties,
                    listId: list._id,
                });

                await user.save();
                results.push(user);
            } catch (err) {
                errors.push({ email: data.email, error: err.message });
            }
        }

        fs.unlinkSync(filePath);
        return {
            successCount: results.length,
            errorCount: errors.length,
            errors
        };
    } catch (err) {
        throw new Error('Failed to process CSV file: ' + err.message);
    }
};

export {
    processCSV
}
