defmodule HackUpcMentorsApiWeb.TicketView do
  use HackUpcMentorsApiWeb, :view
  alias HackUpcMentorsApiWeb.TicketView

  def render("index.json", %{tickets: tickets}) do
    %{data: render_many(tickets, TicketView, "ticket.json")}
  end

  def render("show.json", %{ticket: ticket}) do
    %{data: render_one(ticket, TicketView, "ticket.json")}
  end

  def render("ticket.json", %{ticket: ticket}) do
    IO.puts("+++++Render ticket")
    ticket = HackUpcMentorsApi.Repo.preload(ticket, [:claimer])
    IO.inspect(ticket)
    case ticket.claimer do
      nil ->
        %{id: ticket.id,
        name: ticket.name,
        imageUrl: ticket.imageUrl,
        topic: ticket.topic,
        contact: ticket.contact,
        location: ticket.location,
        status: ticket.status,
        comments: ticket.comments,
        user_id: ticket.user_id,
        claimer_id: ""}
      _ ->
        %{id: ticket.id,
        name: ticket.name,
        imageUrl: ticket.imageUrl,
        topic: ticket.topic,
        contact: ticket.contact,
        location: ticket.location,
        status: ticket.status,
        comments: ticket.comments,
        user_id: ticket.user_id,
        claimer_id: ticket.claimer.id}
    end

  end
end
