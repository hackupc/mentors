defmodule HackUpcMentorsApi.Email do
  import Bamboo.Email

  def invitation_email(register_token, email) do
    base_email
    |> to(email)
    |> subject("[HackUPC] Mentor invitation")
    |> put_header("Reply-To", "mentors@hackupc.com")
    |> html_body("<strong>You have been invited to HackUPC Mentors app</strong><br>
    Visit <a href='mentors.hackupc.com/mentors/register'> this link<a/> and use this code to register: #{register_token}</p>")
    |> text_body("[HackUPC] Mentor invitation")
  end

  defp base_email do
    # Here you can set a default from, default headers, etc.
    new_email
    |> from("mentors@hackupc.com")
    #|> put_html_layout({MyApp.LayoutView, "email.html"})
    #|> put_text_layout({MyApp.LayoutView, "email.text"})
  end
end
