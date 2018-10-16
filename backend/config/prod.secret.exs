use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :hack_upc_mentors_api, HackUpcMentorsApiWeb.Endpoint,
  secret_key_base: "4fYstldaJHbdTCkGaar1UfPC00JBYQ1urIcYelLboD/l8Q+akhQCtVGNLHtivMxz"

# Configure your database
config :hack_upc_mentors_api, HackUpcMentorsApi.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "hack_upc_mentors_api_prod",
  pool_size: 15
