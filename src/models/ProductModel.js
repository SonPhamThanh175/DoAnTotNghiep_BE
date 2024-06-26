const mongoose = require('mongoose')

const productSchema = new Schema({
        name: {type :String, required:true,unique:true},
        image: {type:String, required:true},
        type: {type:String, required:true},
        price:{type:Number, required:true},
        countIntStock:{type:Number, required:true},
        rating:{type:Number, required:true},
        description:{type:String, required:true},
    },
    {
        timestamp: true,
    }
);

const Product = mongoose.model('Product',productSchema);

module.exports = Product;