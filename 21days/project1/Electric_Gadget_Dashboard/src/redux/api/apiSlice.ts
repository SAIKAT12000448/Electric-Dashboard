import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'api',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/'}),
    endpoints:(builder)=>({
        getUser : builder.query({
            query:()=> "/login",
        }),
        getProduct:builder.query({
             query:()=>"/products"
        }),

        getUniqueProduct:builder.query({
             query:(id)=>`/product/${id}`
        }),
   
        signUp : builder.mutation({
            query:(data)=>({
                url:`/signup`,
                method:"POST",
                body:data,

            }),
        }),
        addProduct : builder.mutation({
            query:(data)=>({
                url:`/addproduct`,
                method:"POST",
                body:data,

            }),
        }),
        deleteProduct : builder.mutation({
            query:(id)=>({
                url:`/deleteproduct/${id}`,
                method:"DELETE",

            }),
        }),
        updateProduct : builder.mutation({

            query:(data)=>({
                url:`/updateproduct`,
                method:"PUT",
                body:data

            }),
        }),
        addSell : builder.mutation({
            query:(data)=>({
                url:`/addsell`,
                method:"POST",
                body:data,

            }),
        }),
    }),
});

export const {useSignUpMutation,useGetUserQuery,useAddProductMutation,useGetProductQuery,useDeleteProductMutation,useGetUniqueProductQuery,useUpdateProductMutation,useAddSellMutation} = api;