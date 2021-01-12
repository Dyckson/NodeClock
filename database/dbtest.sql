--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1 (Ubuntu 13.1-1.pgdg20.04+1)

-- Started on 2021-01-12 17:40:57 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16582)
-- Name: clock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clock (
    id integer NOT NULL,
    hour integer NOT NULL,
    minute integer NOT NULL,
    date date,
    angle integer
);


ALTER TABLE public.clock OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16580)
-- Name: clock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clock_id_seq OWNER TO postgres;

--
-- TOC entry 2970 (class 0 OID 0)
-- Dependencies: 202
-- Name: clock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clock_id_seq OWNED BY public.clock.id;


--
-- TOC entry 2834 (class 2604 OID 16585)
-- Name: clock id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clock ALTER COLUMN id SET DEFAULT nextval('public.clock_id_seq'::regclass);


--
-- TOC entry 2964 (class 0 OID 16582)
-- Dependencies: 203
-- Data for Name: clock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clock (id, hour, minute, date, angle) FROM stdin;
75	0	0	2021-01-12	0
76	1	0	2021-01-12	30
77	2	0	2021-01-12	60
78	3	0	2021-01-12	90
79	5	0	2021-01-12	150
80	5	59	2021-01-12	175
81	8	0	2021-01-12	120
82	8	10	2021-01-12	175
83	8	15	2021-01-12	158
84	11	0	2021-01-12	30
85	10	0	2021-01-12	60
\.


--
-- TOC entry 2971 (class 0 OID 0)
-- Dependencies: 202
-- Name: clock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clock_id_seq', 85, true);


--
-- TOC entry 2836 (class 2606 OID 16587)
-- Name: clock clock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clock
    ADD CONSTRAINT clock_pkey PRIMARY KEY (id);


-- Completed on 2021-01-12 17:41:00 -03

--
-- PostgreSQL database dump complete
--

