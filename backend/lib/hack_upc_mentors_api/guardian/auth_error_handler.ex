defmodule HackUpcMentorsApi.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    IO.puts("++++++++AUTH ERROR+++++++++")
    body = Poison.encode!(%{message: to_string(type)})
    send_resp(conn, 401, body)
  end
end
