import {createSlice} from "@reduxjs/toolkit";
import dayjs from "dayjs";

const now = dayjs(Date.now())
let nextMonth, year;
if (now.month() < 11) {
  nextMonth = now.month() + 1;
  year = now.year();
} else {
  nextMonth = 0;
  year = now.year() + 1
}

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    year: year,
    nextMonth: nextMonth,
    now: now,
    next: dayjs().set('year', year).set('month', nextMonth).set('day', 1)
  },
  reducers: {},
})

export default dateSlice.reducer