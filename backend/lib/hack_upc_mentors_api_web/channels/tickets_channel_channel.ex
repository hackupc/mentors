defmodule HackUpcMentorsApiWeb.TicketsChannelChannel do
  use HackUpcMentorsApiWeb, :channel

  def join("tickets_channel:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("insert:ticket", payload, socket) do
    broadcast_from socket, "insert:ticket", payload
    {:noreply, socket}
  end

  def handle_in("update:ticket", payload, socket) do
    broadcast_from socket, "update:ticket", payload
    {:noreply, socket}
  end

  def handle_in("delete:ticket", payload, socket) do
    broadcast_from socket, "delete:ticket", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
