import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fallbackValue: {
        type: String,
        required: true
    }
});

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    properties: [propertySchema]
});

const List = mongoose.model('List', listSchema);

export default List;