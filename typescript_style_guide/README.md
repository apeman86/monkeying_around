# TypeScript Style Guide

This is the PowerSchool TypeScript style guide

The best way to get started using this style guide is to install ```tslint.json``` in your project.

Install the required packages.

```
$ npm install tslint --save-dev
$ npm install gulp-tslint --save-dev
```

Manually add typescript_style_guide to packages.json

```
// packages.json
{
  "devDependencies": {
    "typescript_style_guide": "git+ssh://git@gitswarm.powerschool.com:commonportal/typescript_style_guide.git"
    ...
  }
  ...
}
```

You can use vscode tslint extension or add gulp task to run tslint on build. To add gulp task:

```
var gulp = require('gulp');
var tslint = require('gulp-tslint');

var tslintTask = function() {
  return gulp.src(['src/**/*.ts'])
    .pipe(tslint({
      configuration: 'node_modules/typescript_style_guide/tslint.json'
    }))
    .pipe(tslint.report({
      emitError: false,
      summarizeFailureOutput: true
    }));
};

gulp.task('tslint', tslintTask);
module.exports = tslintTask;
```

## Table of Contents

  0. [Introduction](#introduction)
  0. [TypeScript 2](#typescript-2)
  0. [Files](#files)
  0. [Indentation](#indentation)
  0. [Line Length](#line-length)
  0. [Quotes](#quotes)
  0. [Comments](#comments)
    0. [Class](#class)
    0. [Inline](#inline)
    0. [Todo and FIXME](#todo-and-fixme)
  0. [Variable Declarations](#variable-declarations)
  0. [Function Declarations](#function-declarations)
    0. [Anonymous Functions](#anonymous-functions)
  0. [Names](#names)
    0. [Variables, Modules, and Functions](#variables-modules-and-functions)
    0. [Use of var, let, and const](#use-of-var-let-and-const)
    0. [Types](#types)
    0. [Classes](#classes)
    0. [Interfaces](#interfaces)
    0. [Constants](#constants)
  0. [Statements](#statements)
    0. [Simple](#simple)
    0. [Compound](#compound)
    0. [Return](#return)
    0. [If](#if)
    0. [For](#for)
    0. [While](#while)
    0. [Do While](#do-while)
    0. [Switch](#switch)
    0. [Try](#try)
    0. [Continue](#continue)
    0. [Throw](#throw)
  0. [Whitespace](#whitespace)
  0. [Object and Array Literals](#object-and-array-literals)
  0. [Assignment Expressions](#assignment-expressions)
  0. [Typings](#assignment-expressions)
    0. [External](#external)
    0. [Internal](#internal)
  0. [Operators](#operators)
    0. [Double and Triple Equal Operators](#double-and-triple-equal-operators)
    0. [Postfix Exclamation Operator](#postfix-exclamation-operator)
  0. [Eval](#eval)
  0. [TSLint](#tslint)
  0. [Rule Overrides](#rule-overrides)
  0. [License](#license)

## Introduction
When developing software as an organization, the value of the software produced is directly affected by the quality of the codebase.
convention it is easier for new developers to read, preventing a lot of time/frustration spent figuring out the structure and
Consider a project that is developed over many years and handled/seen by many different people. If the project uses a consistent coding
characteristics of the code. For that purpose, we need to make sure we adhere to the same coding conventions across all of our products.
This will not only help new developers, but it will also aid in quickly identifying potential flaws in the code, thereby reducing the
brittleness of the code.

**[top](#table-of-contents)**

## TypeScript 2
  - If possible, start using TypeScript 2 with ```strictNullChecks``` enabled. The strictNullChecks option separates null and undefined from
  TypeScript's other types, and makes for more robust and better structured code. New projects should start with this check enabled. 
  Existing projects should transition as soon as is practical. To upgrade and enable strictNullChecks, upgrade your TypeScript version and include
  `strictNullChecks:true` in the `compilerOptions` section of your tsconfig.json.

**[top](#table-of-contents)**

## Files
  - All TypeScript files must have a ".ts" extension.
  - They should be all lower case, and only include letters, numbers, hyphens and periods.
  - Multi words filename should use hypens as the separator (eg. ```user-account.ts```)
  - **All files should end in a new line (\n). Do not use carriage return (\n\r)**. This is necessary for some Unix systems.

**[top](#table-of-contents)**

## Indentation
  - The unit of indentation is two spaces.
  - **Never use tabs**, as this can lead to trouble when opening files in different IDEs/Text editors. Most text editors have a configuration option to change tabs to spaces.

**[top](#table-of-contents)**

## Line Length
  - Lines must not be longer than 140 characters.
  - When a statement runs over 140 characters on a line, it should be broken up, ideally after a comma or operator.

**[top](#table-of-contents)**

## Quotes
  - Use single-quotes `''` for all strings, and use double-quotes `""` for strings within strings.

  ```typescript
  // bad
  let greeting = "Hello World!";

  // good
  let greeting = 'Hello World!';

  // bad
  let html = "<div class='bold'>Hello World</div>";

  // bad
  let html = '<div class=\'bold\'>Hello World</div>';

  // good
  let html = '<div class="bold">Hello World</div>';
  ```

**[top](#table-of-contents)**

## Comments
  - Comments are strongly encouraged. It is very useful to be able to read comments and understand the intentions of a given block of code.
  - Comments need to be clear, just like the code they are annotating.
  - Make sure your comments are meaningful.

The following example is a case where a comment is completely erroneous, and can actually make the code harder to read.

  ```typescript
  // Set index to zero.
  let index = 0;
  ```

  - All public functions must have a comment block `/**...*/` using [JSDoc](http://usejsdoc.org/) style comments.

JSDocs can be interpreted by IDEs for better intellisense. Below is an example of a JSDoc comment block for a function.

  ```typescript
  /**
   * Takes in a name and returns a greeting string.
   *
   * @param name The name of the greeted person.
   */
  function getGreeting(name: string): string {
    return 'Hello ' + name + '!';
  }
  ```

### Class

  - All classes must have block comments `/**...*/` for all public variables and functions.
  - All public functions should use [JSDoc](http://usejsdoc.org/) style comments.
  - Functions need to have a comment explaining what the function does, and all of the input parameters need to be annotated with `@param`.
  - The class should include a block comment containing the description of the class
  - The constructor should contain a JSDoc comment annotating any input parameters.

  ```typescript
  /**
   * Contains properties of a Person.
   */
  class Person {
    /**
    * Returns a new Person with the specified name.
    *
    * @param name The name of the new Person.
    */
    static GetPerson(name: string): Person {
      return new Person(name);
    }

    /**
    * @param name The name of the new Person.
    */
    constructor(public name: string) { }

    /**
    * Instructs this Person to walk for a certain amount
    * of time.
    *
    * @param millis The number of milliseconds the Person
    * should walk.
    */
    walkFor(millis: number): void {
      console.log(this.name + ' is now walking.');

      setTimeout(() => {
        console.log(this.name + ' has stopped walking.');
      }, millis);
    }
  }
  ```

**[top](#table-of-contents)**

### Inline

  - Inline comments are comments inside of complex statements (loops, functions, etc).
  - Use `//` for all inline comments.
  - Keep comments clear and concise.
  - Put an empty line before the comment.

  ```typescript
  // bad
  function walkFor(name: string, millis: number): void {
    console.log(name + ' is now walking.');
    // Wait for millis milliseconds to stop walking
    setTimeout(() => {
      console.log(name + ' has stopped walking.');
    }, millis);
  }

  // good
  function walkFor(name: string, millis: number): void {
    console.log(name + ' is now walking.');

    // Wait for millis milliseconds to stop walking
    setTimeout(() => {
      console.log(name + ' has stopped walking.');
    }, millis);
  }
  ```

**[top](#table-of-contents)**

### Todo and FIXME

`TODO` and `FIXME` annotations help you quickly find things that need to be fixed/implemented.

  - Use `// TODO:` to annotate solutions that need to be implemented.
  - Use `// TODO: (yourname)` to add your name.
  - Use `// FIXME:` to annotate problems the need to be fixed.
  - It is best to write code that doesn't need `TODO` and `FIXME` annotations, but sometimes it is unavoidable.

**[top](#table-of-contents)**

## Variable Declarations

  - All variables must be declared prior to using them. This aids in code readability and helps prevent undeclared variables from being hoisted onto the global scope.

  ```typescript
  // bad
  console.log(a + b);

  let a = 2;
  let b = 4;

  // good
  let a = 2;
  let b = 4;

  console.log(a + b);
  ```

  - Implied global variables should never be used.
  - You should never define a variable on the global scope from within a smaller scope.

  ```typescript
  // bad
  function add(a: number, b: number): number {
    // c is on the global scope!
    c = 6;

    return a + b + c;
  }
  ```

  - Use one `let` keyword to define each variable. Reason: you can debug each variable definition.
  - Declare each variable on a newline.

  ```typescript
  // bad
  let a = 2,
      b = 2,
      c = 4;

  // good
  let a = 2;
  let b = 2;
  let c = 4;

  // bad
  // b will be defined on global scope.
  let a = b = 2, c = 4;
  ```

## Function Declarations

  - There should be no space between the name of the function and the left parenthesis `(` of its parameter list.
  - There should be one space between the right parenthesis `)` and the left curly `{` brace that begins the statement body.

  ```typescript
  // bad
  function foo (){
    // ...
  }

  // good
  function foo() {
    // ...
  }
  ```

  - The body of the function should be indented 2 spaces.
  - The right curly brace `}` should be on a new line.
  - The right curly brace `}` should be aligned with the line containing the left curly brace `{` that begins the function statement.

  ```typescript
  // bad
  function foo(): string {
      return 'foo';}

  // good
  function foo(): string {
    return 'foo';
  }
  ```

  - For each function parameter
    - There should be no space between the parameter and the colon `:` indicating the type declaration.
    - There should be a space between the colon `:` and the type declaration.

  ```typescript
  // bad
  function greet(name:string) {
    // ...
  }

  // good
  function greet(name: string) {
    // ...
  }
  ```

**[top](#table-of-contents)**

### Anonymous Functions

  - All anonymous functions should be defined as fat-arrow/lambda `() => { }` functions unless it is absolutely necessary to preserve the context in the function body.
  - All fat-arrow/lambda functions should have parenthesis `()` around the function parameters.

  ```typescript
  // bad
  clickAlert() {
    let element = document.querySelector('div');

    this.foo = 'foo';

    element.addEventListener('click', function(ev: Event) {
      // this.foo does not exist!
      alert(this.foo);
    });
  }

  // good
  clickAlert() {
    let element = document.querySelector('div');

    this.foo = 'foo';

    element.addEventListener('click', (ev: Event) => {
      // TypeScript allows this.foo to exist!
      alert(this.foo);
    });
  }
  ```

  - There should be a space between the right parenthesis `)` and the `=>`
  - There should be a space between the `=>` and the left curly brace `{` that begins the statement body.

  ```typescript
  // bad
  element.addEventListener('click', (ev: Event)=>{alert('foo');});

  // good
  element.addEventListener('click', (ev: Event) => {
    alert('foo');
  });
  ```

  - The statement body should be indented 2 spaces.
  - The right curly brace `}` should be on a new line.
  - The right curly brace `}` should be aligned with the line containing the  left curly brace `{` that begins the function statement.

**[top](#table-of-contents)**

## Names

  - All variable and function names should be formed with alphanumeric `A-Z, a-z, 0-9` and underscore `_` charcters.

### Variables, Modules, and Functions

  - Variable, module, and function names should use lowerCamelCase.

### Use of var, let, and const

  - Use `const` where appropriate, for values that should never change
  - Use `let` everywhere else
  - Avoid using `var`

**[top](#table-of-contents)**

### Types

  - Always favor type inference over explicit type declaration except for function return types
  - Always define the return type of functions.
  - Types should be used whenever necessary (no implicit `any`).
  - Use the `any` type sparingly, it is always better to define an interface.

**[top](#table-of-contents)**

### Classes

  - Classes/Constructors should use UpperCamelCase (PascalCase).
  - `Private` and `private static` members in classes should be denoted with the `private` keyword.
  - `Protected` members in classes do not use the `private` keyword.
  - Default to using `protected` for all instance members
  - Use `private` instance members sparingly
  - Use `public` instance members only when they are used by other parts of the application.

  ```typescript
  class Person {
    protected fullName: string;

    constructor(public firstName: string, public lastName: string) {
      this.fullName = firstName + ' ' + lastName;
    }

    toString() {
      return this.fullName;
    }

    protected walkFor(millis: number) {
      console.log(this.fullName + ' is now walking.');

      // Wait for millis milliseconds to stop walking
      setTimeout(() => {
        console.log(this.fullName + ' has stopped walking.');
      }, millis);
    }
  }
  ```

**[top](#table-of-contents)**

### Interfaces

  - Interfaces should use UpperCamelCase.
  - Only `public` members should be in an interface, leave out `protected` and `private` members.

  ```typescript
  interface Person {
    firstName: string;
    lastName: string;
    toString(): string;
  }
  ```

**[top](#table-of-contents)**

### Constants

  - All constants should use UPPER_SNAKE_CASE.
  - All constants should be defined with the `const` keyword.

**[top](#table-of-contents)**

## Statements

### Simple

  - Each line should contain at most one statement.
  - A semicolon should be placed at the end of every simple statement.

  ```typescript
  // bad
  let greeting = 'Hello World'

  alert(greeting)

  // good
  let greeting = 'Hello World';

  alert(greeting);
  ```

**[top](#table-of-contents)**

### Compound

Compound statements are statements containing lists of statements enclosed in curly braces `{}`.

  - The enclosed statements should start on a newline.
  - The enclosed statements should be indented 2 spaces.

  ```typescript
  // bad
  if (condition === true) { alert('Passed!'); }

  // good
  if (condition === true) {
    alert('Passed!');
  }
  ```
  - The left curly brace `{` should be at the end of the line that begins the compound statement.
  - The right curly brace `}` should begin a line and be indented to align with the line containing the left curly brace `{`.

  ```typescript
  // bad
  if (condition === true)
  {
    alert('Passed!');
  }

  // good
  if (condition === true) {
    alert('Passed!');
  }
  ```

  - **Braces `{}` must be used around all compound statements** even if they are only single-line statements.

  ```typescript
  // bad
  if (condition === true) alert('Passed!');

  // bad
  if (condition === true)
    alert('Passed!');

  // good
  if (condition === true) {
    alert('Passed!');
  }
  ```

If you do not add braces `{}` around compound statements, it makes it very easy to accidentally introduce bugs.

  ```typescript
  if (condition === true)
    alert('Passed!');
    return condition;
  ```

It appears the intention of the above code is to return if `condition === true`, but without braces `{}` the return statement will be executed regardless of the condition.

  - Compount statements do not need to end in a semicolon `;` with the exception of a `do { } while();` statement.

**[top](#table-of-contents)**

### Return

  - If a `return` statement has a value you should not use parenthesis `()` around the value.
  - The return value expression must start on the same line as the `return` keyword.

  ```typescript
  // bad
  return
      'Hello World!';

  // bad
  return ('Hello World!');

  // good
  return 'Hello World!';
  ```

  - It is recommended to take a return-first approach whenever possible.

  ```typescript
  // bad
  function getHighestNumber(a: number, b: number): number {
    let out = b;

    if (a >= b) {
      out = a;
    }

    return out;
  }

  // good
  function getHighestNumber(a: number, b: number): number {
    if (a >= b) {
      return a;
    }

    return b;
  }
  ```

  - Always **explicitly define a return type**. This can help TypeScript validate that you are always returning something that matches the correct type.

  ```typescript
  // bad
  function getPerson(name: string) {
    return new Person(name);
  }

  // good
  function getPerson(name: string): Person {
    return new Person(name);
  }
  ```

**[top](#table-of-contents)**

### If

  - Alway be explicit in your `if` statement conditions.

  ```typescript
  // bad
  function isString(str: any) {
    return !!str;
  }

  // good
  function isString(str: any) {
    return typeof str === 'string';
  }
  ```

Sometimes simply checking falsy/truthy values is fine, but the general approach is to be explicit with what you are looking for. This can prevent a lot of unncessary bugs.

If statements should take the following form:

  ```typescript
  if (/* condition */) {
    // ...
  }

  if (/* condition */) {
    // ...
  } else {
    // ...
  }

  if (/* condition */) {
    // ...
  } else if (/* condition */) {
    // ...
  } else {
    // ...
  }
  ```

**[top](#table-of-contents)**

### For

For statements should have the following form:

  ```typescript
  for (/* initialization */; /* condition */; /* update */) {
    // ...
  }

  ```

Use Object.prototype.keys in lieu of a `for...in` statement.

Reason: `for...in` can be mistakenly used on an array. 
 
  ```typescript
  let o = { foo: 'bar' };
  Object.keys(o).forEach((key) => {
    console.log([key, o[key]]);
  });
  ```

**[top](#table-of-contents)**

### While

While statements should have the following form:

  ```typescript
  while (/* condition */) {
    // ...
  }
  ```

**[top](#table-of-contents)**

### Do While

  - Do while statements should be avoided unless absolutely necessary to maintain consistency.
  - Do while statements must end with a semicolon `;`

Do while statements should have to following form:

  ```typescript
  do {
    // ...
  } while (/* condition */);
  ```

**[top](#table-of-contents)**

### Switch

Switch statements should have the following form:

  ```typescript
  switch (/* expression */) {
    case /* expression */:
      // ...
      /* termination */
    default:
      // ...
  }
  ```

  - Each switch group except default should end with `break`, `return`, or `throw`.

**[top](#table-of-contents)**

### Try

  - Try statements should be avoided whenever possible. They are not a good way of providing flow control.

Try statements should have the following form:

  ```typescript
  try {
    // ...
  } catch (error: Error) {
    // ...
  }

  try {
    // ...
  } catch (error: Error) {
    // ...
  } finally {
    // ...
  }
  ```

**[top](#table-of-contents)**

### Continue

  - It is recommended to take a continue-first approach in all loops.

**[top](#table-of-contents)**

### Throw

  - Avoid the use of the throw statement unless absolutely necessary.
  - Flow control through try/catch exception handling is not recommended.

**[top](#table-of-contents)**

## Whitespace

Blank lines improve code readability by allowing the developer to logically group code blocks. Blank spaces should be used in the following circumstances.

  - A keyword followed by left parenthesis `(` should be separated by 1 space.

  ```typescript
  // bad
  if(condition) {
    // ...
  }

  // good
  if (condition) {
    // ...
  }
  ```

  - All operators except for period `.`, left parenthesis `(`, and left bracket `[` should be separated from their operands by a space.

  ```typescript
  // bad
  let sum = a+b;

  // good
  let sum = a + b;

  // bad
  let name = person . name;

  // good
  let name = person.name;

  // bad
  let item = items [4];

  // good
  let item = items[4];
  ```

  - No space should separate a unary/incremental operator `!x, -x, +x, ~x, ++x, --x` and its operand.

  ```typescript
  // bad
  let neg = - a;

  // good
  let neg = -a;
  ```

  - Each semicolon `;` in the control part of a `for` statement should be followed with a space.

  ```typescript
  // bad
  for(let i = 0;i < 10;++i) {
    // ...
  }

  // good
  for (let i = 0; i < 10; ++i) {
    // ...
  }
  ```

**[top](#table-of-contents)**

## Object and Array Literals

  - Use curly braces `{}` instead of `new Object()`.
  - Use brackets `[]` instead of `new Array()`.

**[top](#table-of-contents)**

## Assignment Expressions

  - Assignment expressions inside of the condition block of `if`, `while`, and `do while` statements should be avoided.

  ```typescript
  // bad
  while (node = node.next) {
    // ...
  }

  // good
  while (typeof node === 'object') {
    node = node.next;

    // ...
  }
  ```

**[top](#table-of-contents)**

## Operators

### Double and Triple Equal Operators

  - It is better to use `===` and `!==` operators whenever possible.
  - `==` and `!=` operators do type coercion, which can lead to headaches when debugging code.
  - The one exception is `== null` and `!= null`, which is the recommended way of checking for null or undefined.

**[top](#table-of-contents)**

### Postfix Exclamation Operator

  - TypeScript 2.0 provides a postfix `!` operator, which declares to the compiler that its operand is never null or undefined.
The operator may be necessary in rare cases, but a good rule of thumb is to avoid it where possible. Use of postfix `!` is often
a bad smell, indicating that the code is not being careful about types. You may be tempted to use it after an error appears when turning
on strictNullChecks, but we find that generally the code benefits from recasting it so the operator is unnecessary. An example of a case
where it is fine to use is on the key for the lodash _.forOwn construct. The key is always a string if an object is being iterated over, 
but the type is (string|undefined).

**[top](#table-of-contents)**

## Typings

### External

  - Typings are sometimes packaged with node modules, in this case you don't need to do anything
  - Use [typings](https://github.com/typings/typings) for all external library declarations not included in `node_modules`
  - Actively add/update/contribute typings when they are missing

### Internal

  - Create declaration files `.d.ts` for your interfaces instead of putting them in your `.ts` files
  - Let the TypeScript compiler infer as much as possible
  - Avoid defining types when it is unnecessary

  ```typescript
  // bad
  let a: number = 2;

  // good
  let a = 2;
  ```

  - Always define the return type of functions, this helps to make sure that functions always return the correct type

  ```typescript
  // bad
  function sum(a: number, b: number) {
    return a + b;
  }

  // good
  function sum(a: number, b: number): number {
    return a + b;
  }
  ```

**[top](#table-of-contents)**

## Eval

  - **Never use eval**
  - **Never use the Function constructor**
  - **Never pass strings to `setTimeout` or `setInterval`**

**[top](#table-of-contents)**

## TSLint

  - Always use a Linter

Linting your code is very helpful for preventing minor issues that can escape the eye during development. We use TSLint (written by Palantir) for our linter.

  - TSLint: https://github.com/palantir/tslint
  - Our [tslint.json](https://github.com/Platypi/style_typescript/blob/master/tslint.json)

## Rule Overrides
Rules can be ignored within files by adding flags to the code to get rid of errors on properly written code.
  - Override syntax https://palantir.github.io/tslint/usage/rule-flags/
  - List of rules by name: https://palantir.github.io/tslint/rules/

## License
(The MIT License)

Copyright (c) 2014 Platypi, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

I like to eat candy. I ate too much yesterday. The good news is, it's all on sale today.
