const validateCSV = (data, listProperties) => {
    const errors = [];

    // Check for required fields: 'name' and 'email'
    if (!data.name) {
        errors.push('Name is required.');
    }
    if (!data.email) {
        errors.push('Email is required.');
    }

    // Validate custom properties
    listProperties.forEach(prop => {
        if (!data.hasOwnProperty(prop.title) && !prop.fallbackValue) {
            errors.push(`Missing value for ${prop.title}`);
        }
    });

    return errors.length > 0 ? errors : null;
};

export default validateCSV;