require 'rails_helper'

RSpec.describe Worm, type: :model do
  let(:worm) {Worm.create({name: "worm12"})}
  let(:user) {User.create({username: "gloop", password: "12345678", email: "test@email.com"})}
  it "creates worm" do 
    expect(worm.name).to eq("worm12")
  end
  it "associates worm with user" do
    user.save
    worm.add_to_user(user.id)
    worm.save
    expect(worm.user.username).to eq('gloop')
  end
end
