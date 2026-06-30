import { EPlanStatus } from './enums';

const PAYMENT_ENDPOINT = 'payments/subscription';
const PLANS_ENDPOINT = 'payments/plans';
const DEFAULT_ENDPOINT = 'payments/certifikedu/plan';
const ADMIN_PLAN_ENDPOINT = '/admin/plans';

export const PlansEndpoints = {
  GetDefault: `${DEFAULT_ENDPOINT}`,
  GetActivePlans: (status: EPlanStatus) => `${PLANS_ENDPOINT}/${status}`,
  GetPlans: `${ADMIN_PLAN_ENDPOINT}`,
  PlanById: (id: string) => `${ADMIN_PLAN_ENDPOINT}/${id}`,
  RegisterPlan: `${ADMIN_PLAN_ENDPOINT}`,
  SubscribePlan: `${PAYMENT_ENDPOINT}`,
  CancelPlan: (id: string) => `${PAYMENT_ENDPOINT}/${id}`,
};
