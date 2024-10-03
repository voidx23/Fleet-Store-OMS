import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    customerName: {
        type: String,
        required: true, // Ensuring this field is required
    },
    productImage: {
        type: String,
        required: true, // If product image is essential
    },
    trackingImage: {
        type: String,
        required: true, // If tracking image is essential
    },
    customerDetails: {
        address: {
            type: String,
            required: true, // Ensuring this field is required
        },
        landmark: String,
        district: String,
        state: String,
        pincode: {
            type: String,
            required: true, // Ensuring this field is required
        },
        mobile1: {
            type: String,
            required: true, // Ensuring this field is required
        },
        mobile2: String,
    },
    product: {
        name: {
            type: String,
            required: true, // Ensuring this field is required
        },
        color: String,
        size: String,
        amount: {
            type: Number,
            required: true, // Ensuring this field is required
        },
        orderMode: {
            type: String,
            enum: ['COD', 'UPI'], // Restricting values to COD or UPI
            required: true, // Ensuring this field is required
        },
    },
    deliveryStatus: {
        type: String,
        default: 'Pending',
    },
}, {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
});

export default model('Order', orderSchema);
