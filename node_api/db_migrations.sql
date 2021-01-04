DROP DATABASE surveysystemicconsensus;
CREATE DATABASE surveysystemicconsensus;
SELECT surveysystemicconsensus;

CREATE TABLE surveys (
  survey_id SERIAL PRIMARY KEY,
  survey_link uuid NOT NULL,
  survey_name TEXT NOT NULL,
  options TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE participants (
  participant_id SERIAL PRIMARY KEY,
  survey_id INT NOT NULL REFERENCES surveys(survey_id),
  participant_name TEXT NOT NULL,
  options TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO surveys (survey_name, options, survey_link )
  VALUES ('survey0', '[{option: "Kino"}, {option: "Restaurant"}]', '40e6215d-b5c6-4896-987c-f30f3678f608'), 
  ('survey1', '[{option: "Blume"}, {option: "Baum"}, {option: "Pflanze"}]', '6ecd8c99-4036-403d-bf84-cf8400f67836');


INSERT INTO participants (survey_id, participant_name, options )
  VALUES ('1', 'Maurice', '[{option: 3}, {option: 5}]'), ('1', 'Madeline', '[{option: 0}, {option: 10}]'),
  ('2', 'Milena', '[{option: 4}, {option: 3}, {option: 5}]'), ('2', 'Mariana', '[{option: 3}, {option: 1}, {option: 6}]');


