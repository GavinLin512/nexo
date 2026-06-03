## ADDED Requirements

### Requirement: Database Connectivity
The system SHALL use Prisma as the schema source-of-truth and SHALL access the Supabase PostgreSQL instance through two distinct paths: (a) the statically-exported frontend reads/writes via the Supabase client SDK (anon key + RLS), and (b) Node-based pipeline workers (GitHub Actions) connect via Prisma. The statically-exported frontend MUST NOT connect via Prisma (Prisma is server-side and cannot run in the static bundle).

#### Scenario: Connection Verification
- **WHEN** running a database health check script or Prisma Studio from a Node environment (local dev or a pipeline worker)
- **THEN** the system successfully connects to the Supabase instance without authentication errors.

#### Scenario: Frontend Data Access
- **WHEN** the static frontend reads or writes a table
- **THEN** it uses the Supabase client SDK under RLS, never a Prisma connection or a Next.js API route / Server Action.

### Requirement: Profiles Table Schema
The system MUST implement a `profiles` table containing at least: `id` (UUID, PK), `user_id` (UUID, Unique), `preferences` (JSONB), and `updated_at` (Timestamp).

#### Scenario: Profile Creation
- **WHEN** a new user is registered in Supabase Auth
- **THEN** a corresponding record in the `profiles` table can be created with default preferences.

### Requirement: Sources Table Schema
The system MUST implement a `sources` table containing at least: `id` (UUID, PK), `name` (String), `url` (String, Unique), `type` (Enum: RSS, API, etc.), and `keywords` (Text array/JSONB).

#### Scenario: Adding a Data Source
- **WHEN** a user adds a new RSS feed URL
- **THEN** the system saves the record with the correct type and associated tracking keywords.
