import React from 'react';
import { useRecoilValue } from 'recoil';
import moment from 'moment';

import { dateState } from '../../../recoil/date/atom';
import { calculateIncome, calculateExpenditure } from '../../../utils/common/calculate-cost';
import { Wrapper, CostBox, ElementInDay } from './style';

const Day = ({ day, transactions }) => {
    const currentDate = useRecoilValue(dateState);
    const isToday = day.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
    const isInMonth = day.format('M') === String(currentDate.month);

    const dailyIncome = transactions ? calculateIncome(transactions) : 0;
    const dailyExpenditure = transactions ? calculateExpenditure(transactions) : 0;
    const total = dailyIncome - dailyExpenditure;

    return (
        <Wrapper isToday={isToday}>
            <CostBox>
                {dailyIncome !== 0 ? (
                    <ElementInDay color="blue" size={String(dailyIncome).length}>
                        {parseInt(dailyIncome).toLocaleString()}
                    </ElementInDay>
                ) : null}
                {dailyExpenditure !== 0 ? (
                    <ElementInDay color="red" size={String(dailyExpenditure * -1).length}>
                        {parseInt(dailyExpenditure * -1).toLocaleString()}
                    </ElementInDay>
                ) : null}
                {total !== 0 ? (
                    <ElementInDay color="black" size={String(total).length}>
                        {parseInt(total).toLocaleString()}
                    </ElementInDay>
                ) : null}
            </CostBox>
            <ElementInDay color={isInMonth ? 'gray' : 'brigtenL1Gray'}>
                {day.format('D')}
            </ElementInDay>
        </Wrapper>
    );
};

export default Day;
