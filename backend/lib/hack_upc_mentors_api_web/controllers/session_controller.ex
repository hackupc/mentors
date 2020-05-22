defmodule HackUpcMentorsApiWeb.SessionController do
    use HackUpcMentorsApiWeb, :controller

    alias HackUpcMentorsApi.Accounts.User


    @apidoc """
    @api {post} /api/sign_in Iniciar sesión
    @apiName LoginUser
    @apiGroup User
    @apiParamExample {json} Request-Example:
    {
        "email": "alvaro.girona@gmail.com",
        "password": "123123aA"
    }
    @apiSuccessExample Success-Response:
    HTTP/1.1 201 created
    {
        "status": "ok",
        "message": "You are successfully logged in! Add this token to authorization header to make authorized requests.",
        "data": {
            "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjMiLCJleHAiOjE1MjA4ODYxMjMsImlhdCI6MTUxODI5NDEyMywiaXNzIjoiTXlBcHBOYW1lIiwianRpIjoiZTlmNjQ5YTUtYjRmOS00NDI4LThiOTQtMzg4NGU4ZGFkMDRmIiwicGVtIjp7fSwic3ViIjoiVXNlcjozIiwidHlwIjoiYXBpIn0.3Ucz6RBm2MQBun2-b2QNsy8ALKdmlyr0mq_cWB09VviBeKNp5PZPaGaWaoUMZKRfTji846swCLEFaq5moDWj0A",
            "name": "Alvaro Girona Arias",
            "email": "alvaro.girona@gmail.com"
        }
    }
    """
    def sign_in(conn, params) do
        downcasedParams = Map.update!(params, "email", &(String.downcase(&1)))
        %{"email" => email, "password" => password} = downcasedParams
        case User.find_and_confirm_password(email, password) do
            {:ok, user} ->
                {:ok, jwt, _full_claims} = HackUpcMentorsApi.Guardian.encode_and_sign(user, %{})
                conn
                |> render("sign_in.json", user: user, jwt: jwt)
            {:error, _reason} ->
                errors = %{"errors" => %{"login_error" => ["login_error"]}}
                conn
                |> put_status(401)
                |> render("error.json", errors: errors)
        end
    end

    def request_reset_password(conn, params) do

    end

    def reset_password(conn, params) do

    end
end

