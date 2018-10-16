defmodule HackUpcMentorsApi.Guardian do
  use Guardian, otp_app: :hack_upc_mentors_api

  def subject_for_token(resource, _claims) do
    IO.puts("SUBJECT FOR TOKEN")
    IO.inspect(resource)
    {:ok, to_string(resource.id)}
  end

  def resource_from_claims(claims) do
    user = claims["sub"]
    |> HackUpcMentorsApi.Accounts.get_user!
    {:ok, user}
  end

end
