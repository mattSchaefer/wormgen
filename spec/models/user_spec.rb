require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) {User.create(username: "gloop", password: "12345", email: "test@email.com")}
  it "can create a valid user" do
    expect(user.username).to eq("gloop")
  end
  it "can save a valid user" do
    saved = user.save
    expect(saved).to be_truthy
  end
end
