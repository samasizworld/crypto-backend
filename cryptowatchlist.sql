
CREATE TABLE IF NOT EXISTS cryptowatchlist (
    cryptowatchlistid serial,
    guid uuid default uuid_generate_v4(),
    cryptoid integer,
    maxprice numeric,
    minprice numeric,
    userid integer DEFAULT 1, -- for now it is set to 1, which is admin
    datecreated timestamp without time zone default now()::timestamp without time zone,
    datemodified timestamp without time zone,
    datedeleted timestamp without time zone,
    CONSTRAINT cryptowatchlist_cryptowatchlistid_pk PRIMARY KEY (cryptowatchlistid),
    CONSTRAINT cryptowatchlist_cryptoid_fk FOREIGN KEY (cryptoid)
    REFERENCES crypto(cryptoid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);




CREATE OR REPLACE FUNCTION cryptowatchlist_trigger()
RETURNS TRIGGER
LANGUAGE 'plpgsql'
AS 
$$
DECLARE
BEGIN
    UPDATE cryptowatchlist SET datemodified = now() WHERE cryptowatchlistid = NEW.cryptowatchlistid;
    RETURN NEW;
END;
$$;


CREATE OR REPLACE TRIGGER after_insert_update_cryptowatchlist
AFTER UPDATE ON cryptowatchlist
FOR EACH ROW 
WHEN (pg_trigger_depth()<1)
EXECUTE FUNCTION cryptowatchlist_trigger();
