INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Maintence");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Manager", 200000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Test Engineer", 100000, 2),
    ("Janitor", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 1, NULL),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, 2),
  ('Katherine', 'Mansfield', 4, 2),
  ('Dora', 'Carrington', 2, 1),
  ('Edward', 'Bellamy', 3, 2),
  ('Montague', 'Summers', 4, 1),
  ('Octavia', 'Butler', 5, 2),
  ('Unica', 'Zurn', 5, 1);