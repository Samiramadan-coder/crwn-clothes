import { createSelector } from "reselect";

const seletDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
  [seletDirectory],
  directory => directory.sections
);