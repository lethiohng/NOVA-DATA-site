import type { BasicLessonEnText } from "../types";

/* English text for SQL Basic module 6 (lessons 19–28). */

export const module06En: Record<string, BasicLessonEnText> = {
  "19": {
    title: "What are aggregate functions?",
    objectives: [
      "Understand that an aggregate function combines many rows into one value.",
      "Name the main aggregate functions: COUNT, SUM, AVG, MIN, MAX.",
      "Write a simple aggregate query.",
    ],
    prerequisites: "You have completed SELECT and WHERE (modules 1 and 2).",
    explanation: [
      "An aggregate function takes many rows and returns one value. For example, counting records or calculating a total quantity.",
      "The main functions are: COUNT counts rows, SUM adds values, AVG calculates the average, and MIN and MAX find the smallest and largest values.",
      "You can combine them with WHERE to aggregate part of the data, for example the total quantity of one machine type.",
    ],
    factory: "The production director wants to know how many machines the plant has in total, without looking at each machine one by one.",
    practice: [
      { question: "Count the number of production lines in the production_lines table.", hint: "Use SELECT COUNT(*) FROM table_name." },
      { question: "Count the products whose standard_cycle_sec is greater than 50.", hint: "Add WHERE before counting." },
    ],
    mistakes: [
      "Writing SELECT machine_code, COUNT(*) FROM machines without GROUP BY. This gives an error because a plain column cannot appear alongside an aggregate function (see lesson 25).",
      "Confusing COUNT with SUM: COUNT counts rows, SUM adds values.",
    ],
    summary: [
      "An aggregate function combines many rows into one value.",
      "COUNT, SUM, AVG, MIN and MAX are the basic functions.",
      "You can combine them with WHERE.",
    ],
    next: "Lesson 20 counts rows with COUNT.",
  },
  "20": {
    title: "COUNT: counting rows",
    objectives: [
      "Use COUNT(*) to count rows.",
      "Give the count result an alias.",
      "Count with a condition using WHERE.",
    ],
    prerequisites: "You have completed aggregate functions (lesson 19).",
    explanation: [
      "COUNT(*) counts all rows, including rows with NULL values. This is the most common way to count records.",
      "Put an alias after the result so the column name is easy to read, for example AS record_count.",
      "Combine it with WHERE to count under a condition, for example the number of employees whose role is Operator.",
    ],
    factory: "Management wants to know how many times production output has been recorded in the system, to check that the data is complete.",
    practice: [
      { question: "Count the employees whose role is 'Operator'.", hint: "Use COUNT(*) with WHERE role = 'Operator'." },
      { question: "Count the production orders whose status is 'Completed', with the alias completed_orders.", hint: "Add AS after COUNT(*)." },
    ],
    mistakes: [
      "Using COUNT(*) when you only want to count non-NULL values of one column. See lesson 21.",
      "Forgetting WHERE, so the whole table is counted instead of the part you need.",
    ],
    summary: [
      "COUNT(*) counts rows.",
      "Use an alias to make the result name clear.",
      "Combine with WHERE to count under a condition.",
    ],
    next: "Lesson 21 distinguishes COUNT(column) from COUNT(DISTINCT column).",
  },
  "21": {
    title: "COUNT(column) and COUNT(DISTINCT): counting non-NULL and unique values",
    objectives: [
      "Tell COUNT(*), COUNT(column) and COUNT(DISTINCT column) apart.",
      "Understand that COUNT(column) skips NULL rows.",
      "Use COUNT(DISTINCT) to count unique values.",
    ],
    prerequisites: "You have completed COUNT(*) (lesson 20) and NULL (lesson 7).",
    explanation: [
      "COUNT(column) counts only the rows that have a non-NULL value in that column. COUNT(*) counts every row.",
      "COUNT(DISTINCT column) counts the number of different values, ignoring duplicates and NULL.",
      "For example, the employees table has 12 people with no shift (shift_id NULL). COUNT(*) counts every employee, while COUNT(shift_id) counts only those who have a shift.",
    ],
    factory: "An engineer wants to know how many machines actually have production data, without counting machines repeated in the log.",
    practice: [
      { question: "Count the number of different machine_type values in the machines table.", hint: "Use COUNT(DISTINCT machine_type)." },
      { question: "Count the employees who have a shift (shift_id is not NULL) in the employees table.", hint: "Use COUNT(shift_id), because COUNT on a column skips NULL." },
    ],
    mistakes: [
      "Thinking COUNT(column) also counts NULL, so the numbers differ from COUNT(*).",
      "Using COUNT(DISTINCT) when you need the total number of rows. These two are different.",
    ],
    summary: [
      "COUNT(*) counts every row.",
      "COUNT(column) skips NULL.",
      "COUNT(DISTINCT column) counts unique values.",
    ],
    next: "Lesson 22 adds values with SUM.",
  },
  "22": {
    title: "SUM: adding up values",
    objectives: [
      "Use SUM to add the numeric values in a column.",
      "Understand that SUM skips NULL.",
      "Calculate a conditional sum with WHERE.",
    ],
    prerequisites: "You have completed aggregate functions and WHERE (lessons 19 and 10).",
    explanation: [
      "SUM(column) adds all the numeric values in a column. NULL rows are skipped when adding.",
      "In production, SUM is used to total good output, total scrap, and total planned quantity.",
      "Use SUM only on numeric columns. SUM on a text column causes an error.",
    ],
    factory: "The director wants to know the total number of good products manufactured up to today.",
    practice: [
      { question: "Calculate the total of total_qty in the production_records table.", hint: "Use SUM(total_qty)." },
      { question: "Calculate the total of ng_qty (defective products) in production_records, with the alias total_defects.", hint: "Add AS total_defects after SUM(ng_qty)." },
    ],
    mistakes: [
      "Using SUM on a text column such as full_name, which causes a data type error.",
      "Forgetting WHERE, so the total includes data you do not need.",
    ],
    summary: [
      "SUM adds numeric values.",
      "NULL values are skipped.",
      "Combine with WHERE to total under a condition.",
    ],
    next: "Lesson 23 calculates an average with AVG.",
  },
  "23": {
    title: "AVG: calculating the average",
    objectives: [
      "Use AVG to calculate the average of a numeric column.",
      "Round the result with ROUND.",
      "Understand that AVG skips NULL.",
    ],
    prerequisites: "You have completed SUM (lesson 22).",
    explanation: [
      "AVG(column) calculates the mean of the non-NULL values in a column.",
      "AVG results often have many decimal places. Use ROUND(value, number_of_digits) to round, for example ROUND(AVG(good_qty), 2).",
      "An average does not always reflect reality if there are unusual values. Check it together with MIN and MAX.",
    ],
    factory: "An engineer wants to compare the average machining cycle time across products to estimate productivity.",
    practice: [
      { question: "Calculate the average good_qty of production_records, rounded to 2 decimal places.", hint: "Use ROUND(AVG(good_qty), 2)." },
      { question: "Calculate the average planned_qty of orders whose status is 'Running', rounded to 2 decimal places.", hint: "Add WHERE status = 'Running' before calculating AVG." },
    ],
    mistakes: [
      "Thinking AVG counts every row including NULL. In fact NULL is skipped, so the average can differ from what you expect.",
      "Forgetting to round, so the result has too many digits.",
    ],
    summary: [
      "AVG calculates the mean.",
      "Use ROUND to round the result.",
      "NULL is skipped in the calculation.",
    ],
    next: "Lesson 24 finds the smallest and largest values with MIN and MAX.",
  },
  "24": {
    title: "MIN and MAX: smallest and largest values",
    objectives: [
      "Use MIN and MAX with numbers, dates and strings.",
      "Combine MIN and MAX in one statement.",
      "Use MIN and MAX with a WHERE condition.",
    ],
    prerequisites: "You have completed aggregate functions and WHERE (lessons 19 and 10).",
    explanation: [
      "MIN(column) returns the smallest value and MAX(column) returns the largest. They work with numbers, dates and strings (strings in alphabetical order).",
      "You can put MIN and MAX in the same SELECT to see the range of values in a column.",
      "In production, MIN and MAX help detect unusual data, for example quantities that are too small or record dates that are too far away.",
    ],
    factory: "The HR department wants to know the range of hire dates to produce a seniority report.",
    practice: [
      { question: "Find the smallest and largest planned_qty values in the production_orders table.", hint: "Write MIN(planned_qty) and MAX(planned_qty) in the same SELECT." },
      { question: "Find the earliest hire date of employees whose role is 'Engineer'.", hint: "Use MIN(hire_date) with WHERE role = 'Engineer'." },
    ],
    mistakes: [
      "Mixing up MIN and MAX when reading the result, which leads to wrong conclusions.",
      "Using MIN or MAX on a column with NULL values without realizing that NULL was skipped.",
    ],
    summary: [
      "MIN gives the smallest value, MAX gives the largest.",
      "They work with numbers, dates and strings.",
      "Combine with WHERE to filter before searching.",
    ],
    next: "Lesson 25 splits data into groups with GROUP BY.",
  },
  "25": {
    title: "GROUP BY: aggregating by group",
    objectives: [
      "Use GROUP BY to calculate aggregate functions for each group.",
      "Understand that a column in SELECT must be in GROUP BY if it is not inside an aggregate function.",
      "Read results group by group.",
    ],
    prerequisites: "You have completed the aggregate functions COUNT, SUM and AVG (lessons 20 to 22).",
    explanation: [
      "GROUP BY gathers rows with the same value in one column into a group, then the aggregate function is calculated for each group.",
      "Every column in SELECT that is not inside an aggregate function must appear in GROUP BY.",
      "For example, counting production orders by status shows how many orders are running and how many are completed.",
    ],
    factory: "Production management wants to know how many orders are running and how many are completed, to track progress.",
    practice: [
      { question: "Count the production_records by machine_id.", hint: "SELECT machine_id, COUNT(*) ... GROUP BY machine_id." },
      { question: "Calculate the total good_qty by machine_id in production_records, with the alias total_good.", hint: "Use SUM(good_qty) and GROUP BY machine_id." },
    ],
    mistakes: [
      "Selecting a column that is neither in GROUP BY nor inside an aggregate function, which causes an error.",
      "Forgetting GROUP BY, so the result has one total row instead of one row per group.",
    ],
    summary: [
      "GROUP BY gathers rows into groups.",
      "Aggregate functions are calculated for each group.",
      "Columns that are not aggregated must be in GROUP BY.",
    ],
    next: "Lesson 26 filters groups with HAVING.",
  },
  "26": {
    title: "HAVING: filtering groups after aggregation",
    objectives: [
      "Tell WHERE (filters rows) apart from HAVING (filters groups).",
      "Use HAVING with aggregate functions.",
      "Write a statement that uses WHERE, GROUP BY and HAVING together.",
    ],
    prerequisites: "You have completed GROUP BY (lesson 25).",
    explanation: [
      "WHERE filters rows before they are grouped. HAVING filters groups after the aggregate functions have been calculated.",
      "Because HAVING works on groups, its condition usually contains an aggregate function, for example HAVING COUNT(*) > 10.",
      "The order of clauses is: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.",
    ],
    factory: "Management only wants to see the machine groups with a large enough total output to include in the highlights report.",
    practice: [
      { question: "List the product_family values that have more than one product: show product_family and the number of products (alias product_count).", hint: "GROUP BY product_family, HAVING COUNT(*) > 1." },
      { question: "List the machine_id values whose total total_qty is greater than 50000 in production_records.", hint: "Use HAVING SUM(total_qty) > 50000 after GROUP BY machine_id." },
    ],
    mistakes: [
      "Writing WHERE COUNT(*) > 10. WHERE cannot use aggregate functions; use HAVING instead.",
      "Putting HAVING before GROUP BY, which causes an error.",
    ],
    summary: [
      "WHERE filters rows, HAVING filters groups.",
      "HAVING usually contains aggregate functions.",
      "The order is WHERE, GROUP BY, HAVING.",
    ],
    next: "Lesson 27 combines several aggregate functions in one statement.",
  },
  "27": {
    title: "Several aggregate functions in one statement",
    objectives: [
      "Combine COUNT, SUM, AVG, MIN and MAX in the same SELECT.",
      "Give each indicator a clear alias.",
      "Read a summary table and draw conclusions from it.",
    ],
    prerequisites: "You have completed GROUP BY and HAVING (lessons 25 and 26).",
    explanation: [
      "A single SELECT can contain several aggregate functions at once, so one report table has several indicators for each group.",
      "Give each column an alias to make the report easy to read. Check each indicator to make sure it means what you intend; for example, AVG and SUM may not mean the same thing.",
      "Add ORDER BY to sort the groups by the most important indicator.",
    ],
    factory: "The planning manager needs a summary table to compare order sizes across production lines.",
    practice: [
      { question: "By the role of employees: count the people and find the earliest hire date (alias earliest_hire).", hint: "GROUP BY role; use COUNT(*) and MIN(hire_date)." },
      { question: "By product_id in production_orders: count the orders and total planned_qty, keeping only groups whose total is greater than 10000.", hint: "Add HAVING SUM(planned_qty) > 10000 after GROUP BY product_id." },
    ],
    mistakes: [
      "Adding a column that is not in GROUP BY, which causes an error.",
      "Giving an alias the same name as an original column, which makes the result hard to understand.",
    ],
    summary: [
      "You can combine several aggregate functions in one statement.",
      "Give each indicator a clear alias.",
      "Each group is one row in the result.",
    ],
    next: "Lesson 28 is the summary lesson: writing a complete aggregate report.",
  },
  "28": {
    title: "Summary: a complete aggregate report",
    objectives: [
      "Combine WHERE, GROUP BY, HAVING, ORDER BY and LIMIT.",
      "Write a group report with several indicators.",
      "Check whether the result meets the request.",
    ],
    prerequisites: "You have completed all of modules 1, 2 and 3.",
    explanation: [
      "This summary lesson brings together the skills you have learned. The order of clauses is: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.",
      "For a report request, work step by step: decide the groups (GROUP BY), the indicators to calculate (aggregate functions), the group condition (HAVING), the display order (ORDER BY), and the number of rows to return (LIMIT).",
      "After writing the query, check the row count and the values of one group by hand to make sure the query is correct.",
    ],
    factory: "At the weekly production meeting, you need the 5 machines with the highest good output, together with their defect counts for comparison.",
    practice: [
      { question: "Report by machine_id: the number of records (record_count), total good_qty (total_good) and total ng_qty (total_defects), sorted by total_good in descending order.", hint: "GROUP BY machine_id, use COUNT(*), SUM(good_qty), SUM(ng_qty), ORDER BY total_good DESC." },
      { question: "Keep only machines whose total ng_qty is greater than 0 and whose total good_qty is at least 1000, sorted by total_good in descending order, and take the first 5 machines.", hint: "Add HAVING with two conditions joined by AND, then ORDER BY and LIMIT 5." },
    ],
    mistakes: [
      "Using WHERE instead of HAVING when the condition contains an aggregate function.",
      "Forgetting ORDER BY, so the top 5 is not really the top 5 by the criterion.",
    ],
    summary: [
      "Combine WHERE, GROUP BY, HAVING, ORDER BY and LIMIT into a complete report.",
      "Decide the groups, indicators, group condition and display order.",
      "Check the result before trusting it.",
    ],
    next: "SQL Basic is complete. Next is SQL Intermediate, with JOIN and subqueries.",
  },
};
