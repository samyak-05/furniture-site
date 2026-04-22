import mongoose from 'mongoose';

interface IProduct{
    _id?: mongoose.Types.ObjectId;
    name: string;
    price: string;
    description: string;
    category: string;
    isLuxury: boolean;
    createdAt?: Date;
    image: Array<string>;
    model3d?: string
}

const productSchema = new mongoose.Schema<IProduct>({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['chair', 'table', 'sofa', 'bed', 'cabinet','others'], 
        required: true 
    },
    isLuxury: { 
        type: Boolean, 
        required: true 
    },
    image: { 
        type: [String], 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    model3d: {
        type: String,
        required : false,
        trim : true
    }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;