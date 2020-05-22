defmodule HackUpcMentorsApi.Accounts.User do
    use Ecto.Schema
    import Ecto.Changeset

    @hashing_opts [digest: :sha256, format: :django, rounds: 36000]

    schema "users" do
        field :email, :string
        field :contact, :string
        field :is_admin, :boolean, default: false
        field :is_hacker, :boolean, default: false
        field :is_mentor, :boolean, default: false
        field :name, :string
        field :password, :string, virtual: true
        field :password_hash, :string
        has_many :tickets, HackUpcMentorsApi.Mentors.Ticket

        timestamps()
    end

    @spec find_and_confirm_password(String.t(), String.t()) :: {:ok, HackUpcMentorsApi.Accounts.User} | {:error, :not_found} | {:error, :unauthorized}
    def find_and_confirm_password(email, password) do
        case HackUpcMentorsApi.Repo.get_by(HackUpcMentorsApi.Accounts.User, email: email) do
            nil ->
                {:error, :not_found}
            user ->
                # TODO: WIP
                salt = String.split(user.password, "$")
                       |> Enum.at(2)
                hashed = Pbkdf2.Base.hash_password(password, salt, @hashing_opts)

                if hashed = user.password do
                    {:ok, user}
                else
                    {:error, :unauthorized}
                end
        end
    end

end
