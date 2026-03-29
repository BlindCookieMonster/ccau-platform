import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// ─── Tenants ────────────────────────────────────────────────────────────────────

export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    clerkOrgId: text("clerk_org_id").notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex("tenants_clerk_org_id_idx").on(t.clerkOrgId),
    uniqueIndex("tenants_slug_idx").on(t.slug),
  ]
);

export const tenantsRelations = relations(tenants, ({ many }) => ({
  projects: many(projects),
  devices: many(devices),
}));

// ─── Projects ───────────────────────────────────────────────────────────────────

export const projects = pgTable(
  "projects",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id),
    name: text("name").notNull(),
    siteId: text("site_id").notNull(), // Matches S3 key prefix, e.g. "PORTARLINGTON"
    location: text("location"),
    startDate: date("start_date"),
    endDate: date("end_date"),
    status: text("status").notNull().default("active"), // active | paused | completed
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("projects_tenant_id_idx").on(t.tenantId),
    uniqueIndex("projects_site_id_idx").on(t.siteId),
  ]
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [projects.tenantId],
    references: [tenants.id],
  }),
  devices: many(devices),
  images: many(images),
  timelapseBuilds: many(timelapseBuilds),
}));

// ─── Devices ────────────────────────────────────────────────────────────────────

export const devices = pgTable(
  "devices",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    deviceId: text("device_id").notNull(), // Matches S3 key, e.g. "CAM001"
    projectId: uuid("project_id").references(() => projects.id),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id),
    name: text("name").notNull(),
    model: text("model"),
    routerModel: text("router_model"),
    simIccid: text("sim_iccid"),
    apiKey: text("api_key").notNull(),
    status: text("status").notNull().default("offline"), // online | offline | maintenance
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex("devices_device_id_idx").on(t.deviceId),
    uniqueIndex("devices_api_key_idx").on(t.apiKey),
    index("devices_tenant_id_idx").on(t.tenantId),
    index("devices_project_id_idx").on(t.projectId),
  ]
);

export const devicesRelations = relations(devices, ({ one, many }) => ({
  project: one(projects, {
    fields: [devices.projectId],
    references: [projects.id],
  }),
  tenant: one(tenants, {
    fields: [devices.tenantId],
    references: [tenants.id],
  }),
  images: many(images),
  telemetry: many(deviceTelemetry),
}));

// ─── Images ─────────────────────────────────────────────────────────────────────

export const images = pgTable(
  "images",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    deviceId: uuid("device_id")
      .notNull()
      .references(() => devices.id),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id),
    s3Key: text("s3_key").notNull(),
    capturedAt: timestamp("captured_at", { withTimezone: true }).notNull(),
    indexedAt: timestamp("indexed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    width: integer("width"),
    height: integer("height"),
    fileSizeBytes: integer("file_size_bytes"),
    qaStatus: text("qa_status").notNull().default("pending"), // pending | passed | flagged | excluded | error
    qaBrightness: real("qa_brightness"),
    qaBlurScore: real("qa_blur_score"),
    qaEdgeDensity: real("qa_edge_density"),
    qaFlags: text("qa_flags")
      .array()
      .default(sql`'{}'::text[]`),
    sidecarBatteryV: real("sidecar_battery_v"),
    sidecarSignalRssi: integer("sidecar_signal_rssi"),
    thumbnailS3Key: text("thumbnail_s3_key"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("images_project_device_captured_idx").on(
      t.projectId,
      t.deviceId,
      t.capturedAt
    ),
    index("images_device_captured_idx").on(t.deviceId, t.capturedAt),
    uniqueIndex("images_s3_key_idx").on(t.s3Key),
  ]
);

export const imagesRelations = relations(images, ({ one }) => ({
  device: one(devices, {
    fields: [images.deviceId],
    references: [devices.id],
  }),
  project: one(projects, {
    fields: [images.projectId],
    references: [projects.id],
  }),
}));

// ─── Timelapse Builds ───────────────────────────────────────────────────────────

export const timelapseBuilds = pgTable(
  "timelapse_builds",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id),
    deviceId: uuid("device_id").references(() => devices.id),
    type: text("type").notNull(), // pitl | final | preview
    status: text("status").notNull().default("queued"), // queued | building | complete | failed | no_frames | delivery_failed
    frameCount: integer("frame_count"),
    excludedCount: integer("excluded_count"),
    durationSeconds: real("duration_seconds"),
    resolution: text("resolution"),
    s3Key: text("s3_key"),
    frameioDAssetId: text("frameio_asset_id"),
    frameioReviewUrl: text("frameio_review_url"),
    buildStartedAt: timestamp("build_started_at", { withTimezone: true }),
    buildCompletedAt: timestamp("build_completed_at", { withTimezone: true }),
    dateRangeStart: date("date_range_start"),
    dateRangeEnd: date("date_range_end"),
    qaNotes: text("qa_notes"), // JSON string — kept simple for Phase 1
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("timelapse_builds_project_id_idx").on(t.projectId),
    index("timelapse_builds_device_id_idx").on(t.deviceId),
  ]
);

export const timelapseBuildsRelations = relations(
  timelapseBuilds,
  ({ one }) => ({
    project: one(projects, {
      fields: [timelapseBuilds.projectId],
      references: [projects.id],
    }),
    device: one(devices, {
      fields: [timelapseBuilds.deviceId],
      references: [devices.id],
    }),
  })
);

// ─── Device Telemetry ───────────────────────────────────────────────────────────

export const deviceTelemetry = pgTable(
  "device_telemetry",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    deviceId: uuid("device_id")
      .notNull()
      .references(() => devices.id),
    recordedAt: timestamp("recorded_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    batteryVoltage: real("battery_voltage"),
    batterySoc: real("battery_soc"),
    solarPowerW: real("solar_power_w"),
    signalRssi: integer("signal_rssi"),
    signalType: text("signal_type"), // 4G | 3G | 2G
    routerTempC: real("router_temp_c"),
    storageUsedMb: real("storage_used_mb"),
  },
  (t) => [
    index("device_telemetry_device_id_idx").on(t.deviceId),
    index("device_telemetry_recorded_at_idx").on(t.recordedAt),
  ]
);

export const deviceTelemetryRelations = relations(
  deviceTelemetry,
  ({ one }) => ({
    device: one(devices, {
      fields: [deviceTelemetry.deviceId],
      references: [devices.id],
    }),
  })
);
