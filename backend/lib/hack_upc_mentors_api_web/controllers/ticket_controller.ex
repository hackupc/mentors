defmodule HackUpcMentorsApiWeb.TicketController do
  use HackUpcMentorsApiWeb, :controller

  alias HackUpcMentorsApi.Mentors
  alias HackUpcMentorsApi.Mentors.Ticket

  action_fallback HackUpcMentorsApiWeb.FallbackController

  def index(conn, _params) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    tickets = Mentors.list_tickets(user_id)
    render(conn, "index.json", tickets: tickets)
  end

  def create(conn, %{"ticket" => ticket_params}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    with {:ok, %Ticket{} = ticket} <- Mentors.create_ticket(ticket_params, user_id) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ticket_path(conn, :show, ticket))
      |> render("show.json", ticket: ticket)
    end
  end

  def show(conn, %{"id" => id}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    ticket = Mentors.get_ticket!(id, user_id)
    render(conn, "show.json", ticket: ticket)
  end

  def update(conn, %{"id" => id, "ticket" => ticket_params}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    ticket = Mentors.get_ticket!(id, user_id)

    with {:ok, %Ticket{} = ticket} <- Mentors.update_ticket(ticket, ticket_params) do
      render(conn, "show.json", ticket: ticket)
    end
  end

  def delete(conn, %{"id" => id}) do
    user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    ticket = Mentors.get_ticket!(id, user_id)
    with {:ok, %Ticket{}} <- Mentors.delete_ticket(ticket, user_id) do
      send_resp(conn, :no_content, "")
    end
  end
end
