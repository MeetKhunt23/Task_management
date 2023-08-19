-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2023 at 08:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `allforms`
--

CREATE TABLE `allforms` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `field_ids` longtext NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `allforms`
--

INSERT INTO `allforms` (`id`, `user_id`, `field_ids`, `create_date`) VALUES
(2, 1, '290,291,292,293,294,317', '2023-07-28 09:32:51'),
(6, 1, '303,304,305,306', '2023-07-28 10:47:49'),
(50, 1, '453,454,455', '2023-07-31 11:07:14'),
(51, 1, '458,459', '2023-07-31 11:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `form_data`
--

CREATE TABLE `form_data` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `form_number` varchar(11) NOT NULL,
  `field_type` varchar(255) NOT NULL,
  `field_label` text NOT NULL,
  `placeholder` text NOT NULL,
  `options` mediumtext NOT NULL,
  `validated` int(12) NOT NULL DEFAULT 1 COMMENT '0-yes,1-no',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `form_data`
--

INSERT INTO `form_data` (`id`, `user_id`, `form_number`, `field_type`, `field_label`, `placeholder`, `options`, `validated`, `create_date`) VALUES
(290, 1, '2', 'text', 'F_name', 'Enter Your Name', 'null', 1, '2023-07-28 07:50:16'),
(291, 1, '2', 'textarea', 'Text_area', 'Enter Text Here', 'null', 1, '2023-07-28 07:50:27'),
(292, 1, '2', 'select', 'Select option', 'null', 'option1,option2,option3', 1, '2023-07-28 07:50:28'),
(293, 1, '2', 'number', 'Contact Number', 'null', 'null', 1, '2023-07-28 07:50:30'),
(294, 1, '2', 'password', 'Password', 'Enter the Password', 'null', 1, '2023-07-28 07:50:31'),
(303, 1, '6', 'text', 'Name', 'Enter Your Text Here', 'null', 1, '2023-07-28 10:47:44'),
(304, 1, '6', 'textarea', 'Text_area', 'Enter Text Here', 'null', 1, '2023-07-28 10:47:45'),
(305, 1, '6', 'checkbox', 'Select Your choise', 'null', 'option1,option2,option3', 1, '2023-07-28 10:47:47'),
(306, 1, '6', 'button', 'Submit', 'null', 'null', 1, '2023-07-28 10:47:48'),
(317, 1, '2', 'select', 'Select option', 'null', 'option1,option2,option3', 1, '2023-07-29 05:19:50'),
(453, 1, '50', 'text', 'Name', 'Enter Your Text Here', 'null', 0, '2023-07-31 11:07:05'),
(454, 1, '50', 'textarea', 'Text_area', 'Enter Text Here', 'null', 0, '2023-07-31 11:07:07'),
(455, 1, '50', 'text', 'Name', 'Enter Your Text Here', 'null', 0, '2023-07-31 11:08:06'),
(458, 1, '51', 'text', 'Name', 'Enter Your Text Here', 'null', 1, '2023-07-31 11:22:14'),
(459, 1, '51', 'textarea', 'Text_area', 'Enter Text Here', 'null', 1, '2023-07-31 11:22:16'),
(464, 1, 'null', 'text', 'Name', 'Enter Your Text Here', 'null', 1, '2023-07-31 11:43:00');

-- --------------------------------------------------------

--
-- Table structure for table `milestone`
--

CREATE TABLE `milestone` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `project_id` int(12) NOT NULL,
  `milestone_name` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `milestone`
--

INSERT INTO `milestone` (`id`, `user_id`, `project_id`, `milestone_name`, `create_date`) VALUES
(35, 1, 5, 'started', '2023-07-22 12:31:34'),
(36, 1, 6, 'nice', '2023-07-22 12:31:42'),
(37, 1, 5, 'adding key', '2023-07-24 03:51:14'),
(38, 1, 6, 'adding events', '2023-07-24 03:51:25'),
(39, 1, 14, 'adding lights', '2023-07-24 03:51:37'),
(40, 1, 15, 'adding tasks', '2023-07-24 03:51:47'),
(41, 1, 16, 'sellings khakhras', '2023-07-24 03:51:58'),
(42, 1, 17, 'improving psychology', '2023-07-24 03:52:19'),
(43, 1, 18, 'completing tasks', '2023-07-24 03:52:30'),
(44, 1, 19, 'working perfectly', '2023-07-24 03:52:48'),
(89, 1, 19, 'humour', '2023-07-24 12:59:49'),
(90, 1, 19, 'travelling', '2023-07-24 12:59:49'),
(91, 1, 19, 'work', '2023-07-24 12:59:49'),
(92, 1, 19, 'food', '2023-07-24 12:59:49'),
(93, 1, 19, 'smile', '2023-07-24 12:59:49'),
(94, 1, 5, 'superb', '2023-07-25 07:20:08'),
(95, 1, 5, 'good', '2023-07-25 07:20:08'),
(96, 1, 5, 'nice', '2023-07-25 07:20:08'),
(97, 1, 5, 'sexy', '2023-07-25 07:20:08');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `project_id` int(12) NOT NULL,
  `milestone_id` int(12) NOT NULL,
  `module_name` text NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `user_id`, `project_id`, `milestone_id`, `module_name`, `create_date`) VALUES
(32, 1, 5, 35, 'terf', '2023-07-22 12:44:00'),
(33, 1, 5, 35, 'sfsrf', '2023-07-22 12:44:17'),
(34, 1, 6, 35, 'erfsfv', '2023-07-22 12:44:29'),
(35, 1, 6, 35, 'erferf', '2023-07-22 12:44:40'),
(36, 1, 5, 35, 'wrferfs', '2023-07-22 12:46:11'),
(37, 1, 5, 35, 'efsdfv', '2023-07-22 12:47:52'),
(38, 1, 17, 42, 'doing good', '2023-07-24 03:58:55'),
(39, 1, 17, 42, 'working fine', '2023-07-24 04:03:06'),
(75, 1, 5, 35, 'nice', '2023-07-24 10:41:46'),
(76, 1, 5, 35, 'good', '2023-07-24 10:41:46'),
(77, 1, 5, 35, 'great', '2023-07-24 10:41:46');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `project_name` varchar(1000) NOT NULL,
  `user_id` int(12) NOT NULL,
  `status` int(10) NOT NULL COMMENT '0-running,1-paused,2-completed',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `project_name`, `user_id`, `status`, `create_date`) VALUES
(5, 'Bill_Book', 1, 0, '2023-07-17 06:46:29'),
(6, 'Event_management', 1, 0, '2023-07-19 06:48:35'),
(14, 'Swayam Infotech', 1, 0, '2023-07-22 09:10:14'),
(15, 'Rahul Goes to jetpur', 1, 0, '2023-07-22 09:37:36'),
(16, 'mohityo', 1, 0, '2023-07-22 09:39:48'),
(17, 'Rohit sir', 1, 0, '2023-07-22 09:39:54'),
(18, 'jadav sir', 1, 0, '2023-07-22 09:40:01'),
(19, 'jitesh sir', 1, 0, '2023-07-22 09:40:06');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `project_name` text NOT NULL,
  `milestone` text NOT NULL,
  `module` text NOT NULL,
  `task` text NOT NULL,
  `estimated_time` time NOT NULL,
  `started_time` time NOT NULL DEFAULT current_timestamp(),
  `resuming_time` time NOT NULL,
  `taken_hours` time NOT NULL,
  `priority` int(12) NOT NULL COMMENT '1-ergent,2-moderate,3-least prior\r\n',
  `status` int(12) NOT NULL COMMENT '0-started,1-paused,2-ended',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `project_name`, `milestone`, `module`, `task`, `estimated_time`, `started_time`, `resuming_time`, `taken_hours`, `priority`, `status`, `create_date`) VALUES
(12, 1, 'bill_book', '1', 'done', 'it is for editing the projects', '02:30:00', '09:56:19', '09:56:19', '02:00:00', 1, 1, '2023-07-19 13:26:19'),
(14, 1, 'library', '1', 'done', 'book submission', '02:30:00', '10:37:00', '17:48:25', '08:33:00', 1, 1, '2023-07-21 05:07:00'),
(21, 1, 'svo', '1', 'done', 'svo done', '02:30:00', '15:03:42', '17:48:01', '00:23:33', 1, 1, '2023-07-21 09:33:42'),
(24, 1, 'Bill_Book', '35', '32', 'done', '13:10:00', '16:31:18', '18:11:35', '01:33:07', 2, 1, '2023-07-24 11:01:18');

-- --------------------------------------------------------

--
-- Table structure for table `task_timings`
--

CREATE TABLE `task_timings` (
  `id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `task_id` int(12) NOT NULL,
  `started_time` time NOT NULL DEFAULT current_timestamp(),
  `time_taken_till_pause` time NOT NULL,
  `status` int(12) NOT NULL DEFAULT 0 COMMENT '0-started,1-paused,2-ended',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `task_timings`
--

INSERT INTO `task_timings` (`id`, `user_id`, `task_id`, `started_time`, `time_taken_till_pause`, `status`, `create_date`) VALUES
(2, 1, 12, '18:56:20', '02:00:00', 1, '2023-07-19 13:26:20'),
(7, 1, 14, '10:37:00', '00:41:18', 1, '2023-07-21 05:48:18'),
(8, 1, 14, '11:10:13', '00:15:47', 1, '2023-07-21 05:56:00'),
(9, 1, 14, '11:10:13', '00:53:08', 1, '2023-07-21 06:33:21'),
(10, 1, 14, '12:04:40', '00:01:28', 1, '2023-07-21 06:36:08'),
(34, 1, 21, '15:03:42', '00:08:33', 1, '2023-07-21 09:42:15'),
(35, 1, 21, '15:13:19', '00:00:59', 1, '2023-07-21 09:44:18'),
(36, 1, 21, '15:15:32', '00:00:28', 1, '2023-07-21 09:46:00'),
(37, 1, 21, '15:19:59', '00:01:45', 1, '2023-07-21 09:51:44'),
(38, 1, 21, '18:53:19', '00:10:22', 1, '2023-07-21 13:33:41'),
(39, 1, 14, '12:23:37', '06:40:18', 1, '2023-07-21 13:33:55'),
(41, 1, 14, '17:48:25', '00:01:01', 1, '2023-07-24 12:19:26'),
(42, 1, 21, '17:48:01', '00:01:26', 1, '2023-07-24 12:19:27'),
(43, 1, 24, '16:31:18', '01:18:10', 1, '2023-07-24 12:19:28'),
(44, 1, 24, '17:50:57', '00:01:34', 1, '2023-07-24 12:22:31'),
(45, 1, 24, '18:11:35', '00:13:23', 1, '2023-07-24 12:54:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `contact`, `password`, `device_token`, `create_date`) VALUES
(1, 'meet', 'meet@91066.com', '9106689874', 'meet@91066', '12455721138', '2023-07-18 11:32:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allforms`
--
ALTER TABLE `allforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form_data`
--
ALTER TABLE `form_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestone`
--
ALTER TABLE `milestone`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_timings`
--
ALTER TABLE `task_timings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allforms`
--
ALTER TABLE `allforms`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `form_data`
--
ALTER TABLE `form_data`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=465;

--
-- AUTO_INCREMENT for table `milestone`
--
ALTER TABLE `milestone`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `task_timings`
--
ALTER TABLE `task_timings`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
