import {createSlice} from '@reduxjs/toolkit';

const d = new Date();
const result = d.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});
const initialState = {
  status: [],
};

export const statusSlice = createSlice({
  name: 'statusSlice',
  initialState,
  reducers: {
    setStatusData: (state, action) => {
      const allData = action.payload?.data;
      const userId = action.payload?.userId;
      const index = allData.findIndex(item => item?.id === userId);
      const myStatus = {...allData[index]};
      if (index > -1) {
        allData.splice(index, 1);
        allData?.unshift(myStatus);
      }
      state.status = allData;
    },
    seenStatus: (state, action) => {
      const dataArr = [...state.status];
      const seenStatus = action?.payload?.item;
      const seenStatusIndex = action?.payload?.index;
      const firstSeenStatusIndex = dataArr.findIndex(item => item?.isSeen);
      dataArr.splice(seenStatusIndex, 1);
      dataArr.splice(firstSeenStatusIndex, 0, seenStatus);
      state.status = dataArr;
    },
  },
});

export const {setArrageData, seenStatus, setStatusData} = statusSlice.actions;
export default statusSlice.reducer;
