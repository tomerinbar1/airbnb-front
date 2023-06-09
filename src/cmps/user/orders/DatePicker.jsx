import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
// import '../../../assets/styles/cmps/_OrderModal.scss'
import { DateRange } from 'react-date-range'
import { useState } from 'react'



export function DatePicker({ onSetField, checkIn, checkOut }) {
    checkIn = checkIn ?  new Date(checkIn) : new Date()
    checkOut = checkOut ?  new Date(checkOut) : new Date()
    const monthsToShow = 2

    const [range, setRange] = useState([
        {
            startDate: checkIn,
            endDate: checkOut,
            key: 'selection'
        }
    ])

    function handleChange(item) {
        const selection = item.selection
        // console.log(selection)
        setRange([selection])
        if (selection.startDate === selection.endDate) {
            onSetField('checkIn', selection.startDate)
        } else {
            onSetField('checkOut', selection.endDate)
        }
    }


    return (
        <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={monthsToShow}
            direction="horizontal"
            rangeColors={['#F7F7F7']}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            className='date-picker'
        // disabledDates=[]

        />
    )
}