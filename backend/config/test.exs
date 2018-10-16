use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :hack_upc_mentors_api, HackUpcMentorsApiWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :hack_upc_mentors_api, HackUpcMentorsApi.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "hack_upc_mentors_api_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
