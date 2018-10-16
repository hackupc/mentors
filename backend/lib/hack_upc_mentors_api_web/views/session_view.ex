defmodule HackUpcMentorsApiWeb.SessionView do
  use HackUpcMentorsApiWeb, :view

  def render("sign_in.json", %{user: user, jwt: jwt}) do
      %{status: :ok,
        data: %{
          token: jwt,
          email: user.email,
          name: user.name,
          is_admin: user.is_admin,
          is_hacker: user.is_hacker,
          is_mentor: user.is_mentor,
          contact: user.contact,
          user_id: user.id
        }
      }
  end

  def render("sign_in.json", _bad_struct) do
  end

  def render("error.json", %{errors: errors}) do
    errors
  end
end
