import type { BasicLessonEnText } from "../types";

/* English text for SQL Basic module 5 (lessons 11–18). */

export const module05En: Record<string, BasicLessonEnText> = {
  "11": {
    title: "WHERE: filtering rows by a condition",
    objectives: [
      "Use WHERE to return only the rows that meet a condition.",
      "Write conditions with numbers, strings and dates.",
      "Remember that strings must be in single quotes.",
    ],
    prerequisites: "You have completed SELECT, column selection and NULL (module 1).",
    explanation: [
      "WHERE comes after FROM and keeps only the rows where the condition is true. Rows that do not meet the condition are skipped.",
      "Write numbers directly, for example 100. String and date values must be in single quotes, for example 'Press'. Do not use double quotes for string values.",
      "Data types matter: comparing the string '100' with the number 100 can give different results. Choose the right type for the column when writing the condition.",
    ],
    factory: "Maintenance wants to schedule separate inspections for the Press machines.",
    practice: [
      { question: "Get product_code and product_name of products whose product_family is 'Motor Bracket'.", hint: "Write WHERE product_family = 'Motor Bracket' after the table name." },
      { question: "Get full_name of employees whose role is 'Supervisor'.", hint: "The condition is role = 'Supervisor'; remember the single quotes." },
    ],
    mistakes: [
      "Using double quotes for a string value: WHERE role = \"Supervisor\". In PostgreSQL, double quotes refer to a column name, so the statement will report an error.",
      "Writing WHERE after ORDER BY. The correct order is WHERE before ORDER BY.",
    ],
    summary: [
      "WHERE filters rows by a condition.",
      "Strings go in single quotes.",
      "WHERE comes after FROM.",
    ],
    next: "Lesson 12 uses comparison operators such as >, < and = in WHERE.",
  },
  "12": {
    title: "Comparison operators: =, <>, <, >, <=, >=",
    objectives: [
      "Use comparison operators in a condition.",
      "Tell <> (not equal) apart from =.",
      "Compare quantities and cycle times.",
    ],
    prerequisites: "You have completed WHERE (lesson 11).",
    explanation: [
      "The operators are: = (equal), <> (not equal; != also works), < (less than), > (greater than), <= (less than or equal) and >= (greater than or equal).",
      "These operators work with numbers, strings and dates. Strings are compared in alphabetical order.",
      "In production, common conditions are quantities above a threshold (>), cycle times that miss the target (>) or small orders (<=).",
    ],
    factory: "A process engineer wants to find products with long machining cycles to consider optimization.",
    practice: [
      { question: "Get order_code and planned_qty of production orders (production_orders) whose planned_qty is greater than 3500.", hint: "Use WHERE planned_qty > 3500." },
      { question: "Get product_code and standard_cycle_sec of products whose standard_cycle_sec is less than 45.", hint: "Use the < operator with the standard_cycle_sec column." },
    ],
    mistakes: [
      "Using = when you need not-equal, for example WHERE role = 'Operator' instead of <> 'Operator'.",
      "Confusing >= with >, which drops rows whose value equals the threshold.",
    ],
    summary: [
      "Use =, <>, <, >, <=, >= to compare.",
      "<> means not equal.",
      ">= and <= include the threshold value.",
    ],
    next: "Lesson 13 combines several conditions with AND, OR and NOT.",
  },
  "13": {
    title: "Combining conditions: AND, OR, NOT",
    objectives: [
      "Use AND when both conditions must be true.",
      "Use OR when only one condition needs to be true.",
      "Use NOT to negate a condition and control the order with parentheses.",
    ],
    prerequisites: "You have completed WHERE and comparison operators (lessons 11 and 12).",
    explanation: [
      "AND requires every condition to be true. OR needs only one condition to be true. NOT reverses the condition that follows it.",
      "AND has higher precedence than OR. When you mix them, use parentheses () to group conditions and avoid wrong results.",
      "For example, (role = 'Operator' OR role = 'Inspector') AND shift_id = 1 is different from role = 'Operator' OR (role = 'Inspector' AND shift_id = 1).",
    ],
    factory: "The HR department needs a list of quality inspectors or engineers to assign to handle breakdowns.",
    practice: [
      { question: "Get full_name and role of employees whose role is 'Inspector' or 'Engineer'.", hint: "Join two comparison conditions with OR." },
      { question: "Get full_name and role of employees who are not Operators and have not been assigned a shift (shift_id is NULL).", hint: "Use NOT with role = 'Operator' and IS NULL with shift_id, joined by AND." },
    ],
    mistakes: [
      "Forgetting parentheses when mixing AND and OR, which gives a result different from what you intended.",
      "Using AND for two different values of the same column, for example role = 'A' AND role = 'B'. This returns no rows.",
    ],
    summary: [
      "AND: both are true; OR: one of them is true.",
      "NOT reverses a condition.",
      "Use parentheses to control the order.",
    ],
    next: "Lesson 14 filters by a list of values with IN.",
  },
  "14": {
    title: "IN and NOT IN: filtering by a list of values",
    objectives: [
      "Use IN instead of several OR conditions on the same column.",
      "Use NOT IN to exclude a list.",
      "Be careful when the list contains NULL.",
    ],
    prerequisites: "You have completed AND and OR (lesson 13).",
    explanation: [
      "IN checks whether a value is in a list. It is much shorter than chaining several OR conditions.",
      "NOT IN excludes the values in the list. Note: if the list contains NULL, NOT IN may return no rows, so avoid putting NULL in the list.",
      "The list in IN goes in parentheses, with values separated by commas.",
    ],
    factory: "A shift supervisor manages only lines A and B and needs a list of CNC or Press machines for the weekly check.",
    practice: [
      { question: "Get machine_code and machine_type of machines whose machine_type is 'CNC' or 'Press'.", hint: "Use IN with the list ('CNC', 'Press')." },
      { question: "Get full_name and role of employees whose role is not in ('Operator', 'Inspector').", hint: "Use NOT IN." },
    ],
    mistakes: [
      "Putting strings in IN in double quotes instead of single quotes.",
      "Forgetting the parentheses around the list after IN.",
    ],
    summary: [
      "IN filters by a list of values.",
      "NOT IN excludes a list.",
      "The list goes inside parentheses.",
    ],
    next: "Lesson 15 filters by a range of values with BETWEEN.",
  },
  "15": {
    title: "BETWEEN: filtering by a range of values",
    objectives: [
      "Use BETWEEN to get values within a range.",
      "Understand that BETWEEN includes both endpoints.",
      "Apply BETWEEN to quantities and dates.",
    ],
    prerequisites: "You have completed WHERE and comparisons (lessons 11 and 12).",
    explanation: [
      "BETWEEN a AND b returns values from a to b, including both a and b. It is equivalent to column >= a AND column <= b.",
      "BETWEEN works with numbers, dates and strings. For dates, write the date in single quotes, for example '2026-01-01'.",
      "In production reports, BETWEEN is often used to get orders within a quantity range or a time period.",
    ],
    factory: "Production planning wants to see medium-sized orders, with planned quantities in a certain range, to allocate machines.",
    practice: [
      { question: "Get product_code and standard_cycle_sec of products whose standard_cycle_sec is between 45 and 55.", hint: "Use BETWEEN 45 AND 55." },
      { question: "Get record_id and total_qty of production_records whose total_qty is between 20 and 40.", hint: "Same structure as the previous question; change the column and table names." },
    ],
    mistakes: [
      "Thinking BETWEEN excludes the endpoints, which drops rows.",
      "Reversing the order: BETWEEN 55 AND 45 returns an empty result.",
    ],
    summary: [
      "BETWEEN filters within a range.",
      "It includes both endpoints.",
      "Put the smaller value first and the larger value second.",
    ],
    next: "Lesson 16 finds text patterns with LIKE and ILIKE.",
  },
  "16": {
    title: "LIKE and ILIKE: finding text by pattern",
    objectives: [
      "Use % to stand for any number of characters and _ for exactly one character.",
      "Tell LIKE (case-sensitive) apart from ILIKE (case-insensitive).",
      "Find text that starts with, ends with or contains a word.",
    ],
    prerequisites: "You have completed WHERE (lesson 11).",
    explanation: [
      "When do you use =? When you know the exact value, for example the product family 'Motor Bracket' or the status 'Completed'. The = comparison gives an exact match, is clear, and is faster on large tables.",
      "When do you use LIKE? When you only remember part of the value, for example a name that starts with 'Motor' or contains 'press'. For example, product_family = 'Motor' matches no rows, but LIKE 'Motor%' matches 'Motor Bracket'.",
      "LIKE searches by pattern. % stands for any string of characters (including an empty one), and _ stands for exactly one character.",
      "'Motor%' finds text starting with Motor; '%press%' finds text containing press anywhere.",
      "LIKE is case-sensitive. ILIKE is the case-insensitive version, a safer choice when searching names.",
    ],
    factory: "Maintenance needs to find all Press machines whose name contains the word Press, without worrying about upper or lower case.",
    practice: [
      { question: "Get machine_code and machine_name of machines whose machine_name contains 'press' (case-insensitive), using ILIKE.", hint: "Use ILIKE '%press%'." },
      { question: "Get full_name of employees whose name starts with 'Inspector'.", hint: "Use LIKE 'Inspector%'." },
    ],
    mistakes: [
      "Using LIKE when you need a case-insensitive search, so rows are missing from the result.",
      "Forgetting the % sign when you want text that contains a word: LIKE 'press' only matches exactly press.",
    ],
    summary: [
      "% stands for many characters, _ for one character.",
      "ILIKE ignores upper and lower case.",
      "Use them for names, codes and descriptions.",
    ],
    next: "Lesson 17 sorts results with ORDER BY.",
  },
  "17": {
    title: "ORDER BY: sorting results",
    objectives: [
      "Sort results in ascending (ASC) and descending (DESC) order.",
      "Sort by several columns.",
      "Understand why sorting makes paging stable.",
    ],
    prerequisites: "You have completed SELECT and LIMIT (lesson 6).",
    explanation: [
      "ORDER BY sorts the result rows by one or more columns. ASC is ascending (the default), DESC is descending.",
      "With several columns, SQL sorts by the first column, and when values are equal it looks at the second column.",
      "ORDER BY goes at the end of the statement, after WHERE. Combine it with LIMIT to get the top N by one criterion.",
    ],
    factory: "Management wants to see the production orders with the largest planned quantities, so they can prioritize resources.",
    practice: [
      { question: "Get order_code and planned_qty of the first 10 orders when sorted by planned_qty in descending order.", hint: "Use ORDER BY planned_qty DESC and LIMIT 10." },
      { question: "Get full_name and hire_date of employees, sorted by hire_date in ascending order.", hint: "Use ORDER BY hire_date ASC (or omit ASC, since it is the default)." },
    ],
    mistakes: [
      "Forgetting DESC, so the result goes in ascending order, the opposite of what you want.",
      "Putting ORDER BY before WHERE, which causes a syntax error.",
    ],
    summary: [
      "ORDER BY sorts the result.",
      "ASC is ascending, DESC is descending.",
      "You can sort by several columns.",
    ],
    next: "Lesson 18 combines WHERE, ORDER BY and LIMIT in one statement.",
  },
  "18": {
    title: "Combining WHERE, ORDER BY and LIMIT",
    objectives: [
      "Write a statement that uses WHERE, ORDER BY and LIMIT together.",
      "Understand the order of operations: filter first, then sort, then limit the rows.",
      "Get the top N under a condition.",
    ],
    prerequisites: "You have completed WHERE, ORDER BY and LIMIT (lessons 11, 17 and 6).",
    explanation: [
      "The clauses are written in this order: SELECT, FROM, WHERE, ORDER BY, LIMIT. The processing order is similar: filter rows, sort them, then take the first n rows.",
      "This is the most basic query pattern for answering questions like 'top 10 ... with a condition'.",
    ],
    factory: "Quality management wants to see the 10 records with the largest production quantities to check them in more detail.",
    practice: [
      { question: "Get 10 production_records whose good_qty is greater than 0, sorted by total_qty in descending order, showing record_id, good_qty and total_qty.", hint: "Write WHERE good_qty > 0, ORDER BY total_qty DESC and LIMIT 10." },
      { question: "Get the top 5 products with the largest standard_cycle_sec, showing only product_code and standard_cycle_sec.", hint: "No WHERE is needed; use ORDER BY descending and LIMIT 5." },
    ],
    mistakes: [
      "Putting LIMIT before ORDER BY, which causes an error.",
      "Forgetting ORDER BY, so the top N is not really the top: the database picks rows arbitrarily.",
    ],
    summary: [
      "The order of clauses is WHERE, ORDER BY, LIMIT.",
      "Filter, sort, then limit the number of rows.",
      "The pattern for top N under a condition.",
    ],
    next: "Module 3 covers aggregate functions such as COUNT, SUM, AVG, MIN, MAX and GROUP BY.",
  },
};
