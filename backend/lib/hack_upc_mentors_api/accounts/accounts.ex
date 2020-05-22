defmodule HackUpcMentorsApi.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias HackUpcMentorsApi.Repo

  alias HackUpcMentorsApi.Accounts.User

  #### USERS ####
  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  ##### MENTORS ####
  def list_mentors(user_id) do
    user = Repo.get!(User, user_id)
    case user.is_admin do
      true ->
        query = from u in HackUpcMentorsApi.Accounts.User, where: u.is_mentor == true
        Repo.all(query)
      false ->
        {:error, :error}
    end
  end

  def get_mentor!(id, user_id) do
    user = Repo.get!(User, user_id)
    case user.is_admin do
      true ->
        query = from u in HackUpcMentorsApi.Accounts.User, where: u.id == ^user_id
        Repo.one!(query)
      false ->
        {:error, :error}
    end
  end

end
