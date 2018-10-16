defmodule HackUpcMentorsApi.Repo.Migrations.CreateTickets do
  use Ecto.Migration

  def change do
    create table(:tickets) do
      add :name, :string
      add :imageUrl, :string
      add :topic, :string
      add :contact, :string
      add :location, :string
      add :status, :integer
      add :comments, :string
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:tickets, [:user_id])
  end
end
