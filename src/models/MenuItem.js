import mongoose, { Schema, model, models } from "mongoose";  //trqbvashe da importna i mongoose

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
})

const MenuItemSchema = new Schema({
    image:{type:String},
    name: { type: String },
    description: { type: String },
    category: {type: String, ref: 'Category'},
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

//timestamps:true to have some extra data//
// category: { type: mongoose.Types.ObjectId }, bcs we are sending an id NO NE RABOTESHE I GO OPRAVIH  8:17:20 
