-- Table: public.artist

-- DROP TABLE IF EXISTS public.artist;

CREATE TABLE IF NOT EXISTS public.artist
(
    artist_id integer NOT NULL,
    artist_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT artist_pkey PRIMARY KEY (artist_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.artist
    OWNER to postgres;