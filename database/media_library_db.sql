-- phpMyAdmin SQL Dump
-- Cơ sở dữ liệu: `media_library_db`
-- Hệ thống: Quản lý Thư viện Truyện, Phim Cá nhân và Chia sẻ Cộng đồng
-- Hỗ trợ: MySQL / MariaDB (XAMPP)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `media_library_db`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `media_library_db`;

-- ============================================================================
-- NHÓM 1: TÀI KHOẢN & PHÂN QUYỀN (Mục 2 & Mục 10)
-- ============================================================================

-- 1. Bảng `roles`: Vai trò hệ thống
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_roles_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng `permissions`: Quyền hạn chi tiết
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_permissions_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng `role_permissions`: Liên kết Vai trò - Quyền hạn
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  KEY `idx_rp_permission` (`permission_id`),
  CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rp_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng `users`: Tài khoản người dùng
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `status` enum('ACTIVE','LOCKED','BANNED') NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_username` (`username`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- NHÓM 2: NỘI DUNG TRUYỆN, PHIM, THỂ LOẠI & CHƯƠNG/TẬP (Mục 3, 4 & Mục 10)
-- ============================================================================

-- 5. Bảng `genres`: Thể loại (Kinh dị, Hành động, Tình cảm, Giả tưởng...)
CREATE TABLE IF NOT EXISTS `genres` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_genres_name` (`name`),
  UNIQUE KEY `uk_genres_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng `contents`: Thông tin gốc của bộ truyện hoặc phim
CREATE TABLE IF NOT EXISTS `contents` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content_type` enum('MANGA','MOVIE') NOT NULL,
  `is_series` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1: Truyện nhiều chương / Phim bộ, 0: Phim lẻ / Oneshot',
  `poster_url` varchar(255) DEFAULT NULL,
  `author_or_director` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('ONGOING','COMPLETED','HIATUS') DEFAULT 'ONGOING',
  `external_main_link` varchar(500) DEFAULT NULL,
  `visibility` enum('PRIVATE','SHARED','PUBLIC') NOT NULL DEFAULT 'PRIVATE' COMMENT 'Chế độ hiển thị của nội dung do người tạo thiết lập',
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_contents_created_by` (`created_by`),
  KEY `idx_contents_type_status` (`content_type`, `status`),
  KEY `idx_contents_title` (`title`),
  CONSTRAINT `fk_contents_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Bảng `content_genres`: Quan hệ nhiều-nhiều giữa Nội dung và Thể loại
CREATE TABLE IF NOT EXISTS `content_genres` (
  `content_id` bigint(20) NOT NULL,
  `genre_id` bigint(20) NOT NULL,
  PRIMARY KEY (`content_id`, `genre_id`),
  KEY `idx_cg_genre` (`genre_id`),
  CONSTRAINT `fk_cg_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cg_genre` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Bảng `content_links`: Nhiều đường dẫn đọc/xem cho một bộ truyện hoặc phim (Mục 3.1)
CREATE TABLE IF NOT EXISTS `content_links` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) NOT NULL,
  `platform_name` varchar(100) NOT NULL COMMENT 'Tên nền tảng: Netflix, MangaDex, VieON, Bilibili...',
  `url` varchar(500) NOT NULL,
  `added_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_cl_content` (`content_id`),
  KEY `idx_cl_added_by` (`added_by`),
  CONSTRAINT `fk_cl_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cl_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Bảng `seasons`: Mùa phim (dành cho phim bộ nhiều mùa - Mục 4.1)
CREATE TABLE IF NOT EXISTS `seasons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) NOT NULL,
  `season_number` int(11) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_seasons_content` (`content_id`),
  CONSTRAINT `fk_seasons_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Bảng `chapters`: Chương truyện hoặc Tập phim (Mục 4.2)
CREATE TABLE IF NOT EXISTS `chapters` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) NOT NULL,
  `season_id` bigint(20) DEFAULT NULL,
  `chapter_number` decimal(6,1) NOT NULL COMMENT 'Số chương/tập, hỗ trợ số lẻ như chương 10.5',
  `display_order` int(11) NOT NULL DEFAULT 1 COMMENT 'Thứ tự hiển thị khi sắp xếp',
  `title` varchar(200) DEFAULT NULL,
  `external_link` varchar(500) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_chapters_content` (`content_id`),
  KEY `idx_chapters_season` (`season_id`),
  KEY `idx_chapters_order` (`content_id`, `display_order`),
  CONSTRAINT `fk_chapters_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_chapters_season` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Bảng `chapter_links`: Nhiều đường dẫn dự phòng cho từng chương/tập (Mục 4.2 & Mục 10)
CREATE TABLE IF NOT EXISTS `chapter_links` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint(20) NOT NULL,
  `platform_name` varchar(100) DEFAULT 'Link đọc/xem',
  `url` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_chl_chapter` (`chapter_id`),
  CONSTRAINT `fk_chl_chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- NHÓM 3: THƯ VIỆN CÁ NHÂN, DANH MỤC, YÊU THÍCH & TIẾN ĐỘ (Mục 3, 5, 6 & Mục 10)
-- ============================================================================

-- 12. Bảng `user_libraries`: Lưu trữ nội dung trong thư viện riêng của từng người dùng
CREATE TABLE IF NOT EXISTS `user_libraries` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `source_user_id` bigint(20) DEFAULT NULL COMMENT 'Người đã chia sẻ nội dung này (nếu lưu từ bản chia sẻ)',
  `reading_status` enum('PLAN_TO_READ','READING','COMPLETED','DROPPED') DEFAULT 'PLAN_TO_READ',
  `visibility` enum('PRIVATE','SHARED','SPECIFIC_USERS') DEFAULT 'PRIVATE',
  `is_favorite` tinyint(1) NOT NULL DEFAULT 0,
  `personal_rating` tinyint(4) DEFAULT NULL CHECK (`personal_rating` between 1 and 5),
  `personal_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_content` (`user_id`, `content_id`),
  KEY `idx_ul_content` (`content_id`),
  KEY `idx_ul_source_user` (`source_user_id`),
  CONSTRAINT `fk_ul_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ul_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ul_source_user` FOREIGN KEY (`source_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Bảng `categories`: Danh mục phân loại (Hệ thống mặc định hoặc do người dùng tự tạo - Mục 3.2)
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT 'NULL nếu là danh mục mặc định của hệ thống, có giá trị nếu là danh mục tự tạo của user',
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_system_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_categories_user` (`user_id`),
  CONSTRAINT `fk_categories_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Bảng `library_categories`: Gắn một mục trong thư viện cá nhân vào nhiều danh mục (Mục 3.2 & Mục 10)
CREATE TABLE IF NOT EXISTS `library_categories` (
  `user_library_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_library_id`, `category_id`),
  KEY `idx_lc_category` (`category_id`),
  CONSTRAINT `fk_lc_user_library` FOREIGN KEY (`user_library_id`) REFERENCES `user_libraries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_lc_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Bảng `favorites`: Danh sách yêu thích của người dùng (Mục 5, 9 & Mục 10)
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_favorites_user_content` (`user_id`, `content_id`),
  KEY `idx_fav_content` (`content_id`),
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fav_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. Bảng `reading_watching_progress`: Tiến độ đã đọc/đã xem từng chương hoặc tập của mỗi người dùng (Mục 4.2 & Mục 10)
CREATE TABLE IF NOT EXISTS `reading_watching_progress` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `chapter_id` bigint(20) NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1: Đã đọc/xem xong chương/tập này',
  `last_accessed_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_progress_user_chapter` (`user_id`, `chapter_id`),
  KEY `idx_progress_user_content` (`user_id`, `content_id`),
  KEY `idx_progress_chapter` (`chapter_id`),
  CONSTRAINT `fk_progress_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_progress_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_progress_chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. Bảng `sharing_permissions`: Quản lý quyền chia sẻ nội dung cho tất cả hoặc cho từng người dùng cụ thể (Mục 6 & Mục 10)
CREATE TABLE IF NOT EXISTS `sharing_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_library_id` bigint(20) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  `shared_with_user_id` bigint(20) DEFAULT NULL COMMENT 'NULL nếu chia sẻ cho tất cả trong hệ thống, có ID nếu chia sẻ riêng cho 1 người dùng',
  `share_scope` enum('ALL_USERS','SPECIFIC_USER') NOT NULL DEFAULT 'ALL_USERS',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Cho phép thu hồi quyền chia sẻ bất cứ lúc nào',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_sp_user_library` (`user_library_id`),
  KEY `idx_sp_owner` (`owner_id`),
  KEY `idx_sp_shared_with` (`shared_with_user_id`),
  CONSTRAINT `fk_sp_user_library` FOREIGN KEY (`user_library_id`) REFERENCES `user_libraries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sp_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sp_shared_with` FOREIGN KEY (`shared_with_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- NHÓM 4: BÌNH LUẬN, ĐÁNH GIÁ & BÁO CÁO VI PHẠM (Mục 7 & Mục 10)
-- ============================================================================

-- 18. Bảng `reviews`: Bình luận & Đánh giá cấp bộ truyện/phim và cấp chương/tập (Mục 7.1 & 7.2)
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `chapter_id` bigint(20) DEFAULT NULL COMMENT 'NULL nếu bình luận ở trang chi tiết bộ truyện/phim; có giá trị nếu bình luận ở chương/tập',
  `parent_id` bigint(20) DEFAULT NULL COMMENT 'Hỗ trợ trả lời (reply) bình luận',
  `rating` tinyint(4) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment_text` text NOT NULL,
  `is_spoiler` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1: Có cảnh báo tiết lộ nội dung (Spoiler)',
  `helpful_count` int(11) NOT NULL DEFAULT 0 COMMENT 'Hỗ trợ sắp xếp theo bình luận hữu ích nhất',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_reviews_content` (`content_id`),
  KEY `idx_reviews_chapter` (`chapter_id`),
  KEY `idx_reviews_user` (`user_id`),
  KEY `idx_reviews_parent` (`parent_id`),
  CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_parent` FOREIGN KEY (`parent_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- NHÓM 5: HỆ THỐNG NHẮN TIN 1-1, NHÓM & CHIA SẺ QUA TIN NHẮN (Mục 8 & Mục 10)
-- ============================================================================

-- 19. Bảng `conversations`: Cuộc trò chuyện (1-1 hoặc Nhóm)
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` enum('DIRECT','GROUP') NOT NULL DEFAULT 'DIRECT',
  `group_name` varchar(150) DEFAULT NULL,
  `group_avatar_url` varchar(255) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_conv_created_by` (`created_by`),
  CONSTRAINT `fk_conv_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. Bảng `conversation_members`: Thành viên cuộc trò chuyện & phân quyền Trưởng nhóm / Thành viên (Mục 8.2)
CREATE TABLE IF NOT EXISTS `conversation_members` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `conversation_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `member_role` enum('LEADER','MEMBER') NOT NULL DEFAULT 'MEMBER',
  `last_read_message_id` bigint(20) DEFAULT NULL,
  `joined_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_conv_user` (`conversation_id`, `user_id`),
  KEY `idx_cm_user` (`user_id`),
  CONSTRAINT `fk_cm_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cm_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 21. Bảng `messages`: Tin nhắn văn bản & chia sẻ nội dung theo thời gian thực (Mục 8.1, 8.2, 8.3)
CREATE TABLE IF NOT EXISTS `messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `conversation_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `message_type` enum('TEXT','CONTENT_SHARE','LINK','SYSTEM') NOT NULL DEFAULT 'TEXT',
  `message_text` text DEFAULT NULL,
  `shared_content_id` bigint(20) DEFAULT NULL COMMENT 'Liên kết trực tiếp tới bộ truyện/phim được chia sẻ',
  `status` enum('SENT','DELIVERED','READ','REVOKED') NOT NULL DEFAULT 'SENT',
  `is_revoked` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1: Tin nhắn đã bị thu hồi',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_messages_conv_created` (`conversation_id`, `created_at`),
  KEY `idx_messages_sender` (`sender_id`),
  KEY `idx_messages_shared_content` (`shared_content_id`),
  CONSTRAINT `fk_messages_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_messages_shared_content` FOREIGN KEY (`shared_content_id`) REFERENCES `contents` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 22. Bảng `message_attachments`: Tệp đính kèm hoặc thẻ dữ liệu truyện/phim chia sẻ trong tin nhắn (Mục 8.3 & Mục 10)
CREATE TABLE IF NOT EXISTS `message_attachments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_id` bigint(20) NOT NULL,
  `attachment_type` enum('CONTENT_CARD','EXTERNAL_LINK','IMAGE') NOT NULL DEFAULT 'CONTENT_CARD',
  `content_id` bigint(20) DEFAULT NULL,
  `external_url` varchar(500) DEFAULT NULL,
  `preview_title` varchar(255) DEFAULT NULL,
  `preview_poster_url` varchar(255) DEFAULT NULL,
  `preview_description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_ma_message` (`message_id`),
  KEY `idx_ma_content` (`content_id`),
  CONSTRAINT `fk_ma_message` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ma_content` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- NHÓM 6: THÔNG BÁO & BÁO CÁO VI PHẠM (Mục 2.2, 9 & Mục 10)
-- ============================================================================

-- 23. Bảng `notifications`: Thông báo cho người dùng (Khi được chia sẻ truyện/phim, có tin nhắn mới, bình luận mới...)
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL COMMENT 'Người nhận thông báo',
  `actor_id` bigint(20) DEFAULT NULL COMMENT 'Người tạo ra sự kiện thông báo',
  `type` enum('CONTENT_SHARED','NEW_MESSAGE','GROUP_INVITE','NEW_COMMENT','COMMENT_REPLY','SYSTEM') NOT NULL DEFAULT 'SYSTEM',
  `title` varchar(200) NOT NULL,
  `message` varchar(500) NOT NULL,
  `reference_id` bigint(20) DEFAULT NULL COMMENT 'ID của Content, Conversation hoặc Review liên quan',
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_notif_user_read` (`user_id`, `is_read`),
  KEY `idx_notif_actor` (`actor_id`),
  CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_notif_actor` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 24. Bảng `reports`: Báo cáo nội dung hoặc bình luận vi phạm để Admin xử lý (Mục 2.2 & Mục 10)
CREATE TABLE IF NOT EXISTS `reports` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reporter_id` bigint(20) NOT NULL,
  `target_type` enum('CONTENT','REVIEW','MESSAGE','USER') NOT NULL,
  `target_id` bigint(20) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `status` enum('PENDING','RESOLVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `resolved_by` bigint(20) DEFAULT NULL,
  `admin_note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_reports_reporter` (`reporter_id`),
  KEY `idx_reports_status` (`status`),
  KEY `idx_reports_resolved_by` (`resolved_by`),
  CONSTRAINT `fk_reports_reporter` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reports_resolved_by` FOREIGN KEY (`resolved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DỮ LIỆU MẪU KHỞI TẠO (SEED DATA - Mục 11)
-- ============================================================================

-- 1. Khởi tạo Vai trò & Quyền hạn cơ bản
INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'USER', 'Người dùng thông thường: quản lý thư viện cá nhân, chia sẻ và nhắn tin'),
(2, 'ADMIN', 'Quản trị viên hệ thống: quản lý người dùng, nội dung, thể loại và báo cáo vi phạm');

INSERT INTO `permissions` (`id`, `name`, `description`) VALUES
(1, 'LIBRARY_MANAGE_OWN', 'Thêm, sửa, xóa nội dung trong thư viện cá nhân'),
(2, 'CONTENT_SHARE', 'Chia sẻ nội dung với cộng đồng hoặc người dùng khác'),
(3, 'COMMENT_CREATE', 'Bình luận và đánh giá truyện, phim'),
(4, 'CHAT_USE', 'Nhắn tin 1-1 và nhắn tin nhóm'),
(5, 'ADMIN_MANAGE_USERS', 'Quản lý tài khoản người dùng'),
(6, 'ADMIN_MANAGE_CONTENTS', 'Quản lý toàn bộ dữ liệu truyện, phim, thể loại'),
(7, 'ADMIN_MODERATE', 'Quản lý bình luận và xử lý báo cáo vi phạm');

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7);

-- 2. Khởi tạo Thể loại mặc định (Mục 3.2)
INSERT INTO `genres` (`id`, `name`, `slug`, `description`) VALUES
(1, 'Hành động', 'hanh-dong', 'Truyện và phim có nhiều pha kịch tính, chiến đấu, phiêu lưu'),
(2, 'Kinh dị', 'kinh-di', 'Yếu tố rùng rợn, tâm lý, bí ẩn gây hồi hộp'),
(3, 'Tình cảm', 'tinh-cam', 'Câu chuyện lãng mạn, cảm xúc gia đình và tình yêu'),
(4, 'Giả tưởng', 'gia-tuong', 'Thế giới phép thuật, dị giới (Isekai), thần thoại'),
(5, 'Trinh thám', 'trinh-tham', 'Điều tra phá án, suy luận logic'),
(6, 'Hài hước', 'hai-huoc', 'Nội dung giải trí, vui nhộn'),
(7, 'Khoa học viễn tưởng', 'khoa-hoc-vien-tuong', 'Công nghệ tương lai, du hành vũ trụ, thời gian');

-- 3. Khởi tạo Danh mục phân loại mặc định (Mục 3.2)
INSERT INTO `categories` (`id`, `user_id`, `name`, `description`, `is_system_default`) VALUES
(1, NULL, 'Yêu thích', 'Những bộ truyện, phim tâm đắc nhất', 1),
(2, NULL, 'Đang đọc / Đang xem', 'Nội dung đang theo dõi dở', 1),
(3, NULL, 'Muốn đọc / Muốn xem', 'Danh sách dự định sẽ đọc hoặc xem', 1),
(4, NULL, 'Đã hoàn thành', 'Những bộ đã đọc hoặc xem trọn vẹn', 1);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
