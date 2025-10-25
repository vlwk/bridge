"use client";

import React from "react";
import { pageShellStyles as s } from "./styles/PageShell.styles";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return <main className={s.container}>{children}</main>;
}
