import * as React from "react";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

export type WithChildren = IntrinsicAttributes & { children?: React.ReactNode };
