defmodule HackUpcMentorsApiWeb.RegistrationView do
    use HackUpcMentorsApiWeb, :view

    def render("success.json", _) do
      IO.puts("registered")
      %{
        status: "registered",
      }
    end
  end
