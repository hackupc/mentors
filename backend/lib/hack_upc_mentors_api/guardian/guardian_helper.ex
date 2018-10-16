defmodule HackUpcMentorsApi.GuardianHelper do
    def get_user_id(conn) do
        # token = conn.req_headers
        # Enum.chunk_every(token, 1) |> IO.inspect()
        # IO.inspect(token)
        %{"authorization" => token} = conn.req_headers
        |> Enum.chunk(1)
        |> Enum.map(fn [a] -> a end)
        |> Map.new

        {:ok, claims} = HackUpcMentorsApi.Guardian.decode_and_verify(token)
        claims["sub"]
    end
end
