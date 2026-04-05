import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import drugService from './drugService'

const initialState = {
    drugs: [],
    drug: null,
    searchTerm:  "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

// Create new drug
export const createDrug = createAsyncThunk('drugs/create', async(drugData, thunkAPI) => {
    try {
        return await drugService.createDrug(drugData)
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all drugs
export const getDrugs = createAsyncThunk('drugs/getAll', async(_, thunkAPI) => {
    try {
        return await drugService.getDrugs()
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get a drug by ID
export const getDrugById = createAsyncThunk('drugs/getById', async(id, thunkAPI) => {
    try {
        return await drugService.getDrugById(id)
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update drug
export const updateDrug = createAsyncThunk('drugs/update', async({id, drugData}, thunkAPI) => {
    try {
        return await drugService.updateDrug(id, drugData)
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete drug
export const deleteDrug = createAsyncThunk(
  'drugs/delete',
  async (id, thunkAPI) => {
    try {
      await drugService.deleteDrug(id)
      return id 
    } catch (error) {
      const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)


// Creating the slice
export const drugSlice = createSlice({
    name: 'drug',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setSearchTerm: (state, action) => {
        state.searchTerm = action.payload
    }
    },
    extraReducers: (builder) => {
        builder
            // Creating a drug
            .addCase(createDrug.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDrug.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drugs.push(action.payload)
            })
            .addCase(createDrug.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Get all drugs
            .addCase(getDrugs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDrugs.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drugs = action.payload
            })
            .addCase(getDrugs.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Get by Id
            .addCase(getDrugById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDrugById.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drug = action.payload
            })
            .addCase(getDrugById.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // UPDATE
      .addCase(updateDrug.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDrug.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.drug = action.payload  // ✅ update the single drug view
        state.drugs = state.drugs.map((drug) =>
            drug._id === action.payload._id ? action.payload : drug
        )
        })
      .addCase(updateDrug.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // DELETE
      .addCase(deleteDrug.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDrug.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.drugs = state.drugs.filter(
          (drug) => drug._id !== action.payload
        )
      })
      .addCase(deleteDrug.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    },
})

export const { reset, setSearchTerm } = drugSlice.actions
export default drugSlice.reducer