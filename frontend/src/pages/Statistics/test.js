import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook } from '@testing-library/react-hooks';

import { useTransactionByCategory } from './hooks';
import { dateState } from '../../recoil/date/atom';
import { categoryState } from '../../recoil/category/atom';
import { transactionsWithDate } from '../../mocks/transactions';

const TEST_TRANSACTION = transactionsWithDate['2022-1'];
const CAFE_TRANSACTION = TEST_TRANSACTION.filter(
    (transaction) => transaction.category === '카페/간식',
);
const EAT_TRANSACTION = TEST_TRANSACTION.filter((transaction) => transaction.category === '식비');
const TEST_CATEGORY = [
    { id: 1, name: '카페/간식', color: '#D092E2', sign: '-' },
    { id: 2, name: '식비', color: '#4CA1DE', sign: '-' },
];

const TEST_DATA = new Map();
TEST_DATA.set(
    { id: 1, name: '카페/간식', color: '#D092E2', sign: '-' },
    { transactions: CAFE_TRANSACTION, percent: 67.90123456790124, expenditureInCategory: 11000 },
);
TEST_DATA.set(
    { id: 2, name: '식비', color: '#4CA1DE', sign: '-' },
    { transactions: EAT_TRANSACTION, percent: 32.098765432098766, expenditureInCategory: 5200 },
);

describe('통계페이지에 사용되는 커스텀 hooks 테스트', () => {
    const initializeState = ({ set }) => {
        set(dateState, {
            year: 2022,
            month: 1,
        });
        set(categoryState, TEST_CATEGORY);
    };

    const Wrapper = ({ children }) => {
        return <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>;
    };

    it('useTransactionByCategory - 카테고리 별 지출 비율 및 금액을 Map 형태로 반환한다.', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useTransactionByCategory(), {
            wrapper: Wrapper,
        });
        await waitForNextUpdate();
        const { transactionsByCategory } = result.current;
        expect(transactionsByCategory).toEqual(TEST_DATA);
    });
});
