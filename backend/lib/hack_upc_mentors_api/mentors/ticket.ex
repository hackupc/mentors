defmodule HackUpcMentorsApi.Mentors.Ticket do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tickets" do
    field :comments, :string
    field :contact, :string
    field :imageUrl, :string
    field :location, :string
    field :name, :string
    field :status, :integer
    field :topic, :string
    belongs_to :claimer, HackUpcMentorsApi.Accounts.User
    belongs_to :user, HackUpcMentorsApi.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, [:name, :imageUrl, :topic, :contact, :location, :status, :comments, :claimer_id])
    |> validate_required([:name, :imageUrl, :topic, :contact, :location, :status, :comments])
  end
end
