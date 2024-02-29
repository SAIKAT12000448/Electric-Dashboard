import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'api',
    // baseQuery:fetchBaseQuery({baseUrl:'https://electric-gadget-server-d7jrx49ts-saikat12000448.vercel.app/'}),
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://electric-gadget-server-gtjiezmiz-saikat12000448.vercel.app/' }),
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://electric-gadget-server.vercel.app/',
    }),


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
        getSales: builder.query({
            query:()=> "/sales",
        })
    }),
});

export const {useSignUpMutation,useGetUserQuery,useAddProductMutation,useGetProductQuery,useDeleteProductMutation,useGetUniqueProductQuery,useUpdateProductMutation,useAddSellMutation,useGetSalesQuery} = api;