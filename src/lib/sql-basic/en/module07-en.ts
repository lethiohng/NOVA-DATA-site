import type { BasicLessonEnText } from "../types";

/* English text for SQL Basic module 7 (lessons 29–32). */

export const module07En: Record<string, BasicLessonEnText> = {
  "29": {
    title: "Arithmetic operators: +, -, *, /, %",
    objectives: [
      "Use + - * / % to calculate on numeric columns in SELECT.",
      "Know that dividing two integers always gives an integer result.",
      "Give calculated columns an alias so the result is easy to read.",
    ],
    prerequisites: "You have completed SELECT, column selection and aliases (module 1).",
    explanation: [
      "You can write arithmetic directly in SELECT: + adds, - subtracts, * multiplies, / divides, and % returns the remainder. The result is a new column; the original table does not change.",
      "Important: if both operands are integers, PostgreSQL performs integer division. For example, 7 / 2 gives 3, not 3.5. To get decimals, use 7.0 / 2 or cast to a numeric type.",
      "You can mix columns and numbers in one calculation, for example good_qty * 100.0 / total_qty to get a percentage.",
    ],
    factory: "Management wants to know how many good products each production record contains, and converts quantities to rates to compare shifts.",
    practice: [
      { question: "Get record_id, good_qty, ng_qty and total_qty_check = good_qty + ng_qty for the first 5 records by record_id.", hint: "Add two columns in SELECT and give the sum the alias total_qty_check." },
      { question: "Get product_code, standard_cycle_sec and uph_by_cycle = 3600 / standard_cycle_sec (rounded to 1 decimal place), sorted by product_code.", hint: "Use ROUND(3600 / standard_cycle_sec, 1). standard_cycle_sec is a decimal number, so the division has a fractional part." },
      { question: "Get the record_id of production records whose total_qty is divisible by 10, first 5 rows by record_id.", hint: "Use the % operator to get the remainder; the condition is total_qty % 10 = 0." },
    ],
    mistakes: [
      "Dividing two integers and being surprised that the result has no decimals. For example, 7 / 2 gives 3. Use 7.0 / 2 to get 3.5.",
      "Forgetting the alias, so the column name is a long expression that is hard to read in a report.",
    ],
    summary: [
      "+, -, *, / and % calculate on columns and numbers in SELECT.",
      "Dividing two integers gives an integer. Use a decimal number such as 7.0 when you need the fraction.",
      "Give calculated columns an alias to make reports readable.",
    ],
    next: "Lesson 30 handles NULL values with IS NULL and IS NOT NULL.",
  },
  "30": {
    title: "IS NULL and IS NOT NULL: checking for missing values",
    objectives: [
      "Use IS NULL to find rows with missing values.",
      "Use IS NOT NULL to exclude rows with missing values.",
      "Understand why = NULL does not give the right result.",
    ],
    prerequisites: "You have completed empty strings and NULL (lessons 7 and 8) and WHERE (lesson 11).",
    explanation: [
      "NULL means there is no value. It is not the number 0 or an empty string. To check for NULL, use IS NULL. To check that a value exists, use IS NOT NULL.",
      "Do not write = NULL or <> NULL. In SQL, every comparison with NULL gives an undefined result, so the statement returns no rows as you might expect.",
      "An empty string '' is a real value, different from NULL. A row with location = '' is not found by IS NULL.",
    ],
    factory: "Maintenance needs the list of production orders that are still running, that is, have no end_time, to track progress during the day.",
    practice: [
      { question: "Get order_code and start_time of production orders that have no end_time, sorted by order_code.", hint: "The condition is end_time IS NULL; do not write = NULL." },
      { question: "Get full_name and role of employees who have not been assigned a shift (shift_id IS NULL), sorted by full_name.", hint: "Use WHERE shift_id IS NULL." },
      { question: "Count the production orders that have an end_time. Give the result the alias finished_orders.", hint: "Use IS NOT NULL and COUNT(*)." },
    ],
    mistakes: [
      "Writing WHERE end_time = NULL. This condition returns no rows; use IS NULL.",
      "Confusing an empty string with NULL. A row with location = '' is not treated as missing by IS NULL.",
    ],
    summary: [
      "IS NULL finds missing values, IS NOT NULL finds values that exist.",
      "Do not use = NULL or <> NULL.",
      "An empty string '' is different from NULL.",
    ],
    next: "Lesson 31 converts data types with CAST and ::.",
  },
  "31": {
    title: "Type casting: CAST and ::",
    objectives: [
      "Change a data type with CAST(value AS type) and with value::type.",
      "Get the date part from a timestamp column.",
      "Know when a cast is needed before calculating or comparing.",
    ],
    prerequisites: "You have completed SELECT, WHERE and aggregate functions (modules 1, 2 and 3).",
    explanation: [
      "Casting changes a value from one type to another. There are two equivalent ways to write it: CAST(value AS type) and value::type. Both give the same result.",
      "Casting is often needed to compare a string with a number, to get the date from a timestamp, or to convert a result to a decimal number for a more accurate rate.",
      "record_time has the timestamp type, which contains both date and time. Cast it to date (record_time::date) to keep only the date when counting or grouping by day.",
    ],
    factory: "A report exported to a file needs dates as text, and the team needs to count the number of days with production data rather than the number of records.",
    practice: [
      { question: "Get full_name and hire_date converted to text with the alias hire_date_text, for the first 5 employees by employee_id. Use CAST.", hint: "CAST(hire_date AS VARCHAR) AS hire_date_text." },
      { question: "Calculate the total good_qty of production_records and convert the result to numeric with ::numeric. Give it the alias total_good.", hint: "SUM(good_qty)::numeric AS total_good." },
      { question: "Count the number of different days with data in production_records, based on the date part of record_time. Give it the alias days_with_data.", hint: "Cast record_time to date, then use COUNT(DISTINCT ...)." },
    ],
    mistakes: [
      "Casting incorrectly and losing data, for example casting a decimal number to an integer and losing the fraction.",
      "Forgetting to cast when comparing a date column with a string, which gives unexpected results.",
    ],
    summary: [
      "CAST(value AS type) and value::type give the same result.",
      "Use record_time::date to get the date part.",
      "Cast before calculating when you need to keep the fraction.",
    ],
    next: "Lesson 32 joins strings and handles values with ||, CONCAT and COALESCE.",
  },
  "32": {
    title: "String concatenation and values: ||, CONCAT, COALESCE",
    objectives: [
      "Join several columns and strings with the || operator or the CONCAT function.",
      "Replace NULL with another value using COALESCE.",
      "Know that CONCAT ignores NULL, while || returns NULL if either side is NULL.",
    ],
    prerequisites: "You have completed SELECT, aliases (module 1) and IS NULL (lesson 30).",
    explanation: [
      "The || operator joins strings. For example, 'Code: ' || line_code creates a new string for each row.",
      "CONCAT(a, b, ...) also joins strings. The important difference: CONCAT treats NULL as an empty string, while || returns NULL if one side is NULL.",
      "COALESCE(a, b, ...) returns the first value that is not NULL. Use COALESCE(location, 'Unknown') to show text instead of an empty cell in reports.",
    ],
    factory: "The management report needs one full description for each production line, and must not show empty cells when the location information is missing.",
    practice: [
      { question: "Get line_code and full_name = line_code || ' - ' || line_name for the production lines, sorted by line_code.", hint: "Use the || operator with the string ' - ' in the middle." },
      { question: "Get line_code and location_display, where location_display is location but shows 'Unknown' when location is NULL. Sort by line_code.", hint: "Use COALESCE(location, 'Unknown')." },
      { question: "Get machine_code and label = CONCAT(machine_code, ' (', machine_type, ')') for the first 5 machines by machine_id.", hint: "CONCAT takes several arguments; the strings ' (' and ')' are separate arguments." },
    ],
    mistakes: [
      "Joining with || a column that can be NULL and being surprised that the result is NULL. Use COALESCE before joining.",
      "Forgetting the single quotes around a fixed string, for example writing - instead of ' - ', so PostgreSQL treats it as a column name.",
    ],
    summary: [
      "|| joins strings and returns NULL if one side is NULL.",
      "CONCAT treats NULL as an empty string.",
      "COALESCE replaces NULL with a default value.",
    ],
    next: "Module 7 is complete. Next is SQL Intermediate, with joins and subqueries.",
  },
};
