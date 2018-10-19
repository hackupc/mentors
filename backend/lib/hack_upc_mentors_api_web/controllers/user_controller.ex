defmodule HackUpcMentorsApiWeb.UserController do
  use HackUpcMentorsApiWeb, :controller

  alias HackUpcMentorsApi.Accounts
  alias HackUpcMentorsApi.Accounts.User

  action_fallback HackUpcMentorsApiWeb.FallbackController

  def index(conn, _params) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    conn_user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case conn_user.is_admin do
      true ->
        users = Accounts.list_users()
        _ = Accounts.get_user!(user_id)
        render(conn, "index.json", users: users)
      false ->
        {:error, :not_found}
    end


  end

  def create(conn, %{"user" => user_params}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    conn_user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case conn_user.is_admin do
      true ->
        with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", user_path(conn, :show, user))
          |> render("show.json", user: user)
        end
      false ->
        {:error, :not_found}
    end
  end

  def show(conn, %{"id" => id}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    conn_user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case conn_user.is_admin do
      true ->
        user = Accounts.get_user!(id)
        render(conn, "show.json", user: user)
      false ->
        {:error, :not_found}
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    conn_user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case conn_user.is_admin do
      true ->
        user = Accounts.get_user!(id)

        with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
          render(conn, "show.json", user: user)
        end
      false ->
        case user_id == conn_user.id do
          true ->
            user = Accounts.get_user!(id)
            with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
              render(conn, "show.json", user: user)
            end
          false ->
        end
        {:error, :not_found}
    end
  end

  def delete(conn, %{"id" => id}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    conn_user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case conn_user.is_admin do
      true ->
        user = Accounts.get_user!(id)
        with {:ok, %User{}} <- Accounts.delete_user(user) do
          send_resp(conn, :no_content, "")
        end
      false ->
        {:error, :not_found}
    end
  end
end
