<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../Dao/AuthDao.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService extends BaseService
{
    private $authDao;

    public function __construct()
    {
        $this->authDao = new AuthDao();
        parent::__construct(new AuthDao);
    }

    public function getUserByEmail($email)
    {
        return $this->authDao->getUserByEmail($email);
    }

    public function register(array $entity)
    {
        if (empty($entity['email']) || empty($entity['password_hash']) || empty($entity['first_name']) || empty($entity['last_name'])) {
            return ['success' => false, 'error' => 'Email, Password, First name and Last name are required.'];
        }

        if (!filter_var($entity['email'], FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'error' => 'Invalid email address format.'];
        }

        try {
            $email_exists = $this->authDao->getUserByEmail($entity['email']);
            if ($email_exists) {
                return ['success' => false, 'error' => 'Email already registered.'];
            }

            $dataForDbInsertion = $entity;
            $dataForDbInsertion['password_hash'] = password_hash($entity['password_hash'], PASSWORD_BCRYPT);

            $creationResult = parent::create($dataForDbInsertion);

            if (is_numeric($creationResult)) {
                $newUserId = $creationResult;

                $responseData = $entity;
                unset($responseData['password_hash']);
                $responseData['user_id'] = $newUserId;

                return ['success' => true, 'data' => $responseData];
            } else {
                error_log("AuthService::register - User creation failed or DAO returned unexpected data. DAO Result: " . print_r($creationResult, true));
                $errorMessage = 'User creation failed in DAO.';
                if (is_string($creationResult)) {
                    $errorMessage .= ' Details: ' . $creationResult;
                }
                return ['success' => false, 'error' => $errorMessage];
            }
        } catch (Exception $e) {
            error_log("AuthService::register - Exception: " . $e->getMessage());
            return ['success' => false, 'error' => 'An unexpected error occurred during registration. ' . $e->getMessage()];
        }
    }

    public function login($entity)
    {
        if (empty($entity['email']) || empty($entity['password_hash'])) {
            return ['success' => false, 'error' => 'Email and password are required.'];
        }
        $user = $this->authDao->getUserByEmail($entity['email']);

        if (!$user) {
            return ['success' => false, 'error' => 'User not found.'];
        }

        if (!$user || !password_verify($entity['password_hash'], $user['password_hash']))
            return ['success' => false, 'error' => 'Invalid username or password.'];

        unset($user['password_hash']);

        $jwt_payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 1)
        ];

        $token = JWT::encode(
            $jwt_payload,
            Config::JWT_SECRET(),
            'HS256'
        );

        return ['success' => true, 'data' => array_merge($user, ['token' => $token])];
    }
}
