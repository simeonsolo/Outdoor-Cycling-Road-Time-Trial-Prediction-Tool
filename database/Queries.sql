/* SIGNING UP USER */
INSERT INTO users (
        username,
        password,
        firstName,
        lastName,
        email,
        phoneNum
    )
VALUES(?, SHA2(?, 244), ?, ?, ?, ?);
/* CHECKING IF SPECIFIED USER IS IN DATABASE */
SELECT username,
    firstName,
    lastName,
    email,
    phoneNum
FROM users
WHERE username = ?;
/* LOGGING IN USER (VERIFYING PASSWORD) */
SELECT username,
    firstName,
    lastName,
    email,
    phoneNum
FROM users
WHERE username = ?
    AND password = SHA2(?, 244);
/* MAKING USER ADMINISTRATOR */
INSERT INTO administrators(user)
VALUES(?);
/* CHECKING IF SPECIFIED USER IS ADMINISTRATOR */
SELECT user,
    admin_id
FROM administrators
WHERE user = ?;
/* UPDATE PASSWORD */
UPDATE users
SET password = SHA2(?, 244)
WHERE username = ?
    AND password = SHA2(?, 244);
/* UPDATE USER CONTACT INFORMATION */
UPDATE users
SET firstName = ?,
    lastName = ?,
    email = ?,
    phoneNum = ?
WHERE username = ?;