defmodule HackUpcMentorsApi.Mentors do
  @moduledoc """
  The Mentors context.
  """

  import Ecto.Query, warn: false
  alias HackUpcMentorsApi.Repo
  import Ecto.Changeset

  alias HackUpcMentorsApi.Mentors.Ticket


  #### TICKETS ####
  def list_tickets(user_id) do
    user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case user.is_admin or user.is_mentor do
      true ->
        Repo.all(Ticket)
      false ->
        query = from t in HackUpcMentorsApi.Mentors.Ticket, where: t.user_id == ^user_id
        Repo.all(query)
    end
  end

  def get_ticket!(id, user_id) do
    user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case user.is_admin or user.is_mentor do
      true ->
        HackUpcMentorsApi.Repo.get(Ticket, id)
      false ->
        query = from t in HackUpcMentorsApi.Mentors.Ticket, where: t.user_id == ^user_id and t.id == ^id
        Repo.one(query)
    end

  end

  def create_ticket(attrs \\ %{}, user_id) do
    user = Repo.get!(HackUpcMentorsApi.Accounts.User, user_id)
    %Ticket{}
    |> Ticket.changeset(attrs)
    |> put_assoc(:user, user)
    |> Repo.insert()
  end

  def update_ticket(%Ticket{} = ticket, attrs) do
    ticket
    |> Ticket.changeset(attrs)
    |> Repo.update()
  end

  def delete_ticket(%Ticket{} = ticket, user_id) do
    Repo.delete(ticket)
  end

  def change_ticket(%Ticket{} = ticket, user_id) do
    Ticket.changeset(ticket, %{})
  end

end
