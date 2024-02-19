import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `bababills_${name}`);

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
