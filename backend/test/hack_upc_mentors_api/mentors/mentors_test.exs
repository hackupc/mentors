defmodule HackUpcMentorsApi.MentorsTest do
  use HackUpcMentorsApi.DataCase

  alias HackUpcMentorsApi.Mentors

  describe "tickets" do
    alias HackUpcMentorsApi.Mentors.Ticket

    @valid_attrs %{comments: "some comments", contact: "some contact", imageUrl: "some imageUrl", location: "some location", name: "some name", status: 42, topic: "some topic"}
    @update_attrs %{comments: "some updated comments", contact: "some updated contact", imageUrl: "some updated imageUrl", location: "some updated location", name: "some updated name", status: 43, topic: "some updated topic"}
    @invalid_attrs %{comments: nil, contact: nil, imageUrl: nil, location: nil, name: nil, status: nil, topic: nil}

    def ticket_fixture(attrs \\ %{}) do
      {:ok, ticket} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Mentors.create_ticket()

      ticket
    end

    test "list_tickets/0 returns all tickets" do
      ticket = ticket_fixture()
      assert Mentors.list_tickets() == [ticket]
    end

    test "get_ticket!/1 returns the ticket with given id" do
      ticket = ticket_fixture()
      assert Mentors.get_ticket!(ticket.id) == ticket
    end

    test "create_ticket/1 with valid data creates a ticket" do
      assert {:ok, %Ticket{} = ticket} = Mentors.create_ticket(@valid_attrs)
      assert ticket.comments == "some comments"
      assert ticket.contact == "some contact"
      assert ticket.imageUrl == "some imageUrl"
      assert ticket.location == "some location"
      assert ticket.name == "some name"
      assert ticket.status == 42
      assert ticket.topic == "some topic"
    end

    test "create_ticket/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Mentors.create_ticket(@invalid_attrs)
    end

    test "update_ticket/2 with valid data updates the ticket" do
      ticket = ticket_fixture()
      assert {:ok, ticket} = Mentors.update_ticket(ticket, @update_attrs)
      assert %Ticket{} = ticket
      assert ticket.comments == "some updated comments"
      assert ticket.contact == "some updated contact"
      assert ticket.imageUrl == "some updated imageUrl"
      assert ticket.location == "some updated location"
      assert ticket.name == "some updated name"
      assert ticket.status == 43
      assert ticket.topic == "some updated topic"
    end

    test "update_ticket/2 with invalid data returns error changeset" do
      ticket = ticket_fixture()
      assert {:error, %Ecto.Changeset{}} = Mentors.update_ticket(ticket, @invalid_attrs)
      assert ticket == Mentors.get_ticket!(ticket.id)
    end

    test "delete_ticket/1 deletes the ticket" do
      ticket = ticket_fixture()
      assert {:ok, %Ticket{}} = Mentors.delete_ticket(ticket)
      assert_raise Ecto.NoResultsError, fn -> Mentors.get_ticket!(ticket.id) end
    end

    test "change_ticket/1 returns a ticket changeset" do
      ticket = ticket_fixture()
      assert %Ecto.Changeset{} = Mentors.change_ticket(ticket)
    end
  end

  describe "tickets_claim" do
    alias HackUpcMentorsApi.Mentors.TicketClaim

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def ticket_claim_fixture(attrs \\ %{}) do
      {:ok, ticket_claim} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Mentors.create_ticket_claim()

      ticket_claim
    end

    test "list_tickets_claim/0 returns all tickets_claim" do
      ticket_claim = ticket_claim_fixture()
      assert Mentors.list_tickets_claim() == [ticket_claim]
    end

    test "get_ticket_claim!/1 returns the ticket_claim with given id" do
      ticket_claim = ticket_claim_fixture()
      assert Mentors.get_ticket_claim!(ticket_claim.id) == ticket_claim
    end

    test "create_ticket_claim/1 with valid data creates a ticket_claim" do
      assert {:ok, %TicketClaim{} = ticket_claim} = Mentors.create_ticket_claim(@valid_attrs)
    end

    test "create_ticket_claim/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Mentors.create_ticket_claim(@invalid_attrs)
    end

    test "update_ticket_claim/2 with valid data updates the ticket_claim" do
      ticket_claim = ticket_claim_fixture()
      assert {:ok, ticket_claim} = Mentors.update_ticket_claim(ticket_claim, @update_attrs)
      assert %TicketClaim{} = ticket_claim
    end

    test "update_ticket_claim/2 with invalid data returns error changeset" do
      ticket_claim = ticket_claim_fixture()
      assert {:error, %Ecto.Changeset{}} = Mentors.update_ticket_claim(ticket_claim, @invalid_attrs)
      assert ticket_claim == Mentors.get_ticket_claim!(ticket_claim.id)
    end

    test "delete_ticket_claim/1 deletes the ticket_claim" do
      ticket_claim = ticket_claim_fixture()
      assert {:ok, %TicketClaim{}} = Mentors.delete_ticket_claim(ticket_claim)
      assert_raise Ecto.NoResultsError, fn -> Mentors.get_ticket_claim!(ticket_claim.id) end
    end

    test "change_ticket_claim/1 returns a ticket_claim changeset" do
      ticket_claim = ticket_claim_fixture()
      assert %Ecto.Changeset{} = Mentors.change_ticket_claim(ticket_claim)
    end
  end
end
