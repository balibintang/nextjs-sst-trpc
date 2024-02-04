import HydrateApi from "@/app/utils/trpc/hydrate/hydrateApi";
import { ExampleComponent } from "../client-fetch/Example";
import { createApiCaller } from "@/app/utils/trpc/server";
import { headers } from "next/headers";

export default async function Server() {
  const api = await createApiCaller();
  const a = await api.user.userDetails.fetch();
  const dehydratedState = await api.dehydrate();

  return (
    <HydrateApi state={dehydratedState}>
      <div>
        <h1 className="mb-3 text-xl font-medium">
          Server Side Hydrated Client Page
        </h1>
        <div className="mb-3">
          This is an example of a page that fetches the component on the server
          side and then hydrates the component so it has access to all of the
          query data. It is using the same component as the client side example
          but the data is fetched on the server side.
          <br />
          You can see that the data is server side fetched by looking at the
          network tab in your browser.
        </div>
        <ExampleComponent />
      </div>
    </HydrateApi>
  );
}
