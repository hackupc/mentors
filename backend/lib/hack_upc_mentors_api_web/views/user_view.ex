defmodule HackUpcMentorsApiWeb.UserView do
  use HackUpcMentorsApiWeb, :view
  alias HackUpcMentorsApiWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      is_mentor: user.is_mentor,
      is_hacker: user.is_hacker}
  end
end
