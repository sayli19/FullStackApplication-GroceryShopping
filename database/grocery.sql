-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2021 at 05:19 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grocery`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_admin`
--

CREATE TABLE `t_admin` (
  `admin_id` int(11) NOT NULL,
  `admin_fName` varchar(20) NOT NULL,
  `admin_lName` varchar(20) NOT NULL,
  `admin_email` varchar(50) NOT NULL,
  `admin_password` varchar(100) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_brands`
--

CREATE TABLE `t_brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` int(11) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_category`
--

CREATE TABLE `t_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `created_by` varchar(20) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(20) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_orders`
--

CREATE TABLE `t_orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` varchar(4) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_products`
--

CREATE TABLE `t_products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  `weight` int(11) NOT NULL,
  `unit` varchar(5) NOT NULL,
  `price` varchar(5) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `user_id` int(11) NOT NULL,
  `user_fname` varchar(20) NOT NULL,
  `user_lname` varchar(30) NOT NULL,
  `user_contact` varchar(15) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_user_address`
--

CREATE TABLE `t_user_address` (
  `user_address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `short_address` varchar(250) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pin_code` int(11) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_user_login`
--

CREATE TABLE `t_user_login` (
  `user_login_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `created_by` varchar(50) NOT NULL DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_admin`
--
ALTER TABLE `t_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `t_brands`
--
ALTER TABLE `t_brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `t_category`
--
ALTER TABLE `t_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `t_orders`
--
ALTER TABLE `t_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `t_products`
--
ALTER TABLE `t_products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `t_brand_id_fk` (`brand_id`),
  ADD KEY `t_product_id_fk` (`category_id`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `t_user_address`
--
ALTER TABLE `t_user_address`
  ADD PRIMARY KEY (`user_address_id`),
  ADD KEY `t_user_id_fk` (`user_id`);

--
-- Indexes for table `t_user_login`
--
ALTER TABLE `t_user_login`
  ADD PRIMARY KEY (`user_login_id`),
  ADD KEY `t_user_id_fk1` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_admin`
--
ALTER TABLE `t_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_brands`
--
ALTER TABLE `t_brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_category`
--
ALTER TABLE `t_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_orders`
--
ALTER TABLE `t_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_products`
--
ALTER TABLE `t_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_user_address`
--
ALTER TABLE `t_user_address`
  MODIFY `user_address_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_user_login`
--
ALTER TABLE `t_user_login`
  MODIFY `user_login_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_products`
--
ALTER TABLE `t_products`
  ADD CONSTRAINT `t_brand_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `t_brands` (`brand_id`),
  ADD CONSTRAINT `t_product_id_fk` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`category_id`);

--
-- Constraints for table `t_user_address`
--
ALTER TABLE `t_user_address`
  ADD CONSTRAINT `t_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `t_users` (`user_id`);

--
-- Constraints for table `t_user_login`
--
ALTER TABLE `t_user_login`
  ADD CONSTRAINT `t_user_id_fk1` FOREIGN KEY (`user_id`) REFERENCES `t_users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
