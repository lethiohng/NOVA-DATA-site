import type { BasicLessonEnText } from "../types";

/* English text for SQL Basic module 4 (lessons 1–10). SQL, identifiers and solutions are shared with the Vietnamese lessons. */

export const module04En: Record<string, BasicLessonEnText> = {
  "1": {
    title: "Introduction to SQL and your first query",
    objectives: [
      "Understand that SQL is the language used to ask questions of a database.",
      "Recognize statements, keywords, identifiers and the semicolon.",
      "Write and run your first SELECT query.",
    ],
    prerequisites: "No prior SQL knowledge is needed. Basic computer and browser skills are enough.",
    explanation: [
      "SQL (Structured Query Language) is used to communicate with a database. You ask a question with one statement, and the database returns a result table.",
      "A SQL command is called a statement. It contains keywords (such as SELECT and FROM) defined by SQL, identifiers (table and column names such as products and product_name) chosen by you or the system, and literals (specific values such as 'LINE-A' or 100). Statements end with a semicolon ;.",
      "The most basic statement has the form SELECT ... FROM ...: SELECT says what to look at, FROM says which table to take it from. Writing SQL is a bit like reading English: 'select these columns, from that table'.",
    ],
    factory: "Someone asks you to quickly see the list of production lines we have. This is the simplest SQL question you can write.",
    practice: [
      { question: "Get all data from the products table.", hint: "Use SELECT * FROM table_name; the * means all columns." },
      { question: "Get the line code (line_code) and line name (line_name) from the production_lines table.", hint: "List the two column names after SELECT, separated by commas." },
    ],
    mistakes: [
      "Forgetting the semicolon at the end (many tools still run it, but it is good to build the habit).",
      "Mistyping a table or column name. The database reports 'does not exist'; check the spelling.",
      "Writing FROM before SELECT. SQL requires the order SELECT first, then FROM.",
    ],
    summary: [
      "SQL is the language for asking questions of a database.",
      "The basic form is: SELECT column FROM table;",
      "Use * to get all columns.",
    ],
    next: "Lesson 2 shows all the data in a table and how to read the result.",
  },
  "2": {
    title: "SELECT * and reading query results",
    objectives: [
      "Use SELECT * to see a whole table.",
      "Read a result made of column names and data rows.",
      "Know when to use SELECT * and when to avoid it.",
    ],
    prerequisites: "You have completed lesson 1 on SELECT ... FROM.",
    explanation: [
      "SELECT * returns all columns of a table. It is the fastest way to see the structure and sample data of an unfamiliar table.",
      "The result has a header row (the column names) followed by data rows. Each row is one record, for example one machine or one employee.",
      "In real work, avoid SELECT * when a table has many columns or many rows, because the result is slow and hard to read. In that case, select only the columns you need (lesson 3).",
    ],
    factory: "A new engineer at the plant wants to look at the machines table to see what information it holds before writing a report.",
    practice: [
      { question: "View the whole employees table.", hint: "Use SELECT * FROM table_name;" },
      { question: "View the whole downtime_reasons table.", hint: "The structure is exactly the same as the previous question; only the table name changes." },
    ],
    mistakes: [
      "Using SELECT * on production_records (tens of thousands of rows) without limiting the rows, which makes a very long result.",
      "Confusing singular and plural table names (for example machine instead of machines).",
    ],
    summary: [
      "SELECT * FROM table returns all columns.",
      "The result has column names at the top, and each row is one record.",
      "For large tables, select only the columns you need.",
    ],
    next: "Lesson 3 selects exactly the columns you need.",
  },
  "3": {
    title: "Selecting the columns you need and their order",
    objectives: [
      "List specific columns after SELECT.",
      "Understand that the column order in SELECT sets the display order.",
      "Spell column names correctly in SELECT.",
    ],
    prerequisites: "You have completed SELECT and FROM (lessons 1 and 2).",
    explanation: [
      "Instead of *, list the column names you need, separated by commas. The result contains only those columns.",
      "The column order in SELECT is the display order. If you write SELECT product_name, product_code, the product name appears before the code.",
      "Selecting fewer columns keeps the result compact and the query faster. This is a good habit when working with large tables.",
    ],
    factory: "The shift supervisor needs a list of machines with their ideal cycle time to compare against actual performance, and does not need other information.",
    practice: [
      { question: "Get product_code and product_name from the products table.", hint: "Write the two column names after SELECT, separated by a comma." },
      { question: "Get full_name and role of employees from the employees table.", hint: "Similar, but the table is employees." },
    ],
    mistakes: [
      "Forgetting the comma between columns, for example SELECT line_code line_name.",
      "An extra comma at the end of the column list, before FROM.",
    ],
    summary: [
      "List specific columns instead of using *.",
      "Separate columns with commas.",
      "The order in SELECT is the display order.",
    ],
    next: "Lesson 4 removes duplicate values with DISTINCT.",
  },
  "4": {
    title: "DISTINCT: removing duplicate values",
    objectives: [
      "Use DISTINCT to get the different values.",
      "Understand that DISTINCT over several columns compares the combination of columns.",
      "Tell the difference between results with and without DISTINCT.",
    ],
    prerequisites: "You have completed selecting columns with SELECT (lesson 3).",
    explanation: [
      "When a column has many repeated values, DISTINCT shows each value only once. For example, the machines table has many machines of type Press.",
      "Put DISTINCT right after SELECT. With several columns, SQL compares the combination: two rows are duplicates only when all selected columns are identical.",
      "DISTINCT can make very large tables slower, so use it only when you need a list of unique values.",
    ],
    factory: "The maintenance team wants to know which types of machines the plant has in order to plan spare parts.",
    practice: [
      { question: "List the different locations of production lines in the production_lines table.", hint: "Add DISTINCT right after SELECT." },
      { question: "List the unique roles of employees in the employees table.", hint: "The table is employees and the column is role." },
    ],
    mistakes: [
      "Thinking DISTINCT deletes data. It only filters the displayed result; the table does not change.",
      "Placing DISTINCT after the column name instead of before it, for example SELECT machine_type DISTINCT.",
    ],
    summary: [
      "DISTINCT removes duplicate rows from the result.",
      "Place DISTINCT right after SELECT.",
      "It does not change the original data.",
    ],
    next: "Lesson 5 gives new display names to columns with an alias.",
  },
  "5": {
    title: "Alias: giving columns a display name",
    objectives: [
      "Give a column an alias using the keyword AS.",
      "Use double quotes when an alias contains spaces or Vietnamese accents.",
      "Tell the original column name apart from the display name.",
    ],
    prerequisites: "You have completed selecting columns with SELECT (lesson 3).",
    explanation: [
      "An alias is a temporary name shown in the result. Write column_name AS new_name. An alias does not rename the column in the original table.",
      "If an alias contains spaces or accented characters, put it in double quotes, for example AS \"Product name\".",
      "Aliases make reports easier to read. You can also use an alias to name calculations; you will see this again in the aggregation module.",
      "A table alias is a short name given to a table right after its name in FROM, for example FROM production_records r. Then r.record_id means the record_id column of production_records. Table aliases keep queries short, especially when you join several tables with JOIN later.",
      "Example: SELECT r.record_id, r.total_qty FROM production_records r WHERE r.total_qty > 50; Here r is the alias of production_records, and the whole statement only needs r. before each column name.",
    ],
    factory: "The report for the plant director needs clear column names, not technical database names.",
    practice: [
      { question: "Show the full_name column with the name \"Full name\" in the employees table.", hint: "Use AS and put \"Full name\" in double quotes." },
      { question: "Get machine_name as \"Machine\" and ideal_cycle_sec as \"Ideal cycle time\" from the machines table.", hint: "Two columns, each with its own AS." },
    ],
    mistakes: [
      "Using single quotes for an alias ('Full name'). Single quotes are for string values; column names use double quotes.",
      "Thinking an alias renames the column in the table. In fact it only renames the display.",
    ],
    summary: [
      "AS gives a column a display name.",
      "Use double quotes for aliases with spaces or accents.",
      "The original table does not change.",
      "A table alias goes after the table name in FROM, for example FROM production_records r, then r.column_name.",
    ],
    next: "Lesson 6 limits the number of rows with LIMIT and OFFSET.",
  },
  "6": {
    title: "LIMIT and OFFSET: limiting the number of rows",
    objectives: [
      "Use LIMIT to get a fixed number of rows.",
      "Use OFFSET to skip the first rows.",
      "Understand why ORDER BY is needed when paging results.",
    ],
    prerequisites: "You have completed SELECT and selecting columns (lessons 1 to 3).",
    explanation: [
      "LIMIT n returns only the first n rows of the result. It is very useful when a table has tens of thousands of rows, such as production_records.",
      "OFFSET m skips the first m rows. It is usually used with LIMIT for paging: page 2 with 10 rows per page is LIMIT 10 OFFSET 10.",
      "To get stable results when paging, add ORDER BY to define the row order. Without ORDER BY, the database may return rows in any order. Lesson 17 covers ORDER BY in detail.",
    ],
    factory: "A data engineer checking production data only needs to see the first 10 records to check the format, without loading the whole table.",
    practice: [
      { question: "Get the first 5 rows of the products table, sorted by product_id.", hint: "Use ORDER BY product_id, then LIMIT 5." },
      { question: "Skip the first 2 rows and get the next 3 rows of products, sorted by product_id.", hint: "Add OFFSET 2 after LIMIT 3." },
    ],
    mistakes: [
      "Using LIMIT without ORDER BY and assuming the result is always the same.",
      "Putting OFFSET before LIMIT. The correct order is LIMIT then OFFSET.",
    ],
    summary: [
      "LIMIT restricts the number of rows returned.",
      "OFFSET skips the first rows.",
      "Add ORDER BY to get stable results.",
    ],
    next: "Lesson 7 works with NULL values, that is, missing data.",
  },
  "7": {
    title: "NULL: missing values",
    objectives: [
      "Understand that NULL means a missing or unknown value, different from 0 and from an empty string.",
      "Check for NULL with IS NULL and IS NOT NULL.",
      "Know why = NULL is not used.",
    ],
    prerequisites: "You have completed SELECT and FROM. This lesson uses WHERE, which is covered in detail in lesson 11.",
    explanation: [
      "NULL means there is no value: unknown or not entered. NULL is not the number 0, and it is not an empty string ''.",
      "Do not compare NULL with the = sign, because the result of NULL = NULL is undefined. Use IS NULL to find missing values and IS NOT NULL to find values that exist.",
      "In the employees table, employees who have not been assigned to a shift have shift_id equal to NULL. In calculations, NULL is usually skipped by aggregate functions (covered in module 3).",
    ],
    factory: "The HR department needs to find employees who have not yet been assigned a shift, so they can rearrange the schedule before the new week.",
    practice: [
      { question: "Find employees who have no shift (shift_id is NULL) in the employees table. Return only the full_name column.", hint: "Use WHERE shift_id IS NULL." },
      { question: "List machine_code of machines whose machine_type is not NULL (has a value).", hint: "Use IS NOT NULL instead of IS NULL." },
    ],
    mistakes: [
      "Writing WHERE shift_id = NULL. This returns no rows; use IS NULL.",
      "Confusing NULL with 0 or an empty string, which gives wrong results when filtering.",
    ],
    summary: [
      "NULL is a missing value, not 0 or an empty string.",
      "Use IS NULL and IS NOT NULL to check.",
      "Do not use the = sign with NULL.",
    ],
    next: "Lesson 9 shows how to add notes to a statement with comments.",
  },
  "8": {
    title: "Empty string vs NULL: what is the difference?",
    objectives: [
      "Tell an empty string '' apart from NULL.",
      "Find both empty cells and NULL cells in one column.",
      "Understand that a space is not an empty string.",
    ],
    prerequisites: "You have completed NULL (lesson 7) and WHERE (lesson 11).",
    explanation: [
      "An empty string '' is a real value: a string with no characters. It is different from NULL, which means there is no value at all.",
      "In manually entered data, a blank cell may be stored as '' or as NULL depending on the system. So when looking for blank cells, check both cases.",
      "Compare with an empty string using =. Compare with NULL using IS NULL. A space ' ' is not an empty string either: use TRIM to remove spaces before comparing.",
    ],
    factory: "Some data-entry staff leave a note field blank, and the system stores it as NULL. The missing-data report must count both cases.",
    practice: [
      { question: "Count the production lines whose location is NULL or an empty string in the production_lines table.", hint: "Use WHERE location IS NULL OR location = ''." },
      { question: "Write a query returning one row with: an empty string (AS chuoi_rong), its length (AS do_dai) and the result of '' IS NULL (AS la_null).", hint: "List three expressions separated by commas after SELECT, with AS for each. Use the LENGTH function for the length." },
    ],
    mistakes: [
      "Thinking '' and NULL are the same, so searching for blank cells with IS NULL alone misses the rows that contain ''.",
      "Writing WHERE column = NULL: this returns no rows; use IS NULL.",
      "Forgetting TRIM: a cell with only a space ' ' is not an empty string, so it does not match = ''.",
    ],
    summary: [
      "An empty string '' is different from NULL.",
      "Find both with IS NULL OR column = ''.",
      "Use TRIM before comparing when spaces may be present.",
    ],
    next: "The next lesson covers comparison operators in WHERE.",
  },
  "9": {
    title: "Comments: notes inside a statement",
    objectives: [
      "Write a single-line comment with --.",
      "Write a multi-line comment with /* */.",
      "Know that comments do not change the query result.",
    ],
    prerequisites: "You have completed a basic SELECT statement (lesson 1).",
    explanation: [
      "A comment is a note inside a SQL statement. The database skips it and does not run that part. Use comments to explain the purpose of a query so teammates understand it quickly.",
      "A single-line comment starts with two dashes -- and runs to the end of the line. A multi-line comment is placed between /* and */.",
      "Comment queries that are reused often, or that have complex conditions.",
    ],
    factory: "An OEE report query is reused by many people. Clear notes help newcomers understand the formula and the data source.",
    practice: [
      { question: "Add the comment -- Product list above the query that selects all of the products table.", hint: "The first line is a comment starting with --, the next line is the SELECT statement." },
      { question: "Use /* */ to comment on the machine_code, machine_name query from machines, and keep the query working.", hint: "Put /* at the start and */ at the end of a block, but do not remove the real SELECT." },
    ],
    mistakes: [
      "Commenting out the whole SELECT statement, so there is nothing to run. Comment only the notes and keep the statement.",
      "Forgetting to close a multi-line comment with */, which makes the statement fail.",
    ],
    summary: [
      "-- is a single-line comment.",
      "/* */ is a multi-line comment.",
      "Comments help others understand the statement.",
    ],
    next: "Lesson 10 reviews the whole SELECT module.",
  },
  "10": {
    title: "SELECT review: mini challenge",
    objectives: [
      "Combine SELECT, DISTINCT, alias, LIMIT, NULL and comments in one query.",
      "Write a query yourself from a business request.",
      "Check whether the result meets the request.",
    ],
    prerequisites: "You have completed lessons 1 to 8.",
    explanation: [
      "This review lesson has no new theory. You will combine what you have learned to answer realistic business requests.",
      "When you face a request, work in this order: decide which table to read, list the columns to show, then decide whether you need DISTINCT, an alias or LIMIT.",
    ],
    factory: "Before the Monday meeting, the shift supervisor needs to quickly know the shifts currently in use and a few of the latest production records.",
    practice: [
      { question: "List the shift names (shift_name) in the shifts table, without duplicates.", hint: "Use SELECT DISTINCT shift_name FROM shifts." },
      { question: "Get the first 10 production_records (by record_id), showing only record_id, record_time and total_qty, and give total_qty the alias \"Total quantity\".", hint: "Use ORDER BY record_id, LIMIT 10, and AS for the total_qty column." },
    ],
    mistakes: [
      "Forgetting ORDER BY when using LIMIT, which makes the result unstable.",
      "Using DISTINCT on too many columns, which removes its usefulness.",
    ],
    summary: [
      "Combine basic statements to solve a request.",
      "Always check the columns, row count and order of the result.",
    ],
    next: "Module 2 teaches how to filter data with WHERE and sort it with ORDER BY.",
  },
};
