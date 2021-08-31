class Api::V1::WormsController < ApplicationController
    skip_before_action :require_token, :verify_authenticity_token, :only => [:create, :add_to_user, :index]

    def index
        @worms = Worm.all()
        if @worms.length > 0
            render json: {
                worms: @worms,
                status: 200,
                message: "here's the worms"
            }
        else
            render json: {
                status: 500,
                message: "there's been an issue"
            }
        end
    end
    def show
        @worm = Worm.find_by(:name, worm_params[:name])
    end
    def update
    end
    def new
        @worm = Worm.new(worm_params)
    end

    def create
        respond_to :html, :json, :xml
        @worm = Worm.new(worm_params)
        # if worm_params[:image]
        #     @worm.image.attach(worm_params[:image])
        # end
        if @worm.save && @worm.add_to_user(worm_params[:user_id])
            render json: @worm
        else
            render json: {message: 'worm creation/association FAIL (X)~(X)'}
        end
    end
    
    private
        def worm_params
            params.permit(:name, :user_id, :data_url, :public)
        end
end
