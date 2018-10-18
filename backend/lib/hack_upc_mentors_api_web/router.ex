defmodule HackUpcMentorsApiWeb.Router do
  use HackUpcMentorsApiWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api_auth do
    plug :fetch_session
    plug :accepts, ["json", "json-api"]
    plug Guardian.Plug.Pipeline, module: OctoPOS.Guardian,
    error_handler: OctoPOS.AuthErrorHandler
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.VerifyHeader, claims: %{typ: "access"}
  end

  pipeline :api do
    plug :fetch_session
    plug :accepts, ["json"]
  end

  # scope "/", HackUpcMentorsApiWeb do
  #   pipe_through :browser # Use the default browser stack

  #   get "/", PageController, :index
  # end

  scope "/api", HackUpcMentorsApiWeb do
    pipe_through :api

    post "/sign_up", RegistrationController, :sign_up
    post "/sign_in", SessionController, :sign_in
    post "/mentors/sign_up", RegistrationController, :sing_up_with_code
    resources "/tickets", TicketController, except: [:new, :edit, :create, :update]
  end

  scope "/api/v1", HackUpcMentorsApiWeb do
    pipe_through :api_auth
    resources "/tickets", TicketController, except: [:new, :edit]
    resources "/users", UserController, except: [:new, :edit, :create, :delete]
    resources "/mentors", MentorsController, except: [:new, :edit]
    resources "/tickets_claim", TicketClaimController, except: [:new, :edit]
    post "/invitation-code", InvitationController, :invite_code
  end
end
