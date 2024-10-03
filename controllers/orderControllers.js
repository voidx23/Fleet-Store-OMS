import Order from '../models/Order.js';

const addOrder = async (req, res) => {
    try {
        console.log(req.body, "this is the req body"); // Check the body
        console.log(req.files, "this is the uploaded files"); // Check the uploaded files
        const { productImage, trackingImage } = req.body;


        const newOrder = new Order({
            customerName: req.body.customerName,
            productImage: productImage ,
            trackingImage: trackingImage ,
            customerDetails: {
                address: req.body.customerDetails.address,
                landmark: req.body.customerDetails.landmark,
                district: req.body.customerDetails.district,
                state: req.body.customerDetails.state,
                pincode: req.body.customerDetails.pincode,
                mobile1: req.body.customerDetails.mobile1,
                mobile2: req.body.customerDetails.mobile2,
            },
            product: {
                name: req.body.product.name,
                color: req.body.product.color,
                size: req.body.product.size,
                amount: req.body.product.amount,
                orderMode: req.body.product.orderMode,
            },
            deliveryStatus: req.body.deliveryStatus,
        });

        console.log(newOrder);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err); // Log the complete error for debugging
        res.status(500).json({ message: err.message });
    }

};

const getOrders = async (req, res) => {
    console.log("inside get func")
    try {
        const orders = await Order.find();
        console.log(orders)
        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateDeliveryStatus = async (req, res) => {
    const { id } = req.params; // Get the order ID from the URL
    const { deliveryStatus } = req.body; // Get the new delivery status from the request body

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { deliveryStatus },  // Update the delivery status
            { new: true }  // Return the updated document
        );
        res.status(200).json(updatedOrder);  // Send the updated order back
    } catch (err) {
        res.status(500).json({ message: err.message });  // Error handling
    }
};


export default { addOrder, getOrders, updateDeliveryStatus };
