import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `bababills_${name}`);

export const leadCode = pgEnum("lead_code", [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "D4",
  "E1",
  "E2",
  "E3",
  "E4",
]);

export const industry = createTable("industry", {
  id: serial("id").primaryKey().notNull(),
  label: varchar("label", { length: 256 }).notNull().unique(),
});

export const annualTurnoverGBP = createTable("annual_turnover_gbp", {
  id: serial("id").primaryKey().notNull(),
  minGBP: integer("min_gbp"),
  maxGBP: integer("max_gbp"),
  label: varchar("label", { length: 256 }).notNull(),
});

export const tenure_yrs = createTable("tenure_yrs", {
  id: serial("id").primaryKey().notNull(),
  minYrs: integer("min_yrs"),
  maxYrs: integer("max_yrs"),
  label: varchar("label", { length: 256 }).notNull(),
});

export const lead = createTable("lead", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  companyName: text("company_name"),
  annualTurnoverGBPId: integer("annual_turnover_gbp_id").references(
    () => annualTurnoverGBP.id,
  ),
  industryId: integer("industry_id").references(() => industry.id),
  tenureYrsId: integer("tenure_yrs_id").references(() => tenure_yrs.id),
  amountGBP: integer("amount_gbp"),
  companyStatus: varchar("company_status", { length: 256 }),
  address: varchar("address", { length: 256 }),
  postalCode: varchar("postal_code", { length: 256 }),
  companyType: varchar("company_type", { length: 256 }),
  leadCode: leadCode("lead_code").notNull(),
});

export const users = createTable("user", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
});

export const leadDeliveryMethod = pgEnum("lead_delivery_method", [
  "URL",
  "email",
  "Zapier",
]);

export const providers = createTable("provider", {
  id: serial("id").primaryKey().notNull(),
  companyName: text("company_name").notNull(),
  companyNumber: varchar("company_number", { length: 64 }),
  contactName: varchar("contact_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 256 }),
  address: varchar("address", { length: 256 }),
  maxMonthlyBudgetGBP: integer("max_monthly_budget_gbp").notNull(),
  leadDeliveryMethod: leadDeliveryMethod("lead_delivery_method").notNull(),
  fcaNumber: varchar("fca_number", { length: 256 }),
  // - payment_terms
  // - service
});

export const providerBid = createTable("provider_bid", {
  id: serial("id").primaryKey().notNull(),
  providerId: integer("provider_id")
    .notNull()
    .references(() => providers.id),
  amountGBP: integer("amount_gbp").notNull(),
  leadCode: leadCode("lead_code").notNull(),
});

export const leadProviderConnection = createTable("lead_provider_connection", {
  id: serial("id").primaryKey().notNull(),
  leadId: integer("lead_id")
    .notNull()
    .references(() => lead.id),
  providerBidId: integer("provider_bid_id")
    .notNull()
    .references(() => providerBid.id),
});
