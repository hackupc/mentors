# HackUpcMentorsApi

First [install](https://hexdocs.pm/phoenix/installation.html) Erlang, Elixir and Phoenix Framework 

Generate Phoenix and Guardian secrets:

```bash
mix phx.gen.secret
mix guardian.gen.secret
```

PostgreSQL must be installed too. The DB user and password have to be in the following environment variables:

```bash
export DB_USER="postgres"
export DB_PASS="postgres"
export PHOENIX_SECRET="SECRET OBTAINED WITH mix phx.gen.secret"
export GUARDIAN_SECRET="SECRET OBTAINED WITH mix guardian.gen.secret"
export SG_KEY="SendGrid API Key"
```

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Creating admin user

Run the app in interactive mode.

```bash
ies -S mix
```

Call the following function:

```Elixir
 HackUpcMentorsApi.Accounts.create_admin(%{"name" => "admin", "password" => "password12A", "email" => "aaaa@gmail.com", "contact" => "contact"})
 ```
