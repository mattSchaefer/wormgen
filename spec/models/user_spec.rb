require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) {User.create(username: "gloop", password: "12345678", email: "test@email.com")}
  let(:no_pass) {User.create(username: "gloop1", email: "test@email.com")}
  let(:short_pass) {User.create(username: "gloop2", password: "1234", email: "test@email.com")}
  it "can create a valid user" do
    expect(user.username).to eq("gloop")
  end
  it "can save a valid user" do
    saved = user.save
    expect(saved).to be_truthy
  end
  it "does not save user w/ missing param" do
    not_saved = no_pass.save
    expect(not_saved).not_to be_truthy
  end
  it "validates length of password" do
    not_saved = short_pass.save
    expect(not_saved).not_to be_truthy
  end
  it "expects a new user to have no worms" do
    expect(user.worms).to be_nil
  end
  it "can use jwt functionality" do 
    expect(user.build_token).not_to be_nil
  end
end
