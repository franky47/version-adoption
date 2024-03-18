CREATE TABLE `packages` (
	`name` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `records` (
	`package` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`versions` text NOT NULL,
	`total` integer NOT NULL,
	FOREIGN KEY (`package`) REFERENCES `packages`(`name`) ON UPDATE no action ON DELETE no action
);
