## ADDED Requirements

### Requirement: Database Connectivity
The system SHALL establish a secure connection between the Next.js application and the Supabase PostgreSQL instance via Prisma ORM.

#### Scenario: Connection Verification
- **WHEN** running a database health check script or Prisma Studio
- **THEN** the system successfully connects to the Supabase instance without authentication errors.

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
