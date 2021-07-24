class HomepageController < ApplicationController
  skip_before_action :require_token, :only => [:index]
  def index
  end
end
