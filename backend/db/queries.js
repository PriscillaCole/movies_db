const createMovies = 'CREATE TABLE "movies" ("id" integer NOT NULL,"background_path" character varying(255) NOT NULL "original_language" character varying(255) NOT NULL,"original_title" character varying(255) NOT NULL,"overview" text NOT NULL,"poster_path" character varying(255) NOT NULL,"release_date" date NOT NULL,"vote_average" integer NOT NULL,"vote_count" integer NOT NULL,"runtime" integer NOT NULL,"tagline" character varying(255) NOT NULL,"actors" jsonb NULL,"genres" jsonb NULL);'

const getMovies = 'SELECT * FROM "movies";'

// Server [localhost]: dpg-cps57o88fa8c7391nlhg-a.oregon-postgres.render.com
// Database [postgres]: movies_db_r8ja
// Port [5432]:
// Username [postgres]:  movies_db_r8ja_user
// Password for user movies_db_r8ja_user:

// psql (16.3)
// WARNING: Console code page (437) differs from Windows code page (1252)
//          8-bit characters might not work correctly. See psql reference
//          page "Notes for Windows users" for details.
// SSL connection (protocol: TLSv1.3, cipher: TLS_AES_128_GCM_SHA256, compression: off)
// Type "help" for help.

// movies_db_r8ja=> \conninfo
// You are connected to database "movies_db_r8ja" as user "movies_db_r8ja_user" on host "dpg-cps57o88fa8c7391nlhg-a.oregon-postgres.render.com" (address "35.227.164.209") at port "5432".
// SSL connection (protocol: TLSv1.3, cipher: TLS_AES_128_GCM_SHA256, compression: off)
// movies_db_r8ja=> CREATE TABLE movies (id integer NOT NULL,backg
// round_path character varying(255) NOT NULL original_language ch
// aracter varying(255) NOT NULL,original_title character varying(
// 255) NOT NULL,overview text NOT NULL,poster_path VARCHAR(255) NOT NULL,release_date date NOT NULL,vote_average integer NOT NULL,vote_count integer NOT NULL,runtime integer NOT NULL,tagline VARCHAR(255) NOT NULL,actors jsonb NULL,genres jsonb NULL);    ERROR:  syntax error at or near "original_language"
// LINE 1: ...L,background_path character varying(255) NOT NULL original_l...
//                                                              ^
// movies_db_r8ja=> CREATE TABLE "movies" (
// movies_db_r8ja(>     "id" integer NOT NULL,
// movies_db_r8ja(>     "background_path" character varying(255) NOT NULL,
// movies_db_r8ja(>     "original_language" character varying(255) NOT NULL,
// movies_db_r8ja(>     "original_title" character varying(255) NOT NULL,
// movies_db_r8ja(>     "overview" text NOT NULL,
// movies_db_r8ja(>     "poster_path" character varying(255) NOT NULL,
// movies_db_r8ja(>     "release_date" date NOT NULL,
// movies_db_r8ja(>     "vote_average" integer NOT NULL,
// movies_db_r8ja(>     "vote_count" integer NOT NULL,
// movies_db_r8ja(>     "runtime" integer NOT NULL,
// movies_db_r8ja(>     "tagline" character varying(255) NOT NULL,
// movies_db_r8ja(>     "actors" jsonb NULL,
// movies_db_r8ja(>     "genres" jsonb NULL
// movies_db_r8ja(> );
// CREATE TABLE
// movies_db_r8ja=> \dt
//                List of relations
//  Schema |  Name  | Type  |        Owner
// --------+--------+-------+---------------------
//  public | movies | table | movies_db_r8ja_user
// (1 row)


// movies_db_r8ja=>

    // https://dashboard.render.com/web/srv-cps51556l47c73e01q7g/deploys/dep-cps73c2j1k6c738isrdg