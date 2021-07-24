require 'rails_helper'

RSpec.describe Token do
    let(:token) {Token.build_token("123")}
    it "builds an encoded jwt token" do 
        expect(token).to_not be_nil
    end
end