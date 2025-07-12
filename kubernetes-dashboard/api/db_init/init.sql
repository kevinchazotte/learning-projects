-- api/db_init/init.sql
CREATE TABLE IF NOT EXISTS widgets (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	value VARCHAR(255) NOT NULL,
	icon VARCHAR(50) NOT NULL
);

INSERT INTO widgets (title, value, icon) VALUES
('Total Metric', '$152,345', '💸'),
('New Users', '125', '👥'),
('Orders Pending', '18', '📦'),
('Revenue Growth', '7.2%', '📈')
ON CONFLICT (id) DO NOTHING;
