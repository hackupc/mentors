defmodule HackUpcMentorsApiWeb.RegistrationController do
    use HackUpcMentorsApiWeb, :controller

    alias HackUpcMentorsApi.Repo
    alias HackUpcMentorsApi.Accounts.User

    def sign_up(conn, user_params) do
      changeset = User.hacker_registration_changeset(%User{}, user_params)
      case Repo.insert(changeset) do
        {:ok, user} ->
          conn
          |> put_status(:created)
          |> render("success.json", user: user)
        {:error, changeset} ->
          conn
          #|> put_status(:unprocessable_entity)
          |> render(HackUpcMentorsApiWeb.ChangesetView, "error.json", changeset: changeset)
      end
    end

    def sing_up_with_code(conn, user_params) do
      %{"token"=>token} = user_params
      case Phoenix.Token.verify(HackUpcMentorsApiWeb.Endpoint, "", token, max_age: 86400*14) do
        {:ok, invitation_data} ->
          IO.puts("Verified token")
          IO.inspect(invitation_data)
          IO.puts("++++ USER PARAMS")
          %{"inv_email" => inv_email} = invitation_data
          %{"email" => user_email} = user_params
          IO.inspect(user_email)
          IO.inspect(inv_email)


          if user_email == inv_email do
              IO.puts("+++ VALID EMAIL ++++")
              changeset = HackUpcMentorsApi.Accounts.User.mentor_registration_changeset(%User{}, user_params)
              case Repo.insert(changeset) do
                {:ok, user} ->
                  IO.puts("++++++INSERTED USER")
                  conn
                    |> put_status(:created)
                    |> put_resp_header("location", user_path(conn, :show, user))
                    |> render("success.json", user: user)
                {:error, changeset} ->
                  conn
                    |> put_status(:unprocessable_entity)
                    |> render(HackUpcMentorsApiWeb.ChangesetView, "error.json", changeset: changeset)
          end
        end
        conn
          |> put_status(:unprocessable_entity)
          |> render(HackUpcMentorsApiWeb.ChangesetView, "error.json", changeset: "error")
      end
    end
end

