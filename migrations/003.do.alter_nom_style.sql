CREATE TYPE nom_category AS ENUM (
  'Nom',
  'Recipe'
);

ALTER TABLE noms
  ADD COLUMN
    style nom_category;
