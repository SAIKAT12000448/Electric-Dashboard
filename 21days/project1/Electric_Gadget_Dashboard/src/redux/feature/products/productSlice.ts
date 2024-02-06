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
    operating:string;
    connectivity:string;
    powered:string;
    storage:string;
    screen:string;
}

const initialState: IProductState = {
    status: false,
    priceRange: 150,
    products: [],
    releaseDate: "",
    brand:'',
    model:'',
    category:'',
    operating:'',
    connectivity:'',
    powered:'' ,
    storage:'',
    screen:'',
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
        setOperating:(state, action: PayloadAction<string>) => {
            state.operating=action.payload; 
        },
        setConnectivity:(state, action: PayloadAction<string>) => {
            state.connectivity=action.payload;
        },
        setPowered:(state, action: PayloadAction<string>) => {
            state.powered=action.payload;
        },
        setStorage:(state, action: PayloadAction<string>) => {
            state.storage=action.payload;
        },
        setScreenSize:(state, action: PayloadAction<string>) => {
            state.screen=action.payload;
        },
        
    }
})

export const { setPriceRange, setReleaseDate,setBrand,setModel,setCategory,setOperating,setConnectivity,setPowered,setStorage,setScreenSize} = productSlice.actions;

export default productSlice.reducer;
