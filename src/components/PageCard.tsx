"use client";

import React from "react";
import { pageCardStyles as s } from "./styles/PageCard.styles";

interface PageCardProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageCard({ title, actions, children }: PageCardProps) {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        {actions ? <div className={s.actions}>{actions}</div> : null}
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
}
