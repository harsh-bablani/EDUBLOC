/*
  # Initial Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `avatar_url` (text, nullable)
      - `bio` (text, nullable)
      - `created_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `difficulty` (text)
      - `duration` (integer)
      - `created_at` (timestamp)
    
    - `course_modules`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `title` (text)
      - `content` (text)
      - `order` (integer)
      - `created_at` (timestamp)
    
    - `course_topics`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `topic` (text)
    
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key)
      - `module_id` (uuid, foreign key)
      - `completed_at` (timestamp)
      - `created_at` (timestamp)
    
    - `credentials`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `issuer` (text)
      - `description` (text)
      - `issue_date` (timestamp)
      - `expiry_date` (timestamp, nullable)
      - `verification_hash` (text)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `credential_skills`
      - `id` (uuid, primary key)
      - `credential_id` (uuid, foreign key)
      - `skill` (text)
    
    - `tutor_conversations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key, nullable)
      - `module_id` (uuid, foreign key, nullable)
      - `created_at` (timestamp)
    
    - `tutor_messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key)
      - `content` (text)
      - `sender` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  difficulty text NOT NULL,
  duration integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Course modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Course topics table
CREATE TABLE IF NOT EXISTS course_topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  topic text NOT NULL
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  module_id uuid REFERENCES course_modules(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Credentials table
CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  issuer text NOT NULL,
  description text NOT NULL,
  issue_date timestamptz NOT NULL,
  expiry_date timestamptz,
  verification_hash text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Credential skills table
CREATE TABLE IF NOT EXISTS credential_skills (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  credential_id uuid REFERENCES credentials(id) ON DELETE CASCADE,
  skill text NOT NULL
);

-- Tutor conversations table
CREATE TABLE IF NOT EXISTS tutor_conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  module_id uuid REFERENCES course_modules(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Tutor messages table
CREATE TABLE IF NOT EXISTS tutor_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid REFERENCES tutor_conversations(id) ON DELETE CASCADE,
  content text NOT NULL,
  sender text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Anyone can read courses and modules
CREATE POLICY "Anyone can read courses" ON courses
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read course modules" ON course_modules
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read course topics" ON course_topics
  FOR SELECT TO anon, authenticated
  USING (true);

-- Users can read and create their own progress
CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress" ON user_progress
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read and manage their own credentials
CREATE POLICY "Users can read own credentials" ON credentials
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own credentials" ON credentials
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- Users can read and manage their own credential skills
CREATE POLICY "Users can read own credential skills" ON credential_skills
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM credentials 
    WHERE credentials.id = credential_id 
    AND credentials.user_id = auth.uid()
  ));

-- Users can manage their own conversations and messages
CREATE POLICY "Users can read own conversations" ON tutor_conversations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations" ON tutor_conversations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own messages" ON tutor_messages
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM tutor_conversations 
    WHERE tutor_conversations.id = conversation_id 
    AND tutor_conversations.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own messages" ON tutor_messages
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM tutor_conversations 
    WHERE tutor_conversations.id = conversation_id 
    AND tutor_conversations.user_id = auth.uid()
  ));