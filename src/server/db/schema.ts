import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { relations, sql } from "drizzle-orm";
import { AdapterAccount } from "next-auth/adapters";
import { randomUUID } from "crypto";

export const createTable = pgTableCreator((name) => `bababills_${name}`);

export const service = createTable("service", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const leadCodeValues = [
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
] as const;
export const leadCode = pgEnum("lead_code", leadCodeValues);
export const LeadCodeValuesEnum = z.enum(leadCode.enumValues).Enum;
export type LeadCode = typeof LeadCodeValuesEnum;

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
  serviceId: integer("service_id")
    .notNull()
    .references(() => service.id),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  companyName: text("company_name").notNull(),
  annualTurnoverGBPId: integer("annual_turnover_gbp_id").references(
    () => annualTurnoverGBP.id,
  ),
  industryId: integer("industry_id").references(() => industry.id),
  tenureYrsId: integer("tenure_yrs_id").references(() => tenure_yrs.id),
  amountGBP: integer("amount_gbp"),
  address: varchar("address", { length: 256 }),
  companyStatus: varchar("company_status", { length: 256 }),
  postalCode: varchar("postal_code", { length: 256 }),
  companyType: varchar("company_type", { length: 256 }),
  leadCode: leadCode("lead_code").notNull(),
  dateCreated: timestamp("date_created").defaultNow(),
});

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }).notNull().default("user"),
  phoneNumber: varchar("phone_number", { length: 255 }),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const leadDeliveryMethodValues = ["URL", "email", "Zapier"] as const;

export const leadDeliveryMethod = pgEnum(
  "lead_delivery_method",
  leadDeliveryMethodValues,
);

export const LeadDeliveryMethodEnum = z.enum(
  leadDeliveryMethod.enumValues,
).Enum;

export const providerPriorityValues = ["priority_1", "priority_2"] as const;

export const providerPriority = pgEnum(
  "provider_priority",
  providerPriorityValues,
);

export const ProviderPriorityEnum = z.enum(providerPriority.enumValues).Enum;

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
  priority: providerPriority("priority").notNull().default("priority_1"),
  serviceId: integer("service_id")
    .notNull()
    .references(() => service.id)
    .default(1),
  archived: boolean("archived").notNull().default(false),
});
export const insertProviderSchema = createInsertSchema(providers, {
  maxMonthlyBudgetGBP: z.coerce.number().min(0),
  email: z.string().email(),
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  archived: z.boolean(),
});

export const providerBid = createTable(
  "provider_bid",
  {
    id: serial("id").primaryKey().notNull(),
    providerId: integer("provider_id")
      .notNull()
      .references(() => providers.id),
    amountGBP: real("amount_gbp").notNull(),
    leadCode: leadCode("lead_code").notNull(),
  },
  (t) => ({
    unq: unique().on(t.leadCode, t.providerId),
  }),
);

export const insertProviderBidSchema = createInsertSchema(providerBid, {
  amountGBP: z.coerce.number().min(0),
});

export const leadProviderConnection = createTable(
  "lead_provider_connection",
  {
    id: serial("id").primaryKey().notNull(),
    leadId: integer("lead_id")
      .notNull()
      .unique()
      .references(() => lead.id, { onDelete: "cascade" }),
    providerBidId: integer("provider_bid_id")
      .notNull()
      .references(() => providerBid.id),
    leadCode: leadCode("lead_code").notNull(),
    amountGBP: real("amount_gbp").notNull(),
    dateCreated: timestamp("date_created").defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.leadId, t.providerBidId),
  }),
);

// _______________________________________________________________

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
