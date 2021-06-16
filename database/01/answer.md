
```sql
SELECT salary.employee_id, salary.position, salary.salary
FROM
  salary,
  (SELECT position, AVG(salary) AS salary_avg FROM salary GROUP BY position) AS salary_avg
WHERE
  salary.position = salary_avg.position AND
  salary.salary >= salary_avg.salary_avg;
```

Multiple tables query equal to `inner join` query.

```sql
SELECT salary.employee_id, salary.position, salary.salary
FROM
  salary
INNER JOIN
  (SELECT position, AVG(salary) AS salary_avg FROM salary GROUP BY position) AS salary_avg
ON
  salary.position = salary_avg.position 
WHERE
  salary.salary >= salary_avg.salary_avg;
```
