/**
 * @author       Hersvin Fred Labastida
 * @date_created February 27, 2025
 */

// Offer Acceptance
type OfferAcceptance = {
  month: string;
  IT: number;
  Accounting: number;
  Sales: number;
  HR: number;
  Admin: number;
};

export interface OfferAcceptanceProps {
  data: OfferAcceptance[];
}

// Source Efficiency
type SourceEfficiency = {
  month: string;
  Applied: number;
  Hired: number;
};

export interface ApplicationSourceProps {
  data: SourceEfficiency[];
}

// Recruitment Funnel
type RecruitmentData = {
  month: string;
  Applied: number;
  "For Interview": number;
  Offered: number;
  Hired: number;
  Archived: number;
};

export interface RecruitmentFunnelProps {
  data: RecruitmentData[];
}
