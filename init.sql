CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER'
);
CREATE TABLE IF NOT EXISTS channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id),
    show_id INTEGER NOT NULL REFERENCES shows(id),
    start_time VARCHAR(10) NOT NULL
);
INSERT INTO users (id, first_name, last_name, email, password, role)
VALUES (
        1,
        'admin',
        'admin',
        'root@example.com',
        'root',
        'ADMIN'
    ) ON CONFLICT (email) DO NOTHING;
INSERT INTO channels (id, name)
VALUES (1, '1+1'),
    (2, 'ICTV'),
    (3, 'STB'),
    (4, 'Novyi Kanal'),
    (5, 'Suspilne'),
    (6, 'TET'),
    (7, 'Mega'),
    (8, 'NTN'),
    (9, 'K1'),
    (10, '2+2'),
    (11, 'Pixel'),
    (12, 'PlusPlus') ON CONFLICT (id) DO NOTHING;
INSERT INTO shows (id, title)
VALUES (1, 'TSN (News)'),
    (2, 'Fakty (News)'),
    (3, 'The Matrix'),
    (4, 'MasterChef'),
    (5, 'Heads and Tails (Travel)'),
    (6, 'Late Night Comedy'),
    (7, 'National Geographic Documentary'),
    (8, 'Morning Show'),
    (9, 'The Voice'),
    (10, 'Dancing with the Stars'),
    (11, 'X-Factor'),
    (12, 'UEFA Champions League'),
    (13, 'Ukraine''s Got Talent'),
    (14, 'Friends (Sitcom)'),
    (15, 'The Witcher'),
    (16, 'Game of Thrones'),
    (17, 'Stranger Things'),
    (18, 'Top Gear'),
    (19, 'Sherlock'),
    (20, 'Breaking Bad') ON CONFLICT (id) DO NOTHING;
INSERT INTO programs (id, channel_id, show_id, start_time)
VALUES (1, 1, 1, '19:30'),
    (2, 1, 20, '21:00'),
    (3, 2, 2, '18:45'),
    (4, 2, 3, '22:00'),
    (5, 3, 4, '19:00'),
    (6, 3, 13, '21:30'),
    (7, 4, 5, '10:00'),
    (8, 4, 14, '16:00'),
    (9, 5, 1, '20:00'),
    (10, 5, 7, '15:00'),
    (11, 6, 6, '23:00'),
    (12, 6, 10, '19:00'),
    (13, 7, 18, '21:00'),
    (14, 8, 19, '20:00'),
    (15, 9, 17, '22:00'),
    (16, 10, 12, '21:45'),
    (17, 11, 8, '08:00'),
    (18, 12, 8, '09:00'),
    (19, 1, 20, '23:30'),
    (20, 3, 11, '18:00') ON CONFLICT (id) DO NOTHING;
SELECT setval(
        'users_id_seq',
        GREATEST(
            (
                SELECT COALESCE(MAX(id), 1)
                FROM users
            ),
            1
        ),
        true
    );
SELECT setval(
        'channels_id_seq',
        GREATEST(
            (
                SELECT COALESCE(MAX(id), 1)
                FROM channels
            ),
            1
        ),
        true
    );
SELECT setval(
        'shows_id_seq',
        GREATEST(
            (
                SELECT COALESCE(MAX(id), 1)
                FROM shows
            ),
            1
        ),
        true
    );
SELECT setval(
        'programs_id_seq',
        GREATEST(
            (
                SELECT COALESCE(MAX(id), 1)
                FROM programs
            ),
            1
        ),
        true
    );