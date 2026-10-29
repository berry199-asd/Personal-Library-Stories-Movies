-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 29, 2026 lúc 02:12 AM
-- Phiên bản máy phục vụ: 10.11.16-MariaDB
-- Phiên bản PHP: 8.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `media_library_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chapters`
--

CREATE TABLE `chapters` (
  `id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `season_id` bigint(20) DEFAULT NULL,
  `chapter_number` decimal(6,1) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `external_link` varchar(500) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contents`
--

CREATE TABLE `contents` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content_type` enum('MANGA','MOVIE') NOT NULL,
  `poster_url` varchar(255) DEFAULT NULL,
  `author_or_director` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `STATUS` enum('ONGOING','COMPLETED','HIATUS') DEFAULT 'ONGOING',
  `external_main_link` varchar(500) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seasons`
--

CREATE TABLE `seasons` (
  `id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `season_number` int(11) NOT NULL,
  `title` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `role` enum('USER','ADMIN') DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_libraries`
--

CREATE TABLE `user_libraries` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `content_id` bigint(20) NOT NULL,
  `reading_status` enum('PLAN_TO_READ','READING','COMPLETED','DROPPED') DEFAULT 'PLAN_TO_READ',
  `visibility` enum('PRIVATE','SHARED') DEFAULT 'PRIVATE',
  `personal_rating` tinyint(4) DEFAULT NULL CHECK (`personal_rating` between 1 and 5),
  `personal_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`content_id`),
  ADD KEY `season_id` (`season_id`);

--
-- Chỉ mục cho bảng `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Chỉ mục cho bảng `seasons`
--
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`content_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_libraries`
--
ALTER TABLE `user_libraries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_content` (`user_id`,`content_id`),
  ADD KEY `content_id` (`content_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `contents`
--
ALTER TABLE `contents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `seasons`
--
ALTER TABLE `seasons`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user_libraries`
--
ALTER TABLE `user_libraries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chapters_ibfk_2` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE SET NULL;

--
-- Ràng buộc cho bảng `contents`
--
ALTER TABLE `contents`
  ADD CONSTRAINT `contents_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Ràng buộc cho bảng `seasons`
--
ALTER TABLE `seasons`
  ADD CONSTRAINT `seasons_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `user_libraries`
--
ALTER TABLE `user_libraries`
  ADD CONSTRAINT `user_libraries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_libraries_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
