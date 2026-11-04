package com.library.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseSchemaUpdater implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        migratePosterUrlToLongText();
        migrateMessageAttachmentColumns();
    }

    public synchronized void migrateMessageAttachmentColumns() {
        try {
            log.info("Checking messages and message_attachments schema for image attachments...");
            try {
                jdbcTemplate.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachment_url LONGTEXT");
            } catch (Exception ex) {
                log.warn("Notice adding messages.attachment_url: {}", ex.getMessage());
            }
            try {
                jdbcTemplate.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachment_name VARCHAR(255)");
            } catch (Exception ex) {
                log.warn("Notice adding messages.attachment_name: {}", ex.getMessage());
            }
            try {
                jdbcTemplate.execute("ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachment_type VARCHAR(50)");
            } catch (Exception ex) {
                log.warn("Notice adding messages.attachment_type: {}", ex.getMessage());
            }
            try {
                jdbcTemplate.execute("ALTER TABLE message_attachments MODIFY COLUMN external_url LONGTEXT");
            } catch (Exception ex) {
                log.warn("Notice modifying message_attachments.external_url: {}", ex.getMessage());
            }
            log.info("Successfully updated schema for chat attachments.");
        } catch (Exception ex) {
            log.warn("Notice in migrateMessageAttachmentColumns: {}", ex.getMessage());
        }
    }

    public synchronized void migratePosterUrlToLongText() {
        try {
            log.info("Checking contents table schema for poster_url...");
            String dataType = null;
            try {
                dataType = jdbcTemplate.queryForObject(
                        "SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'contents' AND COLUMN_NAME = 'poster_url' LIMIT 1",
                        String.class
                );
            } catch (Exception ex) {
                log.warn("Could not query information_schema for contents.poster_url: {}", ex.getMessage());
            }

            log.info("Current contents.poster_url DATA_TYPE is: {}", dataType);
            if (dataType == null || !dataType.equalsIgnoreCase("longtext")) {
                // Try Strategy 1: Direct MODIFY COLUMN
                boolean success = false;
                try {
                    jdbcTemplate.execute("ALTER TABLE contents MODIFY COLUMN poster_url LONGTEXT");
                    log.info("Strategy 1 (MODIFY COLUMN) succeeded!");
                    success = true;
                } catch (Exception e1) {
                    log.warn("Strategy 1 failed ({}), trying Strategy 2 (ADD/COPY/DROP/RENAME)...", e1.getMessage());
                }

                // Strategy 2: TiDB safe migration (Add LONGTEXT column, copy data, drop old, rename new)
                if (!success) {
                    try {
                        try {
                            jdbcTemplate.execute("ALTER TABLE contents ADD COLUMN poster_long LONGTEXT");
                        } catch (Exception ignored) {}
                        try {
                            jdbcTemplate.execute("UPDATE contents SET poster_long = poster_url WHERE poster_url IS NOT NULL");
                        } catch (Exception ignored) {}
                        try {
                            jdbcTemplate.execute("ALTER TABLE contents DROP COLUMN poster_url");
                        } catch (Exception ignored) {}
                        try {
                            jdbcTemplate.execute("ALTER TABLE contents CHANGE COLUMN poster_long poster_url LONGTEXT");
                            log.info("Strategy 2 (ADD/COPY/DROP/RENAME) succeeded!");
                            success = true;
                        } catch (Exception e2) {
                            log.warn("Strategy 2 rename failed ({}), trying Strategy 3 (DROP & ADD)...", e2.getMessage());
                        }
                    } catch (Exception ignored) {}
                }

                // Strategy 3: Drop & re-add poster_url LONGTEXT
                if (!success) {
                    try {
                        try {
                            jdbcTemplate.execute("ALTER TABLE contents DROP COLUMN poster_url");
                        } catch (Exception ignored) {}
                        jdbcTemplate.execute("ALTER TABLE contents ADD COLUMN poster_url LONGTEXT");
                        log.info("Strategy 3 (DROP & ADD LONGTEXT) succeeded!");
                        success = true;
                    } catch (Exception e3) {
                        log.error("Strategy 3 failed: {}", e3.getMessage());
                    }
                }
            } else {
                log.info("Column contents.poster_url is already LONGTEXT.");
            }
        } catch (Exception e) {
            log.warn("Notice in migratePosterUrlToLongText: {}", e.getMessage());
        }
    }
}
