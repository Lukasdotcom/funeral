/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Candles {
  color: Generated<string>;
  date: Generated<string>;
  for_url: string;
  message: string;
  name: string;
  owner: string;
}

export interface People {
  album: string | null;
  birth: string;
  death: string;
  description: string;
  name: string;
  photo: string;
  url: string;
}

export interface DB {
  candles: Candles;
  people: People;
}
