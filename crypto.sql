CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS crypto (
    cryptoid serial,
    guid uuid default uuid_generate_v4(),
    name text,
    code varchar(10),
    img text,
    price numeric,
    twentyfourhour numeric,
    marketcap numeric,
    datecreated timestamp without time zone default now()::timestamp without time zone,
    datemodified timestamp without time zone,
    datedeleted timestamp without time zone,
    CONSTRAINT crypto_cryptoid_pk PRIMARY KEY (cryptoid)
);




CREATE OR REPLACE FUNCTION crypto_trigger()
RETURNS TRIGGER
LANGUAGE 'plpgsql'
AS 
$$
DECLARE
BEGIN
    UPDATE crypto SET datemodified = now() WHERE cryptoid = NEW.cryptoid;
    RETURN NEW;
END;
$$;


CREATE OR REPLACE TRIGGER after_insert_update_cryptos
AFTER UPDATE ON crypto
FOR EACH ROW 
WHEN (pg_trigger_depth()<1)
EXECUTE FUNCTION crypto_trigger();

-- creating unique index
CREATE UNIQUE INDEX IF NOT EXISTS uqidx_crypto
ON crypto (code, COALESCE(datedeleted, '2019-04-24 06:31:19.771'::timestamp without time zone) ASC NULLS LAST)