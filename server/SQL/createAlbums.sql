-- Table: public.albums

-- DROP TABLE IF EXISTS public.albums;

CREATE TABLE IF NOT EXISTS public.albums
(
    album_id integer NOT NULL,
    album_name text COLLATE pg_catalog."default",
    artist_id integer NOT NULL,
    CONSTRAINT albums_pkey PRIMARY KEY (album_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.albums
    OWNER to postgres;