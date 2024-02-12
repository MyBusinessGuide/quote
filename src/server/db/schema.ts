import { relations, sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `bababills_${name}`);

export const vertical = createTable("vertical", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 256 }).notNull(),
  slug: text("slug").unique().notNull(),
});

export const companyType = createTable("company_type", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 256 }).notNull().unique(),
});

export const industry = createTable("industry", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 256 }).notNull().unique(),
});

const _leadJourneyPage = [
  "COMPANY_NAME",
  "ANNUAL_TURNOVER",
  "INDUSTRY",
  "TENURE",
  "COMPANY_API",
  "CONTACT",
] as const;
export type LeadJourneyPage = (typeof _leadJourneyPage)[number];
export const leadJourneyPage = pgEnum("lead_journey_page", _leadJourneyPage);

export const annualTurnoverGBP = createTable("annual_turnover_gbp", {
  id: serial("id").primaryKey(),
  minGBP: integer("min_gbp"),
  maxGBP: integer("max_gbp"),
  label: varchar("label", { length: 256 }).notNull(),
});

export const tenure_yrs = createTable("tenure_yrs", {
  id: serial("id").primaryKey(),
  minYrs: integer("min_yrs"),
  maxYrs: integer("max_yrs"),
  label: varchar("label", { length: 256 }).notNull(),
});

export const leadJourney = createTable(
  "lead_journey",
  {
    id: serial("id").primaryKey(),
    verticalId: integer("vertical_id")
      .references(() => vertical.id)
      .notNull(),
    companyTypeId: integer("company_type_id")
      .references(() => companyType.id)
      .notNull(),
    firstLeadJourneyStepId: integer("first_lead_journey_step_id")
      .notNull()
      .references(() => leadJourneyStep.id),
  },
  (t) => ({
    unq: unique().on(t.companyTypeId, t.verticalId),
  }),
);

export const leadJourneyStep = createTable(
  "lead_journey_step",
  {
    id: serial("id").primaryKey(),
    leadJourneyPage: leadJourneyPage("lead_journey_page").notNull(),
    slug: text("slug").unique().notNull(),
    nextJourneyStepId: integer("next_journey_step"),
  },
  (t) => ({
    nextJourneyStepReference: foreignKey({
      columns: [t.nextJourneyStepId],
      foreignColumns: [t.id],
    }),
  }),
);

export const lead = createTable("lead", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  companyTypeId: integer("company_type_id").references(() => companyType.id),
  companyName: text("company_name"),
  annualTurnoverGBPId: integer("annual_turnover_gbp_id").references(
    () => annualTurnoverGBP.id,
  ),
  industryId: integer("industry_id").references(() => industry.id),
  tenureYrsId: integer("tenure_yrs_id").references(() => tenure_yrs.id),
  submitted: boolean("submitted").default(false),
});

export const verticalAmountGBP = createTable("vertical_amount_gbp", {
  id: serial("id").primaryKey(),
  verticalId: integer("vertical_id")
    .references(() => vertical.id)
    .notNull(),
  leadId: integer("lead_id")
    .references(() => lead.id)
    .notNull(),
  amountGBP: integer("amount_gbp").notNull(),
});

// AUTH

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

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
