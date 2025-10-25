"use client";

import { boardStyles as s } from "./Board.styles";

export default function Board() {
  return (
    <div className={s.container}>
      <span className={s.label}>Board</span>
    </div>
  );
}
