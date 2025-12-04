-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on completed for faster filtering
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Sample data
INSERT INTO todos (title, completed) VALUES
  ('Buy groceries', false),
  ('Finish project documentation', true),
  ('Call the dentist', false),
  ('Review pull requests', false);
