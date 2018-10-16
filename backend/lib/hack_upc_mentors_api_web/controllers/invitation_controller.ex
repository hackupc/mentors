defmodule HackUpcMentorsApiWeb.InvitationController do
  use HackUpcMentorsApiWeb, :controller

  def invite_code(conn, params) do
    %{"inv_email"=>inv_email} = params
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    user = HackUpcMentorsApi.Accounts.get_user!(user_id)
    case user.is_admin do
      true ->
        token = Phoenix.Token.sign(HackUpcMentorsApiWeb.Endpoint,
        "",
        %{"inv_email"=>inv_email})

        HackUpcMentorsApi.Email.invitation_email(token, inv_email)
        |> HackUpcMentorsApi.Mailer.deliver_later

        render(conn, "invitation.json", token: token)
      false ->
        {:error}
    end
  end
end
