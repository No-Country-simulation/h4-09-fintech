INSERT INTO roles (role_id,role_name) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3','ROLE_USER');
INSERT INTO roles (role_id,role_name) VALUES('1b34df4b-b80c-425d-a87b-4eaaf8ae4515','ROLE_ADMIN');

INSERT INTO users (user_id,username,name,last_name,password,funds,onboarding_complete) VALUES('6adfed88-3f3f-46bd-81a7-ea79ea58793d','admin@gmail.com','admin','admin','$2a$10$isLRHWROQv9jFvB6vYIWbuIFDhWHsVc4T7YWh5ZZYoiNbeRxyDMaG',0,true);
INSERT INTO user_role(role_id,user_id) VALUES('1b34df4b-b80c-425d-a87b-4eaaf8ae4515','6adfed88-3f3f-46bd-81a7-ea79ea58793d');
INSERT INTO users (user_id,username,name,last_name,password,onboarding_complete,funds,financial_knowledge,main_goal,risk_preference) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3','pruebaseed@gmail.com','seed','seed','$2a$10$isLRHWROQv9jFvB6vYIWbuIFDhWHsVc4T7YWh5ZZYoiNbeRxyDMaG',true,10000,'avanzado','Comprar un auto','moderado');
INSERT INTO user_role(role_id,user_id) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3','340ddc49-1214-4e00-9a77-2334334b23d3');
INSERT INTO depositos(deposito_id,user_id,monto,fecha_request,status,comprobante) VALUES ('cf529b3a-d60b-48c6-a513-0b8957af2cbd','340ddc49-1214-4e00-9a77-2334334b23d3',10000,'2024-10-24','PENDIENTE','https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1');

INSERT INTO users (user_id, username, name, last_name, password, onboarding_complete, funds, financial_knowledge, main_goal, risk_preference) VALUES('7ef1897f-f75c-4961-a15a-bb2c20af50d0', 'usuario5@gmail.com', 'Emily', 'Davis', '$2a$10$dsfsdrC86w2LbxvFEzfgSzN9Ug3dAIK5yY5rdOG9wI0VgsB7h2V4i', true, 5000, 'bajo', 'Ahorrar para jubilación', 'bajo');
INSERT INTO users (user_id, username, name, last_name, password, onboarding_complete, funds, financial_knowledge, main_goal, risk_preference) VALUES('e181fea9-82ad-4984-ba5d-3628aba208d8', 'usuario2@gmail.com', 'John', 'Doe', '$2a$10$J9hDYn4T.xc5jOq3JbwRyl5fYgzzkqH9lzyxLhBdqfV1lmMyy2FTp', true, 15000, 'intermedio', 'Ahorrar para vacaciones', 'bajo');
INSERT INTO users (user_id, username, name, last_name, password, onboarding_complete, funds, financial_knowledge, main_goal, risk_preference) VALUES('a1e750b8-c9b1-4a01-989c-31a933411c30', 'usuario3@gmail.com', 'Jane', 'Smith', '$2a$10$UyfF98hJ3QVsVpXGkqF/ZHD5tOBPfHihX9v0k2YflT5bBhd5Xa44e', true, 20000, 'principiante', 'Invertir en bienes raíces', 'alto');
INSERT INTO users (user_id, username, name, last_name, password, onboarding_complete, funds, financial_knowledge, main_goal, risk_preference) VALUES('a56b8c94-c4dc-4e61-b16d-fdfa635bbd02', 'usuario4@gmail.com', 'Michael', 'Johnson', '$2a$10$z5B.yJXUjLwHCkxUuDgW0hwMb65rpZ6.xLg64zXEZVVxOHbsYkVOW', true, 12000, 'intermedio', 'Educación universitaria', 'moderado');

-- Usuario 2
INSERT INTO user_role(role_id, user_id) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3', 'e181fea9-82ad-4984-ba5d-3628aba208d8');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('bbcad402-0605-481e-b7b2-008c7fa7bbbf', 'e181fea9-82ad-4984-ba5d-3628aba208d8', 10000, '2024-10-24', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('4fd3c0cc-588a-438a-86d5-5f39fe0c125e', 'e181fea9-82ad-4984-ba5d-3628aba208d8', 2000, '2024-10-25', 'APROBADO', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=2');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('ce7ecc00-ff26-4519-a54b-f0cdb502bec3', 'e181fea9-82ad-4984-ba5d-3628aba208d8', 5000, '2024-10-26', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=3');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('7e2a3791-4782-4970-a8c6-a12e1b064d43', 'e181fea9-82ad-4984-ba5d-3628aba208d8', 15000, '2024-10-27', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=4');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('b7d0af7a-b3ae-41e1-b1fa-b03c2da90843', 'e181fea9-82ad-4984-ba5d-3628aba208d8', 12000, '2024-10-28', 'APROBADO', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=5');

-- Usuario 3
INSERT INTO user_role(role_id, user_id)VALUES('340ddc49-1214-4e00-9a77-2334334b23d3', 'a1e750b8-c9b1-4a01-989c-31a933411c30');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('20c4eaf2-ee67-4464-98da-7849c0452b96', 'a1e750b8-c9b1-4a01-989c-31a933411c30', 10000, '2024-10-24', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('2bd07a80-8858-433b-808a-4309d2552129', 'a1e750b8-c9b1-4a01-989c-31a933411c30', 2000, '2024-10-25', 'APROBADO', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=2');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('4de02adc-5f3c-49c0-99a4-8280cf0af4a5', 'a1e750b8-c9b1-4a01-989c-31a933411c30', 5000, '2024-10-26', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=3');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('9fe271ae-07a9-419a-8665-50cfc6d70432', 'a1e750b8-c9b1-4a01-989c-31a933411c30', 15000, '2024-10-27', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=4');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('455abdf4-6ed6-4d49-9835-d588ac38c7d6', 'a1e750b8-c9b1-4a01-989c-31a933411c30', 12000, '2024-10-28', 'APROBADO', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=5');

-- Usuario 4
INSERT INTO user_role(role_id, user_id) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3', 'a56b8c94-c4dc-4e61-b16d-fdfa635bbd02');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('7596421f-0da8-415e-97ef-969bdd46cd33', 'a56b8c94-c4dc-4e61-b16d-fdfa635bbd02', 10000, '2024-10-24', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('faaa0ba7-620a-47bb-8829-c0ab38d86353', 'a56b8c94-c4dc-4e61-b16d-fdfa635bbd02', 2000, '2024-10-25', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=2');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('c6206064-6b91-41b9-825c-9e4dd7e890b2', 'a56b8c94-c4dc-4e61-b16d-fdfa635bbd02', 5000, '2024-10-26', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=3');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('216020c7-ef7a-4d98-8c4f-d28889ad9181', 'a56b8c94-c4dc-4e61-b16d-fdfa635bbd02', 15000, '2024-10-27', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=4');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('d1b9f979-dba4-4ae2-9ed2-8747262e608a', 'a56b8c94-c4dc-4e61-b16d-fdfa635bbd02', 12000, '2024-10-28', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=5');


-- Usuario 5
INSERT INTO user_role(role_id, user_id) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3', '7ef1897f-f75c-4961-a15a-bb2c20af50d0');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('651c3f86-029a-40d3-8f57-59500b646ded', '7ef1897f-f75c-4961-a15a-bb2c20af50d0', 10000, '2024-10-24', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=1');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('33592abb-7bdc-4c05-95ab-2fe4368a2cdc', '7ef1897f-f75c-4961-a15a-bb2c20af50d0', 2000, '2024-10-25', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=2');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('3d4014cf-4d75-40b9-b371-d7cd9673b882', '7ef1897f-f75c-4961-a15a-bb2c20af50d0', 5000, '2024-10-26', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=3');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('28681c55-68df-4b8e-8a58-5989592fbb77', '7ef1897f-f75c-4961-a15a-bb2c20af50d0', 15000, '2024-10-27', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=4');
INSERT INTO depositos (deposito_id, user_id, monto, fecha_request, status, comprobante)VALUES ('368cf873-9047-4769-96a1-86eb29505213', '7ef1897f-f75c-4961-a15a-bb2c20af50d0', 12000, '2024-10-28', 'PENDIENTE', 'https://imgv2-1-f.scribdassets.com/img/document/508917096/original/26d2c2968c/1?v=5');



-- RETIROS
INSERT INTO retiros (retiro_id,user_id,monto,fecha_request,cbu,status) VALUES ('f6c6ad1b-b096-4cf7-9b20-ae2537832c6d','340ddc49-1214-4e00-9a77-2334334b23d3',8000,'2025-01-21','123958582139582','PENDIENTE');
INSERT INTO retiros (retiro_id,user_id,monto,fecha_request,cbu,status) VALUES ('ef13bf0b-d1f2-4d79-99fb-8c342d985405','7ef1897f-f75c-4961-a15a-bb2c20af50d0',2000,'2025-01-02','123958582139584','PENDIENTE');
INSERT INTO retiros (retiro_id,user_id,monto,fecha_request,cbu,status) VALUES ('8125cd10-9705-4ff8-95f1-280894211bb4','e181fea9-82ad-4984-ba5d-3628aba208d8',12000,'2025-01-15','123958582139585','PENDIENTE');
INSERT INTO retiros (retiro_id,user_id,monto,fecha_request,cbu,status) VALUES ('e2c4eb14-5ef2-4b95-9cd9-d87d5fc1b949','a1e750b8-c9b1-4a01-989c-31a933411c30',16000,'2025-01-18','123958582139586','PENDIENTE');
INSERT INTO retiros (retiro_id,user_id,monto,fecha_request,cbu,status) VALUES ('55efad22-fc38-4402-a720-68c3ad0fbb73','a56b8c94-c4dc-4e61-b16d-fdfa635bbd02',14000,'2025-01-07','123958582139588','PENDIENTE');


-- CREAR CUENTA DE BANCO DEFAULT

INSERT INTO cuentas_banco (id, titular, cbu, alias, cuit, user_created_id, fecha_creacion, fecha_modificacion, user_updated_id)VALUES ('b7d78b74-2e4b-4d25-984f-88ec7b4db123', 'IUPI FINTECH', '1234567890123456789012','IUPI.FINTECH.ALIAS', '20-12345678-9', '6adfed88-3f3f-46bd-81a7-ea79ea58793d',CURRENT_DATE, CURRENT_DATE, '6adfed88-3f3f-46bd-81a7-ea79ea58793d');