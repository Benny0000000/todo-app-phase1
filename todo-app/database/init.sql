
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (title, description) VALUES
('Buy milk', 'Buy fresh milk from the store'),
('Study Node.js', 'Read NestJS documentation'),
('Exercise', 'Run 5 kilometers in the evening');

SELECT * FROM todos;