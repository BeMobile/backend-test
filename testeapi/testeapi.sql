-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16-Set-2021 às 04:09
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `testeapi`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cidade` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uf` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cep` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bairro` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rua` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomero` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fk_client` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `addresses`
--

INSERT INTO `addresses` (`id`, `cidade`, `uf`, `cep`, `bairro`, `rua`, `nomero`, `fk_client`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'anchiete', 'es', '', 'centtro', 'dos bobos', '85', 5, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `clients`
--

INSERT INTO `clients` (`id`, `name`, `cpf`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'testes', '2121212', NULL, NULL, NULL),
(2, 'Joaquim Maleta', '156456456', NULL, NULL, NULL),
(3, 'João Gastão', '12145', NULL, NULL, NULL),
(5, 'sebastiao jose', '98547455133', NULL, NULL, NULL),
(6, 'pedro alcantra', '3215475856', NULL, NULL, NULL),
(7, 'jose messias', '645454548', '2021-09-16 02:57:09', '2021-09-16 02:57:09', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(7, '2014_10_12_000000_create_users_table', 1),
(8, '2014_10_12_100000_create_password_resets_table', 1),
(9, '2019_08_19_000000_create_failed_jobs_table', 1),
(10, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(11, '2021_09_14_012158_create_products_table', 1),
(12, '2021_09_14_220206_create_clients_table', 1),
(13, '2021_09_14_224824_create_sales_table', 1),
(14, '2021_09_14_232241_create_addresses_table', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `detail` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `name`, `code`, `price`, `detail`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'camisa', '12132', 10.9, 'teste camisa', NULL, NULL, NULL),
(2, 'Blusa', '54545', 24.9, 'blusa teste', NULL, NULL, NULL),
(3, 'Cinto Branco', '5454545', 50.9, 'cinto teste branco', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `total` double NOT NULL,
  `fk_clients` bigint(20) UNSIGNED NOT NULL,
  `fk_products` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `sales`
--

INSERT INTO `sales` (`id`, `total`, `fk_clients`, `fk_products`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 10.9, 1, 1, NULL, NULL, NULL),
(2, 50.9, 3, 3, NULL, NULL, NULL),
(3, 29.9, 2, 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Miss Betsy Hyatt DDS', 'sawayn.jamir@example.net', '2021-09-16 02:18:41', '$2a$12$vAJPFA7d1wesrCnzjKCA.ONeUsY9QhORKcZkBZ9uFiTUkYfH8qBEW', 'zqLjxYP8V1', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(2, 'Kiera Mosciski DVM', 'wrutherford@example.com', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'vBv98PEUWl', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(3, 'Harold Mayert MD', 'cbreitenberg@example.com', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'jwzCrAz5Qg', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(4, 'Magali Mann', 'pheathcote@example.net', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'D0pYAIQGqU', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(5, 'Mr. Arch Connelly MD', 'russel.prince@example.com', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '8WIiKklxJt', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(6, 'Prof. Merl Kshlerin', 'phamill@example.net', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'I8j6FF6UDQ', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(7, 'Kaci Heathcote', 'fweber@example.net', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'x505mipowk', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(8, 'Emilio Stoltenberg PhD', 'otrantow@example.net', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CpQHnnN74a', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(9, 'Madonna Ziemann MD', 'pkoss@example.net', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '5u4gtDH3mG', '2021-09-16 02:18:41', '2021-09-16 02:18:41'),
(10, 'Prof. Geovanny Parker MD', 'luna.hessel@example.org', '2021-09-16 02:18:41', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Fw5NzcmZVT', '2021-09-16 02:18:42', '2021-09-16 02:18:42');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_fk_client_foreign` (`fk_client`);

--
-- Índices para tabela `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Índices para tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Índices para tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_fk_products_foreign` (`fk_products`),
  ADD KEY `sales_fk_clients_foreign` (`fk_clients`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_fk_client_foreign` FOREIGN KEY (`fk_client`) REFERENCES `clients` (`id`);

--
-- Limitadores para a tabela `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_fk_clients_foreign` FOREIGN KEY (`fk_clients`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `sales_fk_products_foreign` FOREIGN KEY (`fk_products`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
