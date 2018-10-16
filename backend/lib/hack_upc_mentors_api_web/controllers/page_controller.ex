defmodule HackUpcMentorsApiWeb.PageController do
  use HackUpcMentorsApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
