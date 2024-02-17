import {
  boolean,
  integer,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `bababills_${name}`);

export const companyType = createTable("company_type", {
  id: serial("id").primaryKey().notNull(),
  label: varchar("label", { length: 256 }).notNull().unique(),
});

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
  companyTypeId: integer("company_type_id").references(() => companyType.id),
  companyName: text("company_name"),
  annualTurnoverGBPId: integer("annual_turnover_gbp_id").references(
    () => annualTurnoverGBP.id,
  ),
  industryId: integer("industry_id").references(() => industry.id),
  tenureYrsId: integer("tenure_yrs_id").references(() => tenure_yrs.id),
  amountGBP: integer("amount_gbp"),
  submitted: boolean("submitted").default(false),
});

export const users = createTable("user", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
});
