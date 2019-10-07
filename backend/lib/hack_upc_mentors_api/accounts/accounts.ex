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

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.user_contact_changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  def change_user(%User{} = user) do
    User.user_contact_changeset(user, %{})
  end

  def create_admin(attrs \\ %{}) do
    changeset = User.admin_registration_changeset(%User{}, attrs)
    Repo.insert(changeset)
  end

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

  def create_mentor(attrs, user_id) do
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

  def delete_mentor(%User{} = user) do
    case user.is_admin do
      true ->
        Repo.delete(user)
      false ->
        {:error, :error}
    end
  end

  def update_mentor(%User{} = user, attrs) do
    case user.is_admin do
      true ->
        user
        |> Changeset(attrs)
        |> Repo.update()
      false ->
        {:error, :error}
    end
  end
end
