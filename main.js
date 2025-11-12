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