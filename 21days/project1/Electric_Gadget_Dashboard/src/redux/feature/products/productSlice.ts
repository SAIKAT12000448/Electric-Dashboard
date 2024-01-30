import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProduct {
    _id: string;
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

interface IProductState {
    status: boolean;
    priceRange: number;
    products: IProduct[];
    releaseDate: string;
    brand: string;
    model: string;
    category: string;
}

const initialState: IProductState = {
    status: false,
    priceRange: 150,
    products: [],
    releaseDate: "",
    brand:'',
    model:'',
    category:'',
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setPriceRange: (state, action: PayloadAction<number>) => {
            state.priceRange = action.payload;
        },
        setReleaseDate: (state, action: PayloadAction<string>) => {
            state.releaseDate = action.payload;
        },
        setBrand:(state, action: PayloadAction<string>) => {
            state.brand=action.payload;
        },
        setModel:(state, action: PayloadAction<string>) => {
            state.model=action.payload;
        },
        setCategory:(state, action: PayloadAction<string>) => {
            state.category=action.payload;
        },
        
    }
})

export const { setPriceRange, setReleaseDate,setBrand,setModel,setCategory} = productSlice.actions;

export default productSlice.reducer;
