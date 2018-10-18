defmodule HackUpcMentorsApi.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

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

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password, :is_admin, :is_mentor, :is_hacker])
    |> validate_required([:name, :email, :password, :is_admin, :is_mentor, :is_hacker])
  end

  def find_and_confirm_password(email, password) do
		case HackUpcMentorsApi.Repo.get_by(HackUpcMentorsApi.Accounts.User, email: email) do
			nil ->
				{:error, :not_found}
			user ->
				if Comeonin.Bcrypt.checkpw(password, user.password_hash) do
					{:ok, user}
				else
					{:error, :unauthorized}
				end
		end
	end


	def hacker_registration_changeset(struct, params \\ %{}) do
		params = Map.update!(params, "email", &(String.downcase(&1)))
		struct
			|> cast(params, [:name, :email, :password, :contact])
			|> cast(%{"is_admin" => false}, [:is_admin])
			|> cast(%{"is_mentor" => false}, [:is_mentor])
			|> cast(%{"is_hacker" => true}, [:is_hacker])
			|> validate_required([:name, :email, :password], [message: "error_registration_empty_params"])
			|> validate_changeset
	end

	def mentor_registration_changeset(struct, params \\ %{}) do
		params = Map.update!(params, "email", &(String.downcase(&1)))
		struct
			|> cast(params, [:name, :email, :password, :contact])
			|> cast(%{"is_mentor" => true}, [:is_mentor])
			|> cast(%{"is_admin" => false}, [:is_admin])
			|> validate_required([:name, :email, :password], [message: "error_registration_empty_params"])
			|> validate_changeset
	end

	def admin_registration_changeset(struct, params \\ %{}) do
		params = Map.update!(params, "email", &(String.downcase(&1)))
		struct
			|> cast(params, [:name, :email, :password, :contact])
			|> cast(%{"is_admin" => true}, [:is_admin])
			|> validate_required([:name, :email, :password], [message: "error_registration_empty_params"])
			|> validate_changeset
	end

	defp validate_changeset(struct) do
		struct
		|> validate_length(:email, min: 5, max: 255, message: "error_email_length")
		|> validate_format(:email, ~r/@/, [message: "error_email_format"])
		|> unique_constraint(:email, [message: "error_user_duplicated"])
		|> generate_password_hash
	end

	defp generate_password_hash(changeset) do
		case changeset do
			%Ecto.Changeset{valid?: true, changes: %{password: password}} ->
				put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
			_ ->
				changeset
		end
	end
end
