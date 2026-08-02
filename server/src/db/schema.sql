-- Type: application_status
CREATE TYPE public.application_status AS ENUM
    ('SEM_RESPOSTA', 'ENTREVISTA', 'OFERTA', 'RECUSADO');
ALTER TYPE public.application_status
    OWNER TO postgres;

-- Table: public.users
CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.applications
CREATE TABLE IF NOT EXISTS public.applications
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    company text COLLATE pg_catalog."default" NOT NULL,
    "position" text COLLATE pg_catalog."default" NOT NULL,
    status application_status NOT NULL DEFAULT 'SEM_RESPOSTA'::application_status,
    link text COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default",
    applied_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    user_id uuid NOT NULL,
    CONSTRAINT applications_pkey PRIMARY KEY (id),
    CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.applications
    OWNER to postgres;