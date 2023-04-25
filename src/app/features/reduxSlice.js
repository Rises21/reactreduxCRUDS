import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';




export const fetchLaptop = createAsyncThunk(
    'laptopData/fetchLaptop',
      async (arg, {rejectWithValue}) => {
    try {
    const response = await axios.get('http://localhost:3000/api/v4/product')
    console.log(response,"ini responseeeee");
    return response.data;
    } catch (error) {
        rejectWithValue(error);
    }
})


export const findLaptop = createAsyncThunk(
    'laptopData/findLaptop',
      async (payload) => {
    try {
    const response = await axios.get(`http://localhost:3000/api/v4/product/${payload}`)
    console.log(response,"ini response findLaptop");
    return response.data;
    } catch (error) {
        console.log(error);
    }
})


export const addLaptop = createAsyncThunk(
    'laptopData/addLaptop',
    async (payload) => {
        const response = await axios.post('http://localhost:3000/api/v4/product'
        , 
        {  
            name: payload.name,
            price: payload.price,
            stock: payload.stock,
            status: payload.status,
            image: payload.image
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        
        });
        console.log(payload,"value yg dikirimmmmm");
        if (response.status === 200) {
            const laptop = await response.data;
            console.log(laptop, "laptop dari post method");
            return laptop;
        }
    }
)


export const deleteLaptop = createAsyncThunk(
    'laptopData/deleteLaptop',
     async (payload) => {
        console.log(payload,"payload sialan");
        const { data } = await axios.delete(`http://localhost:3000/api/v4/product/${payload}`)
        console.log(data,"ini data dari delete");
        return data;
    }
)

export const updateLaptop = createAsyncThunk(
    'laptopData/updateLaptop',
    async (payload) => {
        const response = await axios.put(`http://localhost:3000/api/v4/product/${payload._id}`
        , 
        {  
            name: payload.name,
            price: payload.price,
            stock: payload.stock,
            status: payload.status,
            image: payload.image
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        
        });
        console.log(payload,"value yg dikirimmmmm");
        if (response.status === 200) {
            const laptop = await response.data;
            console.log(laptop, "laptop dari PUT method");
            return laptop;
        }
    }
)


const currentState = {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    }

 const reduxSlice = createSlice({
    name: 'laptopData',
    initialState: currentState ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLaptop.pending, ( state, {payload} ) => {
            state.loading = true;
            })
        builder.addCase(fetchLaptop.fulfilled, ( state, {payload} ) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
            })
        builder.addCase(fetchLaptop.rejected, ( state, {payload} ) => {
            state.message = payload;
            state.isSuccess = false;
            state.loading = false;
            })

        builder.addCase(findLaptop.fulfilled, ( state, {payload} ) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
            })



        builder.addCase(addLaptop.pending, (action, payload) => {
           
            console.log(action, "1");
            console.log(payload, "11");
        })
        builder.addCase(addLaptop.fulfilled, (state, action) => {
            
            //action.data.push(payload)
            console.log(state.data, "2");
            console.log(action.payload, "22");
        })
        builder.addCase(addLaptop.rejected, (action, payload) => {
            console.log(action, "3");
            console.log(payload, "33");
        })

        builder.addCase(deleteLaptop.fulfilled, (state,action) => {
            
            console.log(state.data, "4");
            console.log(action.payload, "44");
            
        })
        builder.addCase(deleteLaptop.rejected, (state,action) => {
            console.log(state, "5");
            console.log(action, "55");
        })


        builder.addCase(updateLaptop.pending, (state, action) => {
           
            console.log(state.data, "1");
            console.log(action.payload, "11");
        })
        builder.addCase(updateLaptop.fulfilled, (state, action) => {
           
         
            console.log(state.data, "2");
            console.log(action.payload, "22");
        })
        builder.addCase(updateLaptop.rejected, (state, action) => {
            console.log(state.data, "3");
            console.log(action.payload, "33");
        })
    }
    
})


export default reduxSlice.reducer;