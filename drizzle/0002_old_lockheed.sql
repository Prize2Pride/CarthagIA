CREATE TABLE `audit_trail` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`action` varchar(255) NOT NULL,
	`resource_type` varchar(100) NOT NULL,
	`resource_id` int,
	`changes` text,
	`ip_address` varchar(45),
	`user_agent` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`blockchain_hash` varchar(255),
	CONSTRAINT `audit_trail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blockchain_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transaction_hash` varchar(255) NOT NULL,
	`type` enum('spending','approval','vote','audit') NOT NULL,
	`amount` decimal(15,2),
	`description` text,
	`from_address` varchar(255) NOT NULL,
	`to_address` varchar(255),
	`status` enum('pending','confirmed','failed') DEFAULT 'pending',
	`block_number` int,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blockchain_transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `blockchain_transactions_transaction_hash_unique` UNIQUE(`transaction_hash`)
);
--> statement-breakpoint
CREATE TABLE `budget_allocations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`department` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`allocated_amount` decimal(15,2) NOT NULL,
	`spent_amount` decimal(15,2) DEFAULT 0,
	`fiscal_year` int NOT NULL,
	`approved_by` int,
	`status` enum('pending','approved','rejected') DEFAULT 'pending',
	`blockchain_hash` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `budget_allocations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `corruption_alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`alert_type` enum('anomaly','pattern','conflict_of_interest','unusual_spending','duplicate_transaction') NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL,
	`description` text NOT NULL,
	`related_transaction_id` int,
	`related_user_id` int,
	`risk_score` int,
	`status` enum('open','investigating','resolved','false_positive') DEFAULT 'open',
	`investigated_by` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `corruption_alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `governance_proposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposal_number` varchar(50) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`titleAr` varchar(255) NOT NULL,
	`titleFr` varchar(255) NOT NULL,
	`descriptionEn` text,
	`descriptionAr` text,
	`descriptionFr` text,
	`proposed_by` int NOT NULL,
	`category` varchar(100) NOT NULL,
	`status` enum('draft','active','passed','failed','implemented') DEFAULT 'draft',
	`votes_for` int DEFAULT 0,
	`votes_against` int DEFAULT 0,
	`votes_abstain` int DEFAULT 0,
	`start_date` timestamp,
	`end_date` timestamp,
	`blockchain_hash` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `governance_proposals_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_proposals_proposal_number_unique` UNIQUE(`proposal_number`)
);
--> statement-breakpoint
CREATE TABLE `governance_votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposal_id` int NOT NULL,
	`user_id` int NOT NULL,
	`vote_type` enum('for','against','abstain') NOT NULL,
	`blockchain_hash` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_votes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `multi_sig_approvals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposal_id` varchar(255) NOT NULL,
	`proposal_type` varchar(100) NOT NULL,
	`proposal_data` text,
	`required_signatures` int NOT NULL,
	`current_signatures` int DEFAULT 0,
	`signers` text,
	`status` enum('pending','approved','rejected','expired') DEFAULT 'pending',
	`expires_at` timestamp,
	`blockchain_hash` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `multi_sig_approvals_id` PRIMARY KEY(`id`)
);
