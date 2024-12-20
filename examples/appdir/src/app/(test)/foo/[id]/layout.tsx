import { z } from "zod";
import { withLayoutParamValidation } from "next-typesafe-url/app/hoc";
import type { DynamicLayout, InferLayoutPropsType } from "next-typesafe-url";
import { Suspense } from "react";

const LayoutRoute = {
  routeParams: z.object({
    id: z.number(),
  }),
} satisfies DynamicLayout;
type LayoutType = typeof LayoutRoute;

type Props = InferLayoutPropsType<LayoutType, "modal">;
async function Inner({ children, routeParams, modal }: Props) {
  const params = await routeParams;
  return (
    <div className="border border-black">
      <h1>THIS IS A LAYOUT</h1>
      <p>{JSON.stringify(params)}</p>
      <div className="border border-black">{children}</div>
      <div className="border border-black">
        <h1>MODAL</h1>
        <div className="border border-green">{modal}</div>
      </div>
      <p>bottom</p>
    </div>
  );
}
function Layout(props: Props) {
  return (
    <Suspense>
      <Inner {...props} />
    </Suspense>
  );
}

export default withLayoutParamValidation<LayoutType, "modal">(
  Layout,
  LayoutRoute,
);
