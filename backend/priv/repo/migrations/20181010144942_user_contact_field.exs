defmodule HackUpcMentorsApi.Repo.Migrations.UserContactField do
  use Ecto.Migration

  def change do
    alter table (:users) do
      add :contact, :string
    end
  end
end
