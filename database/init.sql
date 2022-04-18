-- Table: address
CREATE TABLE address
(
    id              serial      NOT NULL,
    street          varchar(60) NOT NULL,
    registry_number varchar(10) NOT NULL,
    building_number varchar(10) NOT NULL,
    city            varchar(30) NOT NULL,
    zip_code_id     int         NOT NULL,
    CONSTRAINT address_pk PRIMARY KEY (id)
);

-- Table: loading_code
CREATE TABLE loading_code
(
    id   serial       NOT NULL,
    name varchar(255) NOT NULL,
    uid  varchar(4)   NOT NULL,
    CONSTRAINT loading_code_pk PRIMARY KEY (id)
);

-- Table: medical_company
CREATE TABLE medical_company
(
    id                  serial       NOT NULL,
    uid                 int          NOT NULL,
    territorial_unit_id int          NOT NULL,
    company_id          varchar(12)  NOT NULL,
    name                varchar(255) NOT NULL,
    contact_firstname   varchar(100) NULL,
    contact_lastname    varchar(100) NULL,
    contact_phone       int NULL,
    contact_email       varchar(100) NULL,
    address_id          int          NOT NULL,
    user_id             int          NOT NULL,
    CONSTRAINT worker_company_unique UNIQUE (uid, company_id, user_id) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT medical_company_pk PRIMARY KEY (id)
);

-- Table: record
CREATE TABLE record
(
    id               serial         NOT NULL,
    date             date           NOT NULL,
    amount           numeric(11, 6) NOT NULL,
    template_id      int            NOT NULL,
    waste_company_id int NULL,
    waste_id         int            NOT NULL,
    loading_code_id  int            NOT NULL,
    CONSTRAINT record_pk PRIMARY KEY (id)
);

-- Table: template
CREATE TABLE template
(
    id                 serial      NOT NULL,
    expired_at         timestamp NULL,
    title              varchar(50) NOT NULL,
    medical_company_id int         NOT NULL,
    user_id            int         NOT NULL,
    CONSTRAINT template_unique UNIQUE (title, user_id) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT template_pk PRIMARY KEY (id)
);

-- Table: template_loading_code
CREATE TABLE template_loading_code
(
    id              serial NOT NULL,
    template_id     int    NOT NULL,
    loading_code_id int    NOT NULL,
    CONSTRAINT template_loading_code_unique UNIQUE (template_id, loading_code_id) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT template_loading_code_pk PRIMARY KEY (id)
);

-- Table: template_waste
CREATE TABLE template_waste
(
    id          serial NOT NULL,
    template_id int    NOT NULL,
    waste_id    int    NOT NULL,
    CONSTRAINT template_waste_unique UNIQUE (template_id, waste_id) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT template_waste_pk PRIMARY KEY (id)
);

-- Table: territorial_unit
CREATE TABLE territorial_unit
(
    id   serial       NOT NULL,
    uid  int          NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT territorial_unit_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user"
(
    id           serial       NOT NULL,
    email        varchar(200) NOT NULL,
    password     varchar(100) NOT NULL,
    service_code varchar(10) NULL,
    verified_at  timestamp NULL,
    CONSTRAINT worker_unique UNIQUE (email) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: waste
CREATE TABLE waste
(
    id          serial       NOT NULL,
    uid         int          NOT NULL,
    category    varchar(3)   NOT NULL,
    name        varchar(255) NOT NULL,
    certificate varchar(20) NULL,
    CONSTRAINT waste_pk PRIMARY KEY (id)
);

-- Table: waste_company
CREATE TABLE waste_company
(
    id                  serial       NOT NULL,
    uid                 int          NOT NULL,
    territorial_unit_id int          NOT NULL,
    company_id          varchar(12)  NOT NULL,
    name                varchar(255) NOT NULL,
    type                int          NOT NULL,
    expired_at          timestamp NULL,
    address_id          int          NOT NULL,
    template_id         int          NOT NULL,
    CONSTRAINT waste_company_unique UNIQUE (uid, company_id, template_id) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT waste_company_pk PRIMARY KEY (id)
);

-- Table: zip_code
CREATE TABLE zip_code
(
    id   serial       NOT NULL,
    uid  int          NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT zip_code_pk PRIMARY KEY (id)
);

-- Reference: address_zip_code (table: address)
ALTER TABLE address
    ADD CONSTRAINT address_zip_code
        FOREIGN KEY (zip_code_id)
            REFERENCES zip_code (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: medical_company_address (table: medical_company)
ALTER TABLE medical_company
    ADD CONSTRAINT medical_company_address
        FOREIGN KEY (address_id)
            REFERENCES address (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: medical_company_territorial_unit (table: medical_company)
ALTER TABLE medical_company
    ADD CONSTRAINT medical_company_territorial_unit
        FOREIGN KEY (territorial_unit_id)
            REFERENCES territorial_unit (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: medical_company_user (table: medical_company)
ALTER TABLE medical_company
    ADD CONSTRAINT medical_company_user
        FOREIGN KEY (user_id)
            REFERENCES "user" (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: record_loading_code (table: record)
ALTER TABLE record
    ADD CONSTRAINT record_loading_code
        FOREIGN KEY (loading_code_id)
            REFERENCES loading_code (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: record_template (table: record)
ALTER TABLE record
    ADD CONSTRAINT record_template
        FOREIGN KEY (template_id)
            REFERENCES template (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: record_waste (table: record)
ALTER TABLE record
    ADD CONSTRAINT record_waste
        FOREIGN KEY (waste_id)
            REFERENCES waste (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: record_waste_company (table: record)
ALTER TABLE record
    ADD CONSTRAINT record_waste_company
        FOREIGN KEY (waste_company_id)
            REFERENCES waste_company (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: template_loading_code_loading_code (table: template_loading_code)
ALTER TABLE template_loading_code
    ADD CONSTRAINT template_loading_code_loading_code
        FOREIGN KEY (loading_code_id)
            REFERENCES loading_code (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: template_loading_code_template (table: template_loading_code)
ALTER TABLE template_loading_code
    ADD CONSTRAINT template_loading_code_template
        FOREIGN KEY (template_id)
            REFERENCES template (id) ON DELETE CASCADE
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: template_medical_company (table: template)
ALTER TABLE template
    ADD CONSTRAINT template_medical_company
        FOREIGN KEY (medical_company_id)
            REFERENCES medical_company (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: template_user (table: template)
ALTER TABLE template
    ADD CONSTRAINT template_user
        FOREIGN KEY (user_id)
            REFERENCES "user" (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: template_waste_template (table: template_waste)
ALTER TABLE template_waste
    ADD CONSTRAINT template_waste_template
        FOREIGN KEY (template_id)
            REFERENCES template (id) ON DELETE CASCADE
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: template_waste_waste (table: template_waste)
ALTER TABLE template_waste
    ADD CONSTRAINT template_waste_waste
        FOREIGN KEY (waste_id)
            REFERENCES waste (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: waste_company_address (table: waste_company)
ALTER TABLE waste_company
    ADD CONSTRAINT waste_company_address
        FOREIGN KEY (address_id)
            REFERENCES address (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: waste_company_template (table: waste_company)
ALTER TABLE waste_company
    ADD CONSTRAINT waste_company_template
        FOREIGN KEY (template_id)
            REFERENCES template (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: waste_company_territorial_unit (table: waste_company)
ALTER TABLE waste_company
    ADD CONSTRAINT waste_company_territorial_unit
        FOREIGN KEY (territorial_unit_id)
            REFERENCES territorial_unit (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;
