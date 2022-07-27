-- DROP TABLE IF EXISTS public.songs;

CREATE TABLE IF NOT EXISTS public.songs
(
    song_id integer NOT NULL,
    song_name text COLLATE pg_catalog."default" NOT NULL,
    artist_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    album_name text COLLATE pg_catalog."default",
    CONSTRAINT songs_pkey PRIMARY KEY (song_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.songs
    OWNER to postgres;