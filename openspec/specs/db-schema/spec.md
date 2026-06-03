## ADDED Requirements

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
