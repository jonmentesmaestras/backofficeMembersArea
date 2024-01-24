use zmcrbvch_emailHacks;

CREATE TABLE `Facturas`
(
    `IDFactura`  int(11)        NOT NULL,
    `Codigo`     varchar(135)   NOT NULL,
    `Concepto`   varchar(100)   NOT NULL,
    `ValorTotal` decimal(10, 0) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1
  COLLATE = latin1_swedish_ci;


CREATE TABLE `Personas`
(
    `IDPersona`    int(11)     NOT NULL,
    `Nombre`       varchar(50) NOT NULL,
    `Apellido`     varchar(50) DEFAULT NULL,
    `Edad`         int(2)      DEFAULT NULL,
    `FK_IDPais`    int(11)     DEFAULT NULL,
    `FK_IDFactura` int(11)     NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1
  COLLATE = latin1_swedish_ci COMMENT ='Personas que son Clientes';


CREATE TABLE `Usuarios`
(
    `UserID`       int(11)     NOT NULL,
    `Email`        varchar(50) NOT NULL,
    `Password`     varchar(50) NOT NULL,
    `Active`       tinyint(1)  NOT NULL,
    `FK_IDPersona` int(11)     NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1
  COLLATE = latin1_swedish_ci COMMENT ='Users of the App Sniper';

CREATE TABLE AccesoTemporals
(
    RowID       INT          NOT NULL AUTO_INCREMENT,
    LinkID      varchar(255) NOT NULL UNIQUE,
    CreatedDate TIMESTAMP    NOT NULL,
    ValidUntil  TIMESTAMP    NOT NULL,
    FK_UserID   int(11)      NOT NULL,
    primary key (RowID),
    index ix_AccesoTemporal_LinkID (LinkID),
    constraint AccesoTemporal__Usuarios_UserID foreign key (FK_UserID) references Usuarios (UserID)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = latin1
    COLLATE = latin1_swedish_ci COMMENT ='Users of the App Sniper';

CREATE TABLE IssuesSuggestions
(
    RowID       INT          NOT NULL AUTO_INCREMENT,
    UUID        VARCHAR(255) NOT NULL UNIQUE,
    Suggestion  LONGTEXT,
    CreatedDate TIMESTAMP    NOT NULL,
    FK_UserID   INT(11)      NOT NULL,
    Active      TINYINT,
    primary key (RowID),
    index ix_IssuesSuggestion_UUID (UUID),
    constraint IssuesSuggestion__Usuarios_UserID foreign key (FK_UserID) references Usuarios (UserID)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = latin1
    COLLATE = latin1_swedish_ci COMMENT ='Users of the App Sniper';


--
-- Indexes for dumped tables
--

--
-- Indexes for table `Facturas`
--
ALTER TABLE `Facturas`
    ADD PRIMARY KEY (`IDFactura`);

--
-- Indexes for table `Personas`
--
ALTER TABLE `Personas`
    ADD PRIMARY KEY (`IDPersona`),
    ADD UNIQUE KEY `FK_IDFactura` (`FK_IDFactura`),
    ADD KEY `IDX_Pais` (`FK_IDPais`),
    ADD KEY `IDX_Factura` (`FK_IDFactura`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
    ADD PRIMARY KEY (`UserID`),
    ADD UNIQUE KEY `FK_IDPersona` (`FK_IDPersona`),
    ADD UNIQUE KEY `Email` (`Email`),
    ADD KEY `IX_IDPersona` (`FK_IDPersona`),
    ADD KEY `Email_2` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Facturas`
--
ALTER TABLE `Facturas`
    MODIFY `IDFactura` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 29;

--
-- AUTO_INCREMENT for table `Personas`
--
ALTER TABLE `Personas`
    MODIFY `IDPersona` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 14;

--
-- AUTO_INCREMENT for table `Usuarios`
--
ALTER TABLE `Usuarios`
    MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Personas`
--
ALTER TABLE `Personas`
    ADD CONSTRAINT `FK_Persona_Facturas` FOREIGN KEY (`FK_IDFactura`) REFERENCES `Facturas` (`IDFactura`);

--
-- Constraints for table `Usuarios`
--
ALTER TABLE `Usuarios`
    ADD CONSTRAINT `FK_Usuarios_Personas` FOREIGN KEY (`FK_IDPersona`) REFERENCES `Personas` (`IDPersona`);
COMMIT;