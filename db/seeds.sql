INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 200000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Finance Lead", 100000, 3),
    ("Accountant", 80000, 3),
    ("Salesperson", 60000, 2),
    ("Lawyer", 230000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Gino', 'Maglaque', 2, NULL),
  ('Kelsey', 'Pesi', 1, NULL),
  ('John', 'Jones', 4, NULL),
  ('Charles', 'Oakley', 7, NULL),
  ('Michael', 'Fin', 3, 1),
  ('Dora', 'Baskin', 6, 2),
  ('Edward', 'Diaz', 5, 3),
  ('Ray', 'Summers', 3, 1),
  ('Cooper', 'Brown', 6, 2),
  ('Steve', 'Mason', 5, 3);