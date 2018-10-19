defmodule HackUpcMentorsApi.Repo.Migrations.UserIdEmailUniqueConstraint do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:email], name: :unique_email)
  end
end
