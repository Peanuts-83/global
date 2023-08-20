# Global - my portfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Styling with SASS

### @import vs. @use

In Sass (SCSS), both `@import` and `@use` are used to include external stylesheets, but they have different behaviors and are recommended for different use cases. Here's a breakdown of the key differences between them:

1. **Scope Isolation:**

   - `@import`: When you use `@import` to include a stylesheet, all variables, mixins, and styles defined in the imported file are merged into the current scope. This can potentially lead to naming conflicts and unintended global styles.
   - `@use`: The `@use` rule introduces a new way to import styles with better scope isolation. It creates a new namespace for the imported module, preventing naming clashes and making styles more modular.

2. **Lazy Loading:**

   - `@import`: All styles and definitions are loaded immediately when the `@import` statement is encountered, which can lead to bloated stylesheets.
   - `@use`: By default, `@use` only loads the module's variables, functions, and mixins when you access them. This can help reduce unnecessary code bloat and improve performance.

3. **Access Control:**

   - `@import`: There's no built-in mechanism to control which parts of an imported file are accessible. Everything defined in the imported file is available globally.
   - `@use`: The `@use` rule allows you to specify which parts of the module you want to import, which promotes better encapsulation and control over what you're actually using.

4. **Forward Declarations:**

   - `@import`: Declarations from an imported file are available in the order they're defined, allowing you to use them before they're declared.
   - `@use`: The `@use` rule requires explicit forward declarations for any variables, functions, or mixins you want to use. This helps avoid issues with undefined styles.

5. **Namespacing:**

   - `@import`: No built-in namespacing is provided, which can lead to global naming conflicts.
   - `@use`: Namespacing is built-in and automatic. Imported modules are treated as namespaces, reducing the chances of naming conflicts.

In summary, the `@use` rule offers a more modern and recommended approach for importing styles and components in Sass, thanks to its improved scope isolation, lazy loading, access control, and namespacing features. It helps improve the modularity and maintainability of your stylesheets by reducing the likelihood of global conflicts and allowing for more controlled imports. If you're starting a new project or updating an existing one, it's a good idea to consider using `@use` instead of `@import`.

```scss
// variables.scss

$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$error-color: #dc3545;
// ... add more color variables as needed
```

**With @import**

```scss
// styles.scss (or any other SCSS file)

// Import the variables.scss file using @import
@import 'variables';

// Now you can use the color variables
.primary-bg {
  background-color: $primary-color;
}

.text-error {
  color: $error-color;
}

```

**With @use**

```scss
// styles.scss (or any other SCSS file)

// Import the variables.scss file using @use
@use 'variables' as vars;  // specific scope defined with "vars"

// Now you can use the color variables
.primary-bg {
  background-color: vars.$primary-color;
}

.text-error {
  color: vars.$error-color;
}
```
