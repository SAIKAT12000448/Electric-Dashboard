import {  createSlice } from "@reduxjs/toolkit";

interface IProduct {
    _id: number;
    product_name: string;
    product_quantity: string;
    product_price: number;
    brand: string;
    category: string;
    release_date: string;  
    model_number: string;
    operating_system: string;
    weight: string;
    dimensions: string;
    image: string;
    
}

interface ICart {
    total: number;
    quantity: number;
    products: IProduct[];
   
}
const initialState : ICart ={
    total : 0,
    quantity: 0,
    products: [],

    
}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        // addToCart:(state,action:PayloadAction<number>)=>{
          
        //     );
        // }

    }

});

// export  const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;