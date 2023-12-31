import { selectorFamily } from 'recoil';

import { companyProgressesFamilyState } from '@/companies/states/companyProgressesFamilyState';

import { boardCardIdsByColumnIdFamilyState } from '../boardCardIdsByColumnIdFamilyState';

// TODO: this state should be computed during the synchronization web-hook and put in a generic
// boardColumnTotalsFamilyState indexed by columnId.
export const boardColumnTotalsFamilySelector = selectorFamily({
  key: 'boardColumnTotalsFamilySelector',
  get:
    (pipelineStepId: string) =>
    ({ get }) => {
      const cardIds = get(boardCardIdsByColumnIdFamilyState(pipelineStepId));

      const opportunities = cardIds.map((opportunityId: string) =>
        get(companyProgressesFamilyState(opportunityId)),
      );

      const pipelineStepTotal: number =
        opportunities?.reduce(
          (acc: number, curr: any) =>
            acc + curr?.opportunity.amount.amountMicros / 1000000,
          0,
        ) || 0;

      return pipelineStepTotal;
    },
});
