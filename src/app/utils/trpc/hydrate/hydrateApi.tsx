"use client";
// https://www.answeroverflow.com/m/1169761966248693810#solution-1169765457809645609
import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

export default function HydrateApi(props: HydrateProps) {
  return <RQHydrate {...props} />;
}
