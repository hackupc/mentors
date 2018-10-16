defmodule HackUpcMentorsApiWeb.MentorsController do
    use HackUpcMentorsApiWeb, :controller
    alias HackUpcMentorsApi.Mentors

    def create(conn, params) do
      user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)

    end

    def index(conn, _) do
      user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
      mentors = HackUpcMentorsApi.Accounts.list_mentors(user_id)
      IO.inspect(mentors)
      render(conn, HackUpcMentorsApiWeb.UserView, "index.json", users: mentors)
    end

    def show(conn, _) do
      user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    end

    def update(conn, params) do
      user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    end

    def delete(conn, params) do
      user_id = HackUpcMentorsApi.GuardianHelper.get_user_id(conn)
    end

end
