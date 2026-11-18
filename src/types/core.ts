// ============================================================================
// YOU KNOW CORE — Types & DTOs TypeScript Officiels
// Partagés entre Backend Express et Frontends (React / Angular / Flutter)
// ============================================================================

export type OrganizationType = 'HOLDING' | 'SUBSIDIARY' | 'ACADEMY' | 'PARTNER';
export type UserStatus = 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';
export type ClientPlatform = 'REACT_WEB' | 'ANGULAR_WEB' | 'FLUTTER_MOBILE' | 'ADMIN_CONSOLE' | 'API_CLIENT';
export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
export type TransactionType = 'INCOME' | 'EXPENSE';
export type TransactionStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type SupportedCurrency = 'XOF' | 'EUR' | 'USD';

export interface OrganizationDTO {
  id: string;
  code: string;
  name: string;
  slug: string;
  type: OrganizationType;
  parentId: string | null;
  sector: string | null;
  domain: string | null;
  email: string | null;
  phone: string | null;
  defaultCurrency: SupportedCurrency;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  primaryOrganizationId: string | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  roles: string[];
  createdAt: string;
}

export interface ProjectDTO {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  managerId: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialCategoryDTO {
  id: string;
  organizationId: string | null;
  code: string;
  name: string;
  type: TransactionType;
  isActive: boolean;
}

export interface BudgetDTO {
  id: string;
  organizationId: string;
  projectId: string | null;
  categoryId: string | null;
  fiscalYear: number;
  fiscalMonth: number | null;
  allocatedAmount: string;
  currency: SupportedCurrency;
  notes: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialTransactionDTO {
  id: string;
  organizationId: string;
  projectId: string | null;
  type: TransactionType;
  categoryId: string;
  amount: string;
  currency: SupportedCurrency;
  baseCurrency: 'XOF';
  exchangeRate: string;
  baseCurrencyAmount: string;
  status: TransactionStatus;
  transactionDate: string;
  referenceCode: string | null;
  description: string | null;
  idempotencyKey: string | null;
  createdBy: string;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFinancialTransactionInput {
  organizationId: string;
  projectId?: string | null;
  type: TransactionType;
  categoryId: string;
  amount: number;
  currency: SupportedCurrency;
  exchangeRate?: number;
  transactionDate: string;
  referenceCode?: string;
  description?: string;
  idempotencyKey?: string;
}

export interface DocumentDTO {
  id: string;
  organizationId: string;
  projectId: string | null;
  uploadedBy: string | null;
  module: string;
  entityId: string | null;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  sha256Checksum: string;
  isPublic: boolean;
  downloadUrl: string;
  createdAt: string;
}

export interface CourseDTO {
  id: string;
  organizationId: string;
  code: string;
  title: string;
  category: 'BUREAUTIQUE' | 'IA_TECH' | 'DEV_WEB' | 'ENTREPRENEURIAT' | 'AUTRE';
  deliveryMode: 'ONLINE' | 'HYBRID' | 'IN_PERSON';
  durationDays: number;
  registrationFeeXof: string;
  perSessionFeeXof: string;
  description: string | null;
  isPublished: boolean;
}

export interface NotificationDTO {
  id: string;
  userId: string;
  organizationId: string | null;
  channel: 'IN_APP' | 'EMAIL' | 'BOTH';
  type: string;
  title: string;
  body: string;
  linkUrl: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface AuditLogDTO {
  id: number;
  organizationId: string | null;
  actorUserId: string | null;
  actorLabel: string | null;
  action: string;
  entityType: string;
  entityId: string;
  beforeJson: unknown;
  afterJson: unknown;
  ipAddress: string | null;
  createdAt: string;
}
