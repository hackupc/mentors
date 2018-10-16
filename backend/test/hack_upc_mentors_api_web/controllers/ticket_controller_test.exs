defmodule HackUpcMentorsApiWeb.TicketControllerTest do
  use HackUpcMentorsApiWeb.ConnCase

  alias HackUpcMentorsApi.Mentors
  alias HackUpcMentorsApi.Mentors.Ticket

  @create_attrs %{comments: "some comments", contact: "some contact", imageUrl: "some imageUrl", location: "some location", name: "some name", status: 42, topic: "some topic"}
  @update_attrs %{comments: "some updated comments", contact: "some updated contact", imageUrl: "some updated imageUrl", location: "some updated location", name: "some updated name", status: 43, topic: "some updated topic"}
  @invalid_attrs %{comments: nil, contact: nil, imageUrl: nil, location: nil, name: nil, status: nil, topic: nil}

  def fixture(:ticket) do
    {:ok, ticket} = Mentors.create_ticket(@create_attrs)
    ticket
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tickets", %{conn: conn} do
      conn = get conn, ticket_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ticket" do
    test "renders ticket when data is valid", %{conn: conn} do
      conn = post conn, ticket_path(conn, :create), ticket: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, ticket_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "comments" => "some comments",
        "contact" => "some contact",
        "imageUrl" => "some imageUrl",
        "location" => "some location",
        "name" => "some name",
        "status" => 42,
        "topic" => "some topic"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, ticket_path(conn, :create), ticket: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ticket" do
    setup [:create_ticket]

    test "renders ticket when data is valid", %{conn: conn, ticket: %Ticket{id: id} = ticket} do
      conn = put conn, ticket_path(conn, :update, ticket), ticket: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, ticket_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "comments" => "some updated comments",
        "contact" => "some updated contact",
        "imageUrl" => "some updated imageUrl",
        "location" => "some updated location",
        "name" => "some updated name",
        "status" => 43,
        "topic" => "some updated topic"}
    end

    test "renders errors when data is invalid", %{conn: conn, ticket: ticket} do
      conn = put conn, ticket_path(conn, :update, ticket), ticket: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ticket" do
    setup [:create_ticket]

    test "deletes chosen ticket", %{conn: conn, ticket: ticket} do
      conn = delete conn, ticket_path(conn, :delete, ticket)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, ticket_path(conn, :show, ticket)
      end
    end
  end

  defp create_ticket(_) do
    ticket = fixture(:ticket)
    {:ok, ticket: ticket}
  end
end
