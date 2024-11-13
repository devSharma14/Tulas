import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    workoutPlans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutPlan',
        required: true
    },
    dietPlans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DietPlan',
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;
