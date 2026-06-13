import mongoose from "mongoose";

interface IReview {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    comment: string,
    rating: Number;
    createdAt: Date;
}

const reviewSchema = new mongoose.Schema<IReview>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

reviewSchema.index({ product: 1, user: 1 }, { unique: true }); // 1 review per user

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema, "reviews");
export default Review;