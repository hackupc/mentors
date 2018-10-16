defmodule HackUpcMentorsApi.Repo.Migrations.TicketUserClaim do
  use Ecto.Migration

  def change do
    alter table(:tickets) do
      add :claimer_id, references(:users, on_delete: :nothing)
    end

    create index(:tickets, [:claimer_id])
  end
end
