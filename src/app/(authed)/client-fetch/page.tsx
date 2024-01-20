"use client";

import { ExampleComponent } from "./Example";

export default function Client() {
  return (
    <div>
      <h1 className="mb-3 text-xl font-medium">
        Client Side Component Example
      </h1>
      <div className="mb-3">
        This is an example of a page that fetches and mutates data from the
        client side using the pregenerated react query hooks. These hooks are
        fully type safe.
      </div>
      <ExampleComponent />
    </div>
  );
}
