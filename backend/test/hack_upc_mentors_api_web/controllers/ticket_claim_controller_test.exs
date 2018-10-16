defmodule HackUpcMentorsApiWeb.TicketClaimControllerTest do
  use HackUpcMentorsApiWeb.ConnCase

  alias HackUpcMentorsApi.Mentors
  alias HackUpcMentorsApi.Mentors.TicketClaim

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:ticket_claim) do
    {:ok, ticket_claim} = Mentors.create_ticket_claim(@create_attrs)
    ticket_claim
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tickets_claim", %{conn: conn} do
      conn = get conn, ticket_claim_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ticket_claim" do
    test "renders ticket_claim when data is valid", %{conn: conn} do
      conn = post conn, ticket_claim_path(conn, :create), ticket_claim: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, ticket_claim_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, ticket_claim_path(conn, :create), ticket_claim: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ticket_claim" do
    setup [:create_ticket_claim]

    test "renders ticket_claim when data is valid", %{conn: conn, ticket_claim: %TicketClaim{id: id} = ticket_claim} do
      conn = put conn, ticket_claim_path(conn, :update, ticket_claim), ticket_claim: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, ticket_claim_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, ticket_claim: ticket_claim} do
      conn = put conn, ticket_claim_path(conn, :update, ticket_claim), ticket_claim: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ticket_claim" do
    setup [:create_ticket_claim]

    test "deletes chosen ticket_claim", %{conn: conn, ticket_claim: ticket_claim} do
      conn = delete conn, ticket_claim_path(conn, :delete, ticket_claim)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, ticket_claim_path(conn, :show, ticket_claim)
      end
    end
  end

  defp create_ticket_claim(_) do
    ticket_claim = fixture(:ticket_claim)
    {:ok, ticket_claim: ticket_claim}
  end
end
