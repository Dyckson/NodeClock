CREATE TABLE public.clock
(
    id integer NOT NULL DEFAULT nextval('clock_id_seq'::regclass),
    hour integer NOT NULL,
    minute integer NOT NULL,
    date date,
    angle integer,
    CONSTRAINT clock_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.clock
    OWNER to postgres;