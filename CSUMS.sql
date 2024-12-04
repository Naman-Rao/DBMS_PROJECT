DROP DATABASE IF EXISTS csums;
CREATE DATABASE IF NOT EXISTS csums;
USE csums;

-- DEFINE TABLES -- 

CREATE TABLE Users(
	UserID char(10),
	FirstName varchar(30),
	LastName varchar(30),
	DateOfBirth Date,
	RegID char(10),
	AccountID char(10)
);
CREATE TABLE Accounts(
	AccountID char(10),
	Username varchar(30),
	Password varchar(256),
	Country varchar(30),
	MailID varchar(30),
	BillingID char(10)
);
CREATE TABLE SubscriptionAndBilling(
	BillingID char(10),
	Balance float,
	Pending enum('YES', 'NO'),
	Status enum(
		'QUEUED',
		'PAUSED',
		'KILLED',
		'ACTIVE',
		'INACTIVE'
	),
	Duration Timestamp
);
CREATE TABLE Job(
	JobID char(10),
	JobName varchar(30),
	Duration Timestamp,
	StartDate Date,
	Status enum('QUEUED', 'PAUSED', 'KILLED', 'ACTIVE'),
	UserID char(10),
	ClusterID char(10),
	ServiceID char(10)
);

CREATE TABLE Service(
	ServiceID char(10),
	Price float,
	Endpoint varchar(30),
    LoadBalance enum('YES','NO'),
	DeployEnv varchar(30),
	CSPID char(10)
);

CREATE TABLE Node(
	IPAddress varchar(15),
	CPU int,
	RAM int,
	Storage int,
	GPU int,
	ClusterID char(10)
);

CREATE TABLE Cluster(
	ClusterID char(10),
	NodeCount int,
    Status enum("UP","DOWN","UNREACHABLE"),
    Type enum("GPU","CPU","Storage","Hybrid"),
	Owner varchar(30),
	CSPID char(10)
);

CREATE TABLE ConfigsAndLogs(
	LogID char(10),
	DateOfCreation Date,
	ModifyDate Date,
    LogLevel enum("WARNING","INFO","ERROR"),
	Parameters JSON,
	AdminID char(10)
);

CREATE TABLE ExternalCSP(
	CSPID char(10),
	CSPName varchar(30),
	PlanID char(10),
	PlanName varchar(30),
	Docs TEXT
);

CREATE TABLE Admin(
	AdminID char(10),
	Age int,
	RoleTitle varchar(30),
	UserName varchar(30),
	Password varchar(256),
	MailID varchar(30)
);

CREATE TABLE Logs(
	JobID char(10),
    LogID char(10)
);

-- ADD CONSTRAINTS --

ALTER TABLE Users ADD CONSTRAINT Primary Key(UserID);

ALTER TABLE Accounts ADD CONSTRAINT Primary Key(AccountID);
ALTER TABLE Users ADD CONSTRAINT Foreign Key(AccountID) References Accounts(AccountID) ON DELETE CASCADE;

ALTER TABLE SubscriptionAndBilling ADD CONSTRAINT Primary Key(BillingID);
ALTER TABLE Accounts ADD CONSTRAINT Foreign Key(BillingID) References SubscriptionAndBilling(BillingID) ON DELETE CASCADE;

ALTER TABLE Job ADD CONSTRAINT Primary Key(JobID);
ALTER TABLE Job ADD CONSTRAINT Foreign Key(UserID) References Users(UserID) ON DELETE CASCADE;
ALTER TABLE Job ADD CONSTRAINT Foreign Key(ServiceID) References Service(ServiceID);

ALTER TABLE Service ADD CONSTRAINT Primary Key(ServiceID);

ALTER TABLE Node ADD CONSTRAINT Primary Key(IPAddress);

ALTER TABLE ConfigsAndLogs ADD CONSTRAINT Primary Key(LogID);

ALTER TABLE Cluster ADD CONSTRAINT Primary Key(ClusterID);
ALTER TABLE Job ADD CONSTRAINT Foreign Key(ClusterID) References Cluster(ClusterID);
ALTER TABLE Node ADD CONSTRAINT Foreign Key(ClusterID) References Cluster(ClusterID);

ALTER TABLE ExternalCSP ADD CONSTRAINT Primary Key(CSPID);
ALTER TABLE Service ADD CONSTRAINT Foreign Key(CSPID) References ExternalCSP(CSPID);
ALTER TABLE Cluster ADD CONSTRAINT Foreign Key(CSPID) References ExternalCSP(CSPID);

ALTER TABLE Admin ADD CONSTRAINT Primary Key (AdminID);
ALTER TABLE ConfigsAndLogs ADD CONSTRAINT Foreign Key (AdminID) References Admin(AdminID);

ALTER TABLE Logs ADD CONSTRAINT Primary Key(JobID,LogID);
ALTER TABLE Logs ADD CONSTRAINT Foreign Key(JobID) References Job(JobID);
ALTER TABLE Logs ADD CONSTRAINT Foreign Key(LogID) References ConfigsAndLogs(LogID);


-- INSERT CSPS --
INSERT INTO EXTERNALCSP
VALUES (
		'CSP0000001',
		'AMAZON',
		'AWS0000001',
		'EC2',
		"Amazon Elastic Compute Cloud is a part of Amazon's cloud-computing platform, Amazon Web Services, that allows users to rent virtual computers on which to run their own computer applications."
	);
INSERT INTO EXTERNALCSP
VALUES (
		'CSP0000001',
		'AMAZON',
		'AWS0000002',
		'S3',
		'Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. Millions of customers of all sizes and industries store, manage, analyze, and protect any amount of data for virtually any use case, such as data lakes, cloud-native applications, and mobile apps.'
	);
INSERT INTO EXTERNALCSP
VALUES (
		'CSP0000001',
		'AMAZON',
		'AWS0000003',
		'AURORA',
		'Amazon Aurora provides unparalleled high-performance and availability at global scale with full MySQL and PostgreSQL compatibility, at 1/10th the cost of commercial databases. Aurora has 5x the throughput of MySQL and 3x of PostgreSQL.'
	);
INSERT INTO EXTERNALCSP
VALUES (
		'CSP0000001',
		'GOOGLE',
		'GCP0000001',
		'VERTEXAI',
		'Vertex AI is a fully-managed, unified AI development platform for building and using generative AI. Access and utilize Vertex AI Studio, Agent Builder, and 150+ foundation models.'
	);
INSERT INTO EXTERNALCSP
VALUES (
		'CSP0000002',
		'GOOGLE',
		'GCP0000002',
		'BIGQUERY',
		'BigQuery is a fully managed, AI-ready data analytics platform that helps you maximize value from your data and is designed to be multi-engine, multi-format, and multi-cloud.'
	);
-- INSERT CLUSTERS AND NODES--

INSERT INTO CLUSTER VALUES ('GLOAWS_001',10,'UP','HYBRID','AMAZON','CSP0000001');

INSERT INTO NODE VALUES ('10.0.0.2',8,16,512,8,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.3',16,16,512,8,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.4',16,16,512,8,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.5',16,32,512,16,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.6',32,32,512,16,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.7',32,32,1024,16,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.8',32,64,1024,32,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.9',32,64,1024,32,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.10',64,64,1024,64,'GLOAWS_001');
INSERT INTO NODE VALUES ('10.0.0.11',64,64,1024,64,'GLOAWS_001');

INSERT INTO CLUSTER VALUES ('GLOAWS_002',5,'UP','STORAGE','AMAZON','CSP0000001');

INSERT INTO NODE VALUES ('10.0.1.2',4,16,256,0,'GLOAWS_002');
INSERT INTO NODE VALUES ('10.0.1.3',4,16,512,0,'GLOAWS_002');
INSERT INTO NODE VALUES ('10.0.1.4',8,32,5120,0,'GLOAWS_002');
INSERT INTO NODE VALUES ('10.0.1.5',8,32,51200,2,'GLOAWS_002');
INSERT INTO NODE VALUES ('10.0.1.6',16,64,51200,4,'GLOAWS_002');

INSERT INTO CLUSTER VALUES ('GLOGOOG_01',15,'UP','GPU','GOOGLE','CSP0000002');

INSERT INTO NODE VALUES ('20.0.0.2',4,16,256,8,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.3',4,16,256,8,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.4',8,16,256,16,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.5',8,16,512,16,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.6',8,32,512,24,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.7',16,32,512,24,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.8',16,32,512,40,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.9',16,32,1024,40,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.10',16,64,1024,48,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.11',16,64,2048,48,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.12',32,64,2048,64,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.13',32,64,4096,64,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.14',32,128,4096,80,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.15',32,128,8192,80,'GLOGOOG_01');
INSERT INTO NODE VALUES ('20.0.0.16',32,128,8192,100,'GLOGOOG_01');

INSERT INTO CLUSTER VALUES ('GLOGOOG_02',4,'UP','CPU','GOOGLE','CSP0000002');

INSERT INTO NODE VALUES ('20.0.1.2',16,16,256,2,'GLOGOOG_02');
INSERT INTO NODE VALUES ('20.0.1.3',32,32,512,2,'GLOGOOG_02');
INSERT INTO NODE VALUES ('20.0.1.4',64,64,512,4,'GLOGOOG_02');
INSERT INTO NODE VALUES ('20.0.1.5',128,128,1024,4,'GLOGOOG_02');

-- INSERT SERVICES --

INSERT INTO Service (ServiceID, Price, Endpoint, LoadBalance, DeployEnv, CSPID) 
VALUES 
('SVC001', 99.99, 'api.amazon.com/v1', 'YES', 'Production', 'CSP0000001'),
('SVC002', 49.50, 'api.amazon.com/v2', 'NO', 'Staging', 'CSP0000001'),
('SVC003', 29.99, 'api.amazon.com/v3', 'YES', 'Development', 'CSP0000001'),
('SVC004', 149.00, 'api.amazon.com/v4', 'YES', 'Production', 'CSP0000001'),
('SVC005', 199.99, 'api.amazon.com/v5', 'NO', 'Testing', 'CSP0000001');

INSERT INTO Service (ServiceID, Price, Endpoint, LoadBalance, DeployEnv, CSPID) 
VALUES 
('SVC006', 120.00, 'api.google.com/v1', 'YES', 'Production', 'CSP0000002'),
('SVC007', 75.75, 'api.google.com/v2', 'NO', 'Staging', 'CSP0000002'),
('SVC008', 45.25, 'api.google.com/v3', 'YES', 'Development', 'CSP0000002'),
('SVC009', 180.00, 'api.google.com/v4', 'YES', 'Production', 'CSP0000002'),
('SVC010', 220.50, 'api.google.com/v5', 'NO', 'Testing', 'CSP0000002');

DELIMITER //

CREATE TRIGGER USER_BALANCE
BEFORE INSERT ON SubscriptionAndBilling
FOR EACH ROW
BEGIN
    IF NEW.BALANCE < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Balance cannot be negative';
    END IF;
END //

DELIMITER ;

DELIMITER //
CREATE TRIGGER SERVICE_PRICE
BEFORE INSERT ON SERVICE
FOR EACH ROW
BEGIN
	IF NEW.PRICE < 0 THEN
		SIGNAL SQLSTATE '45000';
END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER SERVICE_PRICE
BEFORE INSERT ON SERVICE
FOR EACH ROW
BEGIN
	IF NEW.PRICE < 0 THEN
		SIGNAL SQLSTATE '45000';
END IF;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE CLUSTER_CALC(IN CLUSTER_ID CHAR(10))
BEGIN
    SELECT
        CLUSTERID,
        SUM(CPU) AS TOTAL_CPU,
        SUM(RAM) AS TOTAL_RAM,
        SUM(STORAGE) AS TOTAL_STORAGE,
        SUM(GPU) AS TOTAL_GPU
    FROM
        NODE
    WHERE
        CLUSTERID = CLUSTER_ID  -- Use the parameter directly here
    GROUP BY
        CLUSTERID;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EXECUTE_ON_EACH_CLUSTER()
BEGIN
    -- Declare necessary variables
    DECLARE done INT DEFAULT 0;
    DECLARE cluster_id CHAR(10);

    -- Declare a cursor to select all Cluster IDs from the Cluster table
    DECLARE cluster_cursor CURSOR FOR
        SELECT ClusterID FROM Cluster;

    -- Declare a handler for the cursor when no more rows are found
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Open the cursor
    OPEN cluster_cursor;

    -- Start the loop to process each CLUSTER_ID
    read_loop: LOOP
        FETCH cluster_cursor INTO cluster_id;  -- Fetch the current cluster_id into the variable

        IF done THEN
            LEAVE read_loop;  -- Exit the loop if no more rows are found
        END IF;

        -- Call the CLUSTER_CALC procedure for the current cluster_id
        CALL CLUSTER_CALC(cluster_id);

        -- Optionally, flush the table to ensure that the changes are committed
        FLUSH TABLES;

    END LOOP;

    -- Close the cursor
    CLOSE cluster_cursor;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE UPDATEUSER(IN USERID CHAR(10),IN USERNAME VARCHAR(30),IN PASSWORD VARCHAR(30))
BEGIN
UPDATE USER
    JOIN ACCOUNT ON USER.ACCOUNTID=ACCOUNT.ACCOUNTID
		SET ACCOUNT.USERNAME=USERNAME,ACCOUNT.PASSWORD=PASSWORD
	WHERE USER.USERID=USERID;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION TOTAL_COST(USERIDVAR CHAR(10))
RETURNS INT
	SELECT
        SUM(S.BALANCE) AS TOTAL_COST
    FROM
		SUBSCRIPTIONANDBILLING S
	JOIN
		ACCOUNT A ON S.BILLINGID=A.BILLINGID
	JOIN
		USER U ON U.USERID=A.ACCOUNTID
    GROUP BY
		U.USERID
    HAVING
		U.USERID=USERIDVAR;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GETJOBS(IN USERIDVAR CHAR(10))
BEGIN
	SELECT
		U.USERID,
	J.JOBID,
	J.JOBNAME,
	J.STARTDATE,
	J.STATUS
	FROM
		USER U
	JOIN
		JOB J ON U.USERID=J.USERID
	WHERE
		J.USERID=USERIDVAR;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GETLOGS(IN USERIDVAR CHAR(10),IN ADMINIDVAR CHAR(10))
BEGIN
	SELECT
		*
    FROM
		CONFIGSANDLOGS C
WHERE C.LOGID IN (
		SELECT 
			L.LOGID
		FROM 
			LOGS L
		WHERE L.JOBID IN
		(SELECT 
			J.JOBID
		FROM
			JOB J
		JOIN
			USER U ON J.USERID=U.USERID
		WHERE
			U.USERID=USERIDVAR)
    ) AND 
    C.ADMINID=ADMINIDVAR;
END //
DELIMITER ;

DELIMITER $$

CREATE PROCEDURE create_users()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE uname VARCHAR(30);
    DECLARE pass VARCHAR(256);
    DECLARE account_id CHAR(10);
    DECLARE cur CURSOR FOR SELECT Username, Password, AccountID FROM Accounts;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO uname, pass, account_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Check if user already exists in MySQL
        SET @user_exists = (SELECT COUNT(*) FROM mysql.user WHERE user = uname AND host = 'localhost');
        
        IF @user_exists = 0 THEN
            -- User does not exist, create the user
            SET @create_user_query = CONCAT('CREATE USER IF NOT EXISTS ''', uname, '''@''localhost'' IDENTIFIED BY ''', pass, ''';');
            PREPARE stmt FROM @create_user_query;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
            
            -- Grant INSERT and SELECT privileges on the 'job' table of 'csums' database
            SET @grant_query = CONCAT('GRANT INSERT, SELECT ON csums.Job TO ''', uname, '''@''localhost'';');
            PREPARE stmt FROM @grant_query;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
            
            -- Apply privileges (flush privileges)
            FLUSH PRIVILEGES;
            
            -- Print a message for success
            SELECT CONCAT('User ', uname, ' created successfully with INSERT and SELECT privileges on job for AccountID ', account_id) AS message;
        ELSE
            -- User already exists
            SELECT CONCAT('User ', uname, ' already exists.') AS message;
        END IF;

    END LOOP;

    CLOSE cur;
END $$

DELIMITER ;


-- INSERT INTO ConfigsAndLogs Values ('LOG0000002','2024-10-24','2024-11-24','WARNING','{"pid": 101, "name": "name1"}','dbab7d4697');
