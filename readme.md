# What is this?

You might run into a problem where old JS code tries to use `.__proto__`, which is doesn't (and shouldn't) exist on Deno and newer runtimes. This is a shim to make make that old code work.

# How do I use it?

The code is only 10 lines, but it needs to be in a file that is loaded before the code that uses `__proto__`.

```js
// this code should never change, so, for security
// use the URL that includes git-hash
import "https://raw.githubusercontent.com/jeff-hykin/deno_proto_shim/2056dfa77bd58ae826d5deedda1a5020717dda9c/main.js"
import "code_that_uses___proto__"
```

<!-- import "https://esm.sh/gh/jeff-hykin/deno_proto_shim@2056dfa77bd58ae826d5deedda1a5020717dda9c/main.js" -->

Sadly a solution like the following will not work because imports are always loaded first:
```js
// the patch
try {
  Object.defineProperty(Object.getPrototypeOf({}), "__proto__", {
    get() {
      return Object.getPrototypeOf(this);
    },
    set(value) {
      return Object.setPrototypeOf(this, value);
    }
  });
} catch (error) {
}

import "code_that_uses___proto__"
```

However, if you are able to modify the source code you can use the following:

```js
// the patch
try {
  Object.defineProperty(Object.getPrototypeOf({}), "__proto__", {
    get() {
      return Object.getPrototypeOf(this);
    },
    set(value) {
      return Object.setPrototypeOf(this, value);
    }
  });
} catch (error) {
}

// 
// the code that uses __proto__ HERE
// 
```
