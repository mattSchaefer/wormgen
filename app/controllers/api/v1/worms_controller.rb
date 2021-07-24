class Api::V1::WormsController < ApplicationController
    
    def index
        @worms = Worm.all
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
        @worm = Worm.new(worm_params)
        if @worm.save && @worm.add_to_user(worm_params[:user_id])
            render json: @worm
        else
            render json: {message: 'worm creation/association FAIL (X)~(X)'}
    end
    
    private
        def worm_params
            params.permit(:name, :user_id, :image)
        end
end
