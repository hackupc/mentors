defmodule HackUpcMentorsApiWeb.InvitationView do
  use HackUpcMentorsApiWeb, :view
  alias HackUpcMentorsApiWeb.InvitationView

  def render("show.json", %{token: token}) do
    %{invitation: render_one(token, InvitationView, "invitation.json")}
  end

  def render("invitation.json", %{token: token}) do
    %{token: token}
  end
end
