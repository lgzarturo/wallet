/*
The SQL code creates a schema for a wallet application that includes several tables to manage different aspects of the user's wallet, to-do lists, projects, and tasks.

The auth_user table stores user authentication information, such as the user's ID, email, and encoded password.

The wallet_balance table stores information about the user's wallet balance, including the user ID and the balance amount.

The wallet_movement table tracks wallet movements, including the user ID, movement type (debit or credit), and the amount of the movement.

The wallet_subscription table stores information about user subscriptions, including the user ID, subscription code, and cron expression for when the subscription should be executed.

The wallet_todo table stores information about the user's to-do list, including the user ID, title, description, due date, and completion status.

The wallet_checklist table stores individual checklists associated with a to-do list, including the to-do ID, checklist item, and item completion status.

The checklist_items table stores individual checklist items associated with a user's to-do list, including the user ID, checklist ID, item title, description, and completion status.

The wallet_file table stores files associated with a user's to-do list, including the to-do ID and the file URL or filename.

The wallet_project table stores information about a user's projects, including the user ID, project title, and project description.

The wallet_task table stores information about individual tasks associated with a project, including the project ID, task title, description, status, and due date.

The wallet_kanban_column table stores information about columns in a project's kanban board, including the project ID, column title, and position.

The wallet_kanban_task table stores information about tasks associated with a kanban board column, including the column ID, task ID, and position.

All tables include created_at and updated_at columns with default values set to the current timestamp, which track the creation and update times for each row. Additionally, the tables use foreign keys to maintain relationships between the different tables.

*/



CREATE TABLE auth_user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  encode_password VARCHAR(128) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE wallet_balance (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE wallet_movement (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movement_type ENUM('debit', 'credit') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE wallet_subscription (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  code VARCHAR(20) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  cron VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE wallet_todo (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  todo_description TEXT,
  due_date TIMESTAMP,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE wallet_checklist (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  todo_id INT NOT NULL,
  item VARCHAR(255) NOT NULL,
  is_done BOOLEAN NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (todo_id) REFERENCES wallet_todo(id)
);

CREATE TABLE checklist_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  checklist_id INT NOT NULL,
  item_title VARCHAR(255) NOT NULL,
  item_description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id),
  FOREIGN KEY (checklist_id) REFERENCES wallet_checklist(id)
);

CREATE TABLE wallet_file (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  todo_id INT NOT NULL,
  url_filename VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (todo_id) REFERENCES wallet_todo(id)
);

CREATE TABLE wallet_project (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE wallet_task (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  task_description TEXT,
  task_status ENUM('to do', 'in progress', 'done') NOT NULL DEFAULT 'to do',
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES wallet_project(id)
);

CREATE TABLE wallet_kanban_column (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  position INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES wallet_project(id)
);

CREATE TABLE wallet_kanban_task (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  column_id INT NOT NULL,
  task_id INT NOT NULL,
  position INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (column_id) REFERENCES wallet_kanban_column(id),
  FOREIGN KEY (task_id) REFERENCES wallet_task(id)
);

-- auth_user
INSERT INTO auth_user (id, email, encode_password)
VALUES (1, 'john.doe@example.com', 'mysecretpassword'),
       (2, 'jane.doe@example.com', 'myothersecretpassword');

-- wallet_balance
INSERT INTO wallet_balance (id, user_id, amount)
VALUES (1, 1, 100.00),
       (2, 2, 50.00);

-- wallet_movement
INSERT INTO wallet_movement (id, user_id, movement_type, amount)
VALUES (1, 1, 'credit', 50.00),
       (2, 1, 'debit', 25.00),
       (3, 2, 'credit', 10.00),
       (4, 2, 'debit', 5.00);

-- wallet_subscription
INSERT INTO wallet_subscription (id, user_id, code, amount, cron)
VALUES (1, 1, 'monthly', 80.00, '0 0 1 * *'),
       (2, 2, 'annual', 99.99, '0 0 1 1 *');

-- wallet_todo
INSERT INTO wallet_todo (id, user_id, title, todo_description, due_date, completed)
VALUES (1, 1, 'Grocery shopping', 'Buy milk, eggs, and bread', '2023-02-20', false),
       (2, 1, 'Pick up dry cleaning', 'From the dry cleaners on Elm Street', '2023-02-22', false),
       (3, 2, 'Call mom', 'To wish her happy birthday', '2023-03-01', false);

-- wallet_checklist
INSERT INTO wallet_checklist (id, todo_id, item, is_done)
VALUES (1, 1, 'Buy milk', false),
       (2, 1, 'Buy eggs', false),
       (3, 1, 'Buy bread', true);

-- checklist_items
INSERT INTO checklist_items (id, user_id, checklist_id, item_title, item_description, completed)
VALUES (1, 1, 1, 'Buy milk', 'Get 2% milk from the store', false),
       (2, 1, 1, 'Buy eggs', 'Get a dozen large eggs', false),
       (3, 1, 1, 'Buy bread', 'Get a loaf of sourdough bread', true);

-- wallet_file
INSERT INTO wallet_file (id, todo_id, url_filename)
VALUES (1, 1, 'https://example.com/shopping_list.pdf');

-- wallet_project
INSERT INTO wallet_project (id, user_id, project_title, project_description)
VALUES (1, 1, 'Build a treehouse', 'Build a treehouse in the backyard'),
       (2, 2, 'Plan a trip', 'Plan a trip to Europe'),
       (3, 1, 'Plan a transportation', 'Turistic transportation');

-- wallet_task
INSERT INTO wallet_task (id, project_id, title, task_description, task_status, due_date)
VALUES (1, 1, 'Draw plans for treehouse', 'Sketch out the plans for the treehouse', 'to do', '2023-02-21'),
       (2, 1, 'Buy materials', 'Purchase the lumber and other materials', 'to do', '2023-02-24'),
       (3, 2, 'Book flights', 'Book flights to Paris', 'in progress', '2023-03-01'),
       (4, 2, 'Find hotel', 'Research and book a hotel in Paris', 'to do', '2023-04-10'),
       (5, 3, 'Find car', 'Hotel to Airport in Paris', 'to do', '2023-06-20');

-- Insert fake data into wallet_kanban_column table
INSERT INTO wallet_kanban_column (id, project_id, title, position, created_at, updated_at) VALUES
(1, 1, 'To Do', 1, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(2, 1, 'In Progress', 2, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(3, 1, 'Done', 3, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(4, 2, 'To Do', 1, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(5, 2, 'In Progress', 2, '2023-02-19 10:00:00', '2023-02-19 10:00:00');

-- Insert fake data into wallet_kanban_task table
INSERT INTO wallet_kanban_task (id, column_id, task_id, position, created_at, updated_at) VALUES
(1, 1, 1, 1, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(2, 1, 2, 2, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(3, 1, 3, 3, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(4, 2, 4, 1, '2023-02-19 10:00:00', '2023-02-19 10:00:00'),
(5, 2, 5, 2, '2023-02-19 10:00:00', '2023-02-19 10:00:00');
