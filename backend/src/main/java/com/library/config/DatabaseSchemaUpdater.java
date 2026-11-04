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
        try {
            log.info("Updating table contents poster_url column to LONGTEXT...");
            jdbcTemplate.execute("ALTER TABLE contents MODIFY COLUMN poster_url LONGTEXT");
            log.info("Successfully altered contents poster_url to LONGTEXT");
        } catch (Exception e) {
            log.warn("Notice on altering poster_url (may already be updated): {}", e.getMessage());
        }
    }
}
