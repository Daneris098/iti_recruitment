//#region Application Movements
export const ARCHIVED = 'Archived';
export const FEEDBACK = 'feedback';
export const MOVEMENT = 'movement'
export const TRANSFERRED = 'Transferred';
export const READY_FOR_TRANSFER = 'Ready For Transfer';
export const ALLOWED_ACCESSORS_BASE = ['applicationDate', 'movement', 'comments'];

//#region JobOffers 
export const OF = 'of';
export const TO = 'to';
export const PAGE = 'page';
export const STATUS = 'status';
export const FOUND_IN = 'found in';
export const STATUS_HIRED = 'Hired';
export const PAGE_SIZE = 'pageSize';
export const DATE_FORMAT = 'YYYYMMDD';
export const OFFERS_TAB = 'All_offers';
export const DEFAULT_PAGE_COUNT = '30';
export const DEFAULT_PAGE_NUMBER = '1';
export const TOTAL_ENTRIES = 'entries';
export const LABEL_PENDING = 'Pending';
export const LABEL_ACCEPTED = 'Accepted';
export const LABEL_ARCHIVED = 'Archived';
export const ATTACHMENTS = 'attachments';
export const COMPUTED_SECONDS = 'seconds';
export const LABEL_OFFERS = 'All Job Offers';
export const CURSOR_POINTER = 'cursor-pointer';
export const SHOWING_TOTAL_DATA = 'Showing data';
export const DATE_TRANSACTION = 'DateTransaction';
export const CURSOR_NOT_ALLOWED = 'cursor-not-allowed';
export const HEADER_GENERATE_JOB_OFFER = 'Generate Job Offer';
export const BASE_COLUMNS = ['id', 'applicantName', 'dateGenerated', 'dateLastUpdated'];
export const BASE_COLUMNS_WITH_STATUS = [...BASE_COLUMNS, 'status'];
export const BASE_COLUMNS_WITH_REMARKS = [...BASE_COLUMNS, 'remarks', 'status', 'attachments'];
export const BASE_COLUMNS_WITH_STATUS_ATTACHMENTS = [...BASE_COLUMNS_WITH_STATUS, 'attachments'];