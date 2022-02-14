import React from 'react';

import { Wrapper } from './style';
import Day from '../Day';

const WEEK_LENGTH = 7;

const Week = ({ baseDay, currentWeek, dailyTransactions }) => {
    const days = Array(WEEK_LENGTH)
        .fill()
        .map((_, index) => {
            const day = baseDay
                .clone()
                .startOf('year')
                .week(currentWeek)
                .startOf('week')
                .add(index, 'days');
            return (
                <Day
                    key={currentWeek + index}
                    day={day}
                    transactions={dailyTransactions.get(day.format('YYYY-MM-DD'))}
                />
            );
        });

    return <Wrapper>{days}</Wrapper>;
};

export default Week;