-- Enable uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop the old tasks table if it exists
DROP TABLE IF EXISTS tasks;

-- Create the new tasks table with UUID primary key
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE
); 