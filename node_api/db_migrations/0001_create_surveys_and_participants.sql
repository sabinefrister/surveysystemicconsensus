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