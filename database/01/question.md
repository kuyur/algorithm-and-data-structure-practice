There is a `salary` table.

Sample data:
```
+-------------+------------+--------+
| employee_id | position   | salary |
+-------------+------------+--------+
|           1 | C++        |   9000 |
|           2 | C++        |  10000 |
|           3 | Python     |  12000 |
|           4 | Python     |  11000 |
|           5 | Python     |   7000 |
|           6 | Java       |   8000 |
|           7 | JavaScript |   8500 |
+-------------+------------+--------+
```

SQL of creating the table and inserting sample data:
```sql
CREATE TABLE salary (employee_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, position VARCHAR(20), salary INT);

INSERT INTO salary (position, salary) VALUES ('C++', 9000);
INSERT INTO salary (position, salary) VALUES ('C++', 10000);
INSERT INTO salary (position, salary) VALUES ('Python', 12000);
INSERT INTO salary (position, salary) VALUES ('Python', 11000);
INSERT INTO salary (position, salary) VALUES ('Python', 7000);
INSERT INTO salary (position, salary) VALUES ('Java', 8000);
INSERT INTO salary (position, salary) VALUES ('JavaScript', 8500);
```

Question:

Write a SQL SELECT query to find out the employee whose salary is higher (including equal case) than the average salary of his position.

Sample output:
```
+-------------+------------+--------+
| employee_id | position   | salary |
+-------------+------------+--------+
|           2 | C++        |  10000 |
|           3 | Python     |  12000 |
|           4 | Python     |  11000 |
|           6 | Java       |   8000 |
|           7 | JavaScript |   8500 |
+-------------+------------+--------+
```
