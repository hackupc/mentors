defmodule HackUpcMentorsApiWeb.UserController do
  use HackUpcMentorsApiWeb, :controller

  alias HackUpcMentorsApi.Accounts
  alias HackUpcMentorsApi.Accounts.User

  action_fallback HackUpcMentorsApiWeb.FallbackController

  def index(conn, _params) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    users = Accounts.list_users()
    _ = Accounts.get_user!(user_id)
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    user = Accounts.get_user!(id)
    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
