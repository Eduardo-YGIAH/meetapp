USE meetapp;

INSERT INTO location
    (locationId, postcode, address)
VALUES
    (1, "B15 2EN", "2 Langley Walk, Birmingham");

INSERT INTO user
    (userId, first_name, last_name, email, password, image, locationId)
VALUES
    (1, "Bob", "Gory", "woof@gmail.com", "wtf99", image, 1);

INSERT INTO meet
    (meetId, title, description, locationId, userId)
VALUES
    (1, "Fierce Knitting", "Knitting to Beyonce music", 1, 1);

INSERT INTO booking
    (bookId, meetId, userId)
VALUES
    (1, 1, 1)