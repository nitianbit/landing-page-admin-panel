import React, { useState } from 'react';
import { Popover, Button, Space, DatePicker } from 'antd';
import moment from 'moment';

const CustomDateFilter = ({ onDateRangeSelected }) => {
    const allTimeStartDate = moment('1900-01-01');
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    const predefinedRanges = {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(7, 'days'), moment()],
        'Last 14 Days': [moment().subtract(14, 'days'), moment()],
        'Last 30 Days': [moment().subtract(30, 'days'), moment()],
        'This Week': [moment().startOf('week'), moment().endOf('week')],
        'Last Week': [
            moment().subtract(1, 'weeks').startOf('week'),
            moment().subtract(1, 'weeks').endOf('week'),
        ],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
            moment().subtract(1, 'months').startOf('month'),
            moment().subtract(1, 'months').endOf('month'),
        ],
        Maximum: [allTimeStartDate, moment()],
    };

    const handleRangeSelection = (range) => {
        const selectedRange = predefinedRanges[range]
        setSelectedDateRange(selectedRange);
        onDateRangeSelected({
            startDate: selectedRange[0].format('YYYY-MM-DD'),
            endDate: selectedRange[1].format('YYYY-MM-DD'),
          });

    };

    const handleCustomRangeChange = (dates) => {
        setSelectedDateRange(dates);
        if (dates && dates.length === 2) {
            onDateRangeSelected({
              startDate: dates[0].format('YYYY-MM-DD'),
              endDate: dates[1].format('YYYY-MM-DD'),
            });
          }
    };

    const content = (
        <Space direction="vertical">
            {Object.keys(predefinedRanges).map((key) => (
                <Button key={key} onClick={() => handleRangeSelection(key)}>
                    {key}
                </Button>
            ))}
            <DatePicker.RangePicker
                value={selectedDateRange}
                onChange={handleCustomRangeChange}
                style={{ display: 'block' }}
                format="YYYY-MM-DD"
            />
        </Space>
    );

    return (
        <Popover content={content} title="Select Date Range" trigger="click">
            <Button type="primary">Filter Dates</Button>
        </Popover>
    );
};

export default CustomDateFilter;
