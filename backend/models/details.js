import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
    
    age: {
        type: Number,
        required: true,
        min: 0 
    },
    height: {
        type: Number,
        required: true,
        min: 0
    },
    weight: {
        type: Number,
        required: true,
        min: 0 
    },
    
});

export default mongoose.model('Details', detailsSchema);
