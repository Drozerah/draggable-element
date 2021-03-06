# Draggable Element

> Prototyping a Draggable DOM Element

> TODO: write a better README.md


Table of Contents
-----------------

- [Usage](#usage)
- [List of Packages](#list-of-packages)
- [Author](#author)
- [Lisence](#license)

Usage
-----

- import draggable.js ES6 class based module into your JS
- instanciate a new Draggable DOM element ``new Draggable(your-DOM-element).init()``, the `.init()` chainable method is required to make `your-DOM-element` a draggable element.
  - the optional `.isLimited()` chainable method will set whether or not the draggable element must stay in the visible window based on a boolean argument
  - the optional `.startAt({ x: 350, y: 350 })` chainable method give the ability to define the draggable element position

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/draggable.css">
    <!-- IE11 polyfill -->
    <script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=es6%2CArray.from%2CArray.prototype.forEach%2CArray.prototype.filter"></script>
    <title>Document</title>
</head>
<body>
    <main>
        <div class="element_1 draggable noselect">
            <div>Draggable Element 1</div>
            <span class="material-icons dragIndicator">drag_indicator</span>
        </div>
        <div class="element_2 draggable noselect">
            <div>Draggable Element 2</div>
            <span class="material-icons dragIndicator">drag_indicator</span>
        </div>
    </main>
    <footer>
    </footer>
    <script type="module">
        import Draggable from './draggable.js'
        new Draggable(document.querySelector('.element_1')).init()
        new Draggable(document.querySelector('.element_2'))
            .init()
            .isLimited(false)
            .startAt({ x: 350, y: 350 })
    </script>
</body>
</html>
```

List of Packages
----------------

__devDependencies__

| Package                                                                             | Description                                         |
| ----------------------------------------------------------------------------------- | --------------------------------------------------- |
| [better-docs](https://github.com/SoftwareBrothers/better-docs#readme)               | JSdoc theme                                         |
| [eslint](https://eslint.org)                                                        | An AST-based pattern checker for JavaScript         |
| [eslint-config-standard](https://github.com/standard/eslint-config-standard)        | JavaScript Standard Style - ESLint Shareable Config |
| [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)           | Import with sanity                                  |
| [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node#readme)       | Additional ESLint's rules for Node.js               |
| [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise#readme)   | Enforce best practices for JavaScript promises      |
| [eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard#readme) | ESlint Plugin for the Standard Linter               |
| [jsdoc](https://github.com/jsdoc/jsdoc#readme)                                      | An API documentation generator for JavaScript       |

<div align="right">
  List of Packages generated by <a href="https://github.com/Drozerah/dep-to-doc-cli.git">Dep to Doc CLI</a> 1.2.0
</div>

Author
------

- Thomas G. aka Drozerah - [GitHub](https://github.com/Drozerah)

License
-------

- [MIT](https://github.com/Drozerah/draggable-element/blob/master/LICENSE) © Thomas G. aka Drozerah
