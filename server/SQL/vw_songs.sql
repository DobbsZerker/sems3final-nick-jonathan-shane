-- View: public.vw_songs

-- DROP VIEW public.vw_songs;

CREATE OR REPLACE VIEW public.vw_songs
 AS
 SELECT songs.song_id,
    songs.song_name,
    artist.artist_name AS artist,
    albums.album_name AS album
   FROM songs
     JOIN artist ON songs.artist_name::text = artist.artist_name::text
     JOIN albums ON songs.album_name = albums.album_name
  GROUP BY songs.song_id, artist.artist_name, albums.album_name
  ORDER BY songs.song_id;

ALTER TABLE public.vw_songs
    OWNER TO postgres;