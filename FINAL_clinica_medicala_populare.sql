-- Inserting data into pacienti table
INSERT INTO pacienti VALUES (1, 'Dumitrescu', 'Vasile', TO_DATE('1990-01-15', 'YYYY-MM-DD'), '1234567890123456', 'Masculin', 75.5, 180.0, 'Y', '0765126543', 'john.doe@example.com', 'Y');
INSERT INTO pacienti VALUES (2, 'Iovu', 'Andrei', TO_DATE('1985-05-20', 'YYYY-MM-DD'), '9876543210987654', 'Masculin', 65.2, 165.0, 'N', '0798126543', 'jane.smith@example.com', 'N');

-- Inserting data into specializari table
INSERT INTO specializari VALUES (1, 'Cardiologie');
INSERT INTO specializari VALUES (2, 'Dermatologie');
INSERT INTO specializari VALUES (3, 'Neurochirurgie');

-- Inserting data into medici table
INSERT INTO medici VALUES (1, 'Radu', 'Mihai', TO_DATE('1975-08-10', 'YYYY-MM-DD'), '0712764387', 'johnson.m@example.com', 1, 'password1');
INSERT INTO medici VALUES (2, 'Zamfir', 'Emilia', TO_DATE('1980-03-25', 'YYYY-MM-DD'), '0734873154', 'williams.e@example.com', 2, 'password2');

-- Inserting data into analize table
INSERT INTO analize VALUES (1, TO_DATE('2023-01-05', 'YYYY-MM-DD'), 1);
INSERT INTO analize VALUES (2, TO_DATE('2023-02-15', 'YYYY-MM-DD'), 2);

-- Inserting data into valori table
INSERT INTO valori VALUES (1, 'Colesterol', 200);
INSERT INTO valori VALUES (2, 'Glicemie', 120);

-- Inserting data into analize_valori table
INSERT INTO analize_valori VALUES (1, 1);
INSERT INTO analize_valori VALUES (1, 2);
INSERT INTO analize_valori VALUES (2, 2);

-- Inserting data into consultatii table
INSERT INTO consultatii VALUES (1, TO_DATE('2023-03-10', 'YYYY-MM-DD'), 1, 1, 'Consultatie Cardiologie');
INSERT INTO consultatii VALUES (2, TO_DATE('2023-04-20', 'YYYY-MM-DD'), 2, 2, 'Consultatie Dermatologie');

-- Inserting data into preturi table
INSERT INTO preturi VALUES (1, 100);
INSERT INTO preturi VALUES (2, 80);

-- Inserting data into consultatii_preturi table
INSERT INTO consultatii_preturi VALUES (1, 1);
INSERT INTO consultatii_preturi VALUES (2, 2);

-- Inserting data into fise_medicale table
INSERT INTO fise_medicale VALUES (1, TO_DATE('2023-01-10', 'YYYY-MM-DD'), 'Evaluare Cardiologie', 1);
INSERT INTO fise_medicale VALUES (2, TO_DATE('2023-02-20', 'YYYY-MM-DD'), 'Evaluare Dermatologie', 2);

commit;

